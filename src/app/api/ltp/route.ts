import { NextRequest, NextResponse } from "next/server";
//
import { getSession } from "@/lib/session/session";
//
import { ILTPResponse } from "@/types/ltp.types";
//

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

    const response = await fetch(
      `${process.env.MSTOCK_API_BASE_URL}/${process.env.MSTOCK_API_TYPE}/instruments/quote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
          "X-Mirae-Version": process.env.MSTOCK_API_VERSION!,
          "X-PrivateKey": process.env.MSTOCK_API_KEY_TYPE_A!,
        },
        body: JSON.stringify(body),
      }
    );

    const data: ILTPResponse = await response.json();

    if (!data.status || data.message !== "SUCCESS") {
      return NextResponse.json(
        {
          status: false,
          error_msg: data.message || "Failed to fetch LTP",
          errorcode: data.errorcode,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, status: true, data: data.data },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.response?.data || error.message },
      { status: 500 }
    );
  }
}
