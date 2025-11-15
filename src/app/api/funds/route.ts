// app/api/funds/route.ts

import { NextResponse } from "next/server";

const API_KEY = process.env.MSTOCK_API_KEY_TYPE_A;
const JWT_TOKEN = process.env.MSTOCK_JWT_TOKEN;

export async function GET() {
  try {
    const response = await fetch(
      "https://api.mstock.trade/openapi/typeb/user/fundsummary",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT_TOKEN}`,
          "X-PrivateKey": API_KEY || "",
          "X-Mirae-Version": "1",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch mStock funds" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Funds API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
