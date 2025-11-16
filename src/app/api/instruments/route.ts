import { NextResponse } from "next/server";
//
import Papa from "papaparse";
import { promises as fs } from "fs";
import path from "path";
//
import { getSession } from "@/lib/session/session";
//
import { formatExpiry } from "@/utils/formatExpiry";

// -------------------
// 📁 File paths
// -------------------
const DATA_DIR = path.join(process.cwd(), "data");
const INSTRUMENTS_PATH = path.join(DATA_DIR, "instruments.json");
const LAST_FETCH_PATH = path.join(DATA_DIR, "lastFetch.json");

// -------------------
// 🔑 API details
// -------------------
const MSTOCK_SCRIPT_MASTER_TYPE_A = process.env.MSTOCK_SCRIPT_MASTER_TYPE_A!;
const MSTOCK_SCRIPT_MASTER_TYPE_B = process.env.MSTOCK_SCRIPT_MASTER_TYPE_B!;

const MSTOCK_API_KEY_TYPE_A = process.env.MSTOCK_API_KEY_TYPE_A!;

// -------------------
// 🧠 In-memory cache
// -------------------
let cachedInstruments: Instrument[] | null = null;
let lastFetchedDateCache: string | null = null;

// -------------------
// 🧾 TypeScript interface
// -------------------
export interface Instrument {
  instrumentToken: string;
  exchangeToken: string;
  tradingSymbol: string;
  name: string;
  expiry: string;
  strike: string;
  tickSize: string;
  lotSize: string;
  instrumentType: string;
  segment: string;
  exchange: string;
}

// -------------------
// 🧩 Normalizers
// -------------------
const normalizeTypeA = (item: any): Instrument => ({
  instrumentToken: item.instrument_token,
  exchangeToken: item.exchange_token,
  tradingSymbol: item.tradingsymbol,
  name: item.name,
  expiry: formatExpiry(item.expiry),
  strike: item.strike || "",
  tickSize: item.tick_size,
  lotSize: item.lot_size,
  instrumentType: item.instrument_type,
  segment: item.segment,
  exchange: item.exchange,
});

const normalizeTypeB = (item: any): Instrument => ({
  instrumentToken: item.token,
  exchangeToken: item.token,
  tradingSymbol: item.symbol,
  name: item.name,
  expiry: formatExpiry(item.expiry),
  strike: item.strike || "",
  tickSize: item.tick_size,
  lotSize: item.lotsize,
  instrumentType: item.instrumenttype,
  segment: item.exch_seg,
  exchange: item.exch_seg,
});

// -------------------
// 🚀 GET Handler
// -------------------
export async function GET() {
  try {
    const session = await getSession();

    if (!session?.token) {
      return NextResponse.json(
        { status: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    await fs.mkdir(DATA_DIR, { recursive: true });

    const today = new Date().toISOString().split("T")[0];

    // -------------------
    // 1️⃣ In-memory cache
    // -------------------
    if (lastFetchedDateCache === today && cachedInstruments) {
      return NextResponse.json(cachedInstruments);
    }

    // -------------------
    // 2️⃣ File cache
    // -------------------
    if (await exists(LAST_FETCH_PATH)) {
      const { lastFetchedDate } = JSON.parse(
        await fs.readFile(LAST_FETCH_PATH, "utf8")
      );

      if (lastFetchedDate === today && (await exists(INSTRUMENTS_PATH))) {
        const cached = JSON.parse(await fs.readFile(INSTRUMENTS_PATH, "utf8"));
        cachedInstruments = cached;
        lastFetchedDateCache = today;
        return NextResponse.json(cached);
      }
    }

    // -------------------
    // 3️⃣ Fetch new data
    // -------------------

    // Type A CSV (text)
    const typeAResponse = await fetch(MSTOCK_SCRIPT_MASTER_TYPE_A, {
      method: "GET",
      headers: {
        "X-Mirae-Version": process.env.MSTOCK_API_VERSION!,
        "X-PrivateKey": MSTOCK_API_KEY_TYPE_A,
        Authorization: `Bearer ${session.token}`,
      },
    });
    const typeACsv = await typeAResponse.text();
    const typeAParsed = Papa.parse(typeACsv, { header: true }).data;

    // Type B JSON API
    const typeBResponse = await fetch(MSTOCK_SCRIPT_MASTER_TYPE_B, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.token}`,
        "X-Mirae-Version": "2",
        "X-PrivateKey": MSTOCK_API_KEY_TYPE_A,
      },
    });
    const typeBJson = await typeBResponse.json();
    const typeBData = Array.isArray(typeBJson.data) ? typeBJson.data : [];

    // -------------------
    // 4️⃣ Normalize & merge
    // -------------------
    const combined: Instrument[] = [
      ...typeAParsed.map(normalizeTypeA),
      ...typeBData.map(normalizeTypeB),
    ];

    // -------------------
    // 5️⃣ Save to local files
    // -------------------
    await fs.writeFile(INSTRUMENTS_PATH, JSON.stringify(combined, null, 2));
    await fs.writeFile(
      LAST_FETCH_PATH,
      JSON.stringify({ lastFetchedDate: today })
    );

    cachedInstruments = combined;
    lastFetchedDateCache = today;

    return NextResponse.json(combined);
  } catch (error) {
    console.error("Fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch instruments" },
      { status: 500 }
    );
  }
}

// -------------------
// 🧰 Helper
// -------------------
async function exists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
