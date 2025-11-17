import { NextResponse } from "next/server";
//
import { getSession } from "@/lib/session/session";
import { PositionsResponse } from "@/types/positions";
//

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
      `${process.env.MSTOCK_API_BASE_URL}/${process.env.MSTOCK_API_TYPE}/portfolio/positions`,
      {
        method: "GET",
        headers: {
          "X-Mirae-Version": process.env.MSTOCK_API_VERSION!,
          Authorization: `Bearer ${session.token}`,
          "X-PrivateKey": process.env.MSTOCK_API_KEY_TYPE_A!,
        },
      }
    );

    const data: PositionsResponse = await response.json();

    if (!data.status) {
      return NextResponse.json(
        { success: false, status: false, error_msg: data.message },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data: data.data }, { status: 200 });
  } catch (error: any) {
    console.error("Positions API error:", error.response?.data || error);
    return NextResponse.json(
      {
        success: false,
        error: error.response?.data || "Failed to fetch positions",
      },
      { status: 500 }
    );
  }
}
