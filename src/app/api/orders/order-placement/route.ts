import { getSession } from "@/lib/session/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.token) {
      return NextResponse.json(
        { status: false, message: "Not authenticated" },
        { status: 401 }
      );
    }
    const body = await req.json();

    // Validate required fields
    const required = [
      "variety",
      "tradingsymbol",
      "symboltoken",
      "exchange",
      "transactiontype",
      "ordertype",
      "quantity",
      "producttype",
      "duration",
    ];

    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    let payload = {
      variety: body.variety,
      tradingsymbol: body.tradingsymbol,
      symboltoken: body.symboltoken,
      exchange: body.exchange,
      transactiontype: body.transactiontype,
      ordertype: body.ordertype,
      quantity: body.quantity,
      producttype: body.producttype,
      price: body.price,
      triggerprice: body.triggerprice ?? "0",
      squareoff: body.squareoff ?? "0",
      stoploss: body.stoploss ?? "0",
      trailingStopLoss: body.trailingStopLoss ?? "",
      disclosedquantity: body.disclosedquantity ?? "",
      duration: body.duration,
      ordertag: body.ordertag ?? "",
    };

    // MStock Order Placement API Call
    const response = await fetch(
      `${process.env.MSTOCK_API_BASE_URL}/${process.env.MSTOCK_API_TYPE}/orders/regular`,
      {
        method: "POST",
        headers: {
          "X-Mirae-Version": process.env.MSTOCK_API_VERSION!,
          Authorization: `Bearer ${session.token}`,
          "X-PrivateKey": process.env.MSTOCK_API_KEY_TYPE_A!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    const item = Array.isArray(data) ? data[0] : null;

    return NextResponse.json(
      {
        success: item?.status ?? false,
        message: item?.message,
        errorcode: item?.errorcode,
        data: item?.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Order placement failed" },
      { status: 500 }
    );
  }
}
