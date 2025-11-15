import { NextResponse } from "next/server";
import { createSession } from "@/lib/session/session";

export async function POST(req: Request) {
  try {
    const { otp, refreshToken } = await req.json();

    const payload = { otp, refreshToken };

    const res = await fetch(
      `https://api.mstock.trade/openapi/typeb/session/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Mirae-Version": process.env.MSTOCK_API_VERSION || "",
          "X-PrivateKey": process.env.MSTOCK_API_KEY_TYPE_A || "",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json(data);
    }

    // Create secure session cookie
    await createSession(data.data.jwtToken, {
      name: data.data.ClientName,
      clientId: data.data.ClientId,
      exchanges: data.data.exchanges,
    });

    return NextResponse.json({ status: true });
  } catch (error) {
    return NextResponse.json({ status: false, error: error.message });
  }
}
