import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!process.env.MSTOCK_USERNAME || !process.env.MSTOCK_PASSWORD) {
      return NextResponse.json({
        success: false,
        error: "Missing credentials",
      });
    }

    const payload = {
      clientcode: body.clientCode,
      password: body.password,
      totp: "",
      state: "",
    };

    const res = await fetch(
      `${process.env.MSTOCK_API_BASE_URL}/${process.env.MSTOCK_API_TYPE}/connect/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Mirae-Version": process.env.MSTOCK_API_VERSION!,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json(data);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
