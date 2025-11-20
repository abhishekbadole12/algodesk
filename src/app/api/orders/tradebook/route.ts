import { NextResponse } from "next/server";
import { getSession } from "@/lib/session/session";
import { TradeBookResponse } from "@/types/orders/tradebook.types";

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.token) {
      return NextResponse.json(
        { status: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.MSTOCK_API_BASE_URL}/${process.env.MSTOCK_API_TYPE}/tradebook`,
      {
        method: "GET",
        headers: {
          "X-Mirae-Version": process.env.MSTOCK_API_VERSION!,
          Authorization: `Bearer ${session.token}`,
          "X-PrivateKey": process.env.MSTOCK_API_KEY_TYPE_A!,
             "Content-Type": "application/json",
        },
      }
    );

    const data: TradeBookResponse = await response.json();

    if (!data.status) {
      return NextResponse.json(
        {
          success: false,
          status: false,
          error_msg: data.message,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: data.data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Network error" },
      { status: 500 }
    );
  }
}
