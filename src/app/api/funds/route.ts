import { NextResponse } from "next/server";
import { getSession } from "@/lib/session/session";

interface FundSummaryResponse {
  status: string | boolean;
  message?: string;
  errorcode?: string;
  data?: any;
}

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session?.token) {
      return NextResponse.json(
        { status: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const res = await fetch(
      `${process.env.MSTOCK_API_BASE_URL}/${process.env.MSTOCK_API_TYPE}/user/fundsummary`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Mirae-Version": process.env.MSTOCK_API_VERSION!,
          Authorization: `Bearer ${session.token}`,
          "X-PrivateKey": process.env.MSTOCK_API_KEY_TYPE_A!,
        },
      }
    );

     const data = await res.json();

    if (!data.status) {
      return NextResponse.json(data);
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      {
        status: false,
        message: err?.response?.data || "Funds fetch failed",
      },
      { status: 500 }
    );
  }
}
