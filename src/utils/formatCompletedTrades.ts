import { TradeBookItem } from "@/types/orders/tradebook.types";
import { ITrade } from "@/types/trade";

export function formatCompletedTrades(trades: TradeBookItem[]): ITrade[] {
  const grouped: Record<string, TradeBookItem[]> = {};

  // Group all trades by SEC_ID
  for (const t of trades) {
    if (!grouped[t.SEC_ID]) grouped[t.SEC_ID] = [];
    grouped[t.SEC_ID].push(t);
  }

  const result: ITrade[] = [];

  // Format ms → HH:MM:SS
  const formatDuration = (ms: number) => {
    if (!ms || ms <= 0) return "-";

    const totalSeconds = Math.floor(ms / 1000);
    // const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes} min ${seconds} sec`;
  };

  for (const secId in grouped) {
    const items = grouped[secId];

    // Sort by time so first = entry, second = exit
    items.sort(
      (a, b) =>
        new Date(a.ORDER_DATE_TIME).getTime() -
        new Date(b.ORDER_DATE_TIME).getTime()
    );

    const entry = items[1];
    const exit = items[0]; // undefined if not closed

    const direction = entry?.BUY_SELL === "BUY" ? "LONG" : "SHORT";

    // 🟡 ONLY ONE TRADE → OPEN POSITION
    if (!exit) {
      result.push({
        SEC_ID: secId,
        SETTLOR: entry.SETTLOR,
        ENTRY_OBJ: entry,
        EXIT_OBJ: null, // << return an empty object
        PNL: 0,
        PNL_PERCENT: 0,
        STATUS: "OPEN",
        DIRECTION: direction,
        TRADE_DURATION: null,
      });
      continue;
    }

    function parseTradeDate(dateStr: string): number {
      // dateStr = "18-11-2025 10:11:56"
      const [datePart, timePart] = dateStr.split(" ");
      const [dd, mm, yyyy] = datePart.split("-");

      // Convert → "2025-11-18 10:11:56"
      const formatted = `${yyyy}-${mm}-${dd} ${timePart}`;

      return new Date(formatted).getTime();
    }

    // Time duration calculation
    const entryTime = parseTradeDate(entry.ORDER_DATE_TIME);
    const exitTime = exit ? parseTradeDate(exit.ORDER_DATE_TIME) : null;

    const duration = exitTime ? formatDuration(exitTime - entryTime): null;

    // Prices
    const entryPrice = entry.PRICE;
    const exitPrice = exit.PRICE;

    // Qty (BOTH BUY & SELL qty same)
    const qty = entry.QUANTITY;

    // 🟢 Long OR Short completed trade
    const pnl =
      (exit.PRICE - entry.PRICE) * (entry.BUY_SELL === "BUY" ? qty : -qty);

    //  PNL %
    const pnlPercent =
      entry.BUY_SELL === "BUY"
        ? ((exitPrice - entryPrice) / entryPrice) * 100
        : ((entryPrice - exitPrice) / entryPrice) * 100;

    result.push({
      SEC_ID: secId,
      SETTLOR: entry.SETTLOR,
      ENTRY_OBJ: entry,
      EXIT_OBJ: exit,
      PNL: pnl,
      PNL_PERCENT: pnlPercent,
      STATUS: "CLOSED",
      DIRECTION: direction,
      TRADE_DURATION: duration ?? null,
    });
  }

  return result;
}
