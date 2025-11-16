import { NextResponse } from "next/server";
import { destroySession, getSession } from "@/lib/session/session";

export async function GET() {
  try {
    // Extract jwt token from session cookies
    const session = await getSession();
    const jwtToken = session?.token;

    if (!jwtToken) {
      return NextResponse.json({ status: false, message: "Not logged in" });
    }

    // Call mStock logout API
    const res = await fetch(
      `${process.env.MSTOCK_API_BASE_URL}/${process.env.MSTOCK_API_TYPE}/logout`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "X-Mirae-Version": process.env.MSTOCK_API_VERSION || "",
          "X-PrivateKey": process.env.MSTOCK_API_KEY_TYPE_A || "",
        }
      }
    );

    const data = await res.json();

    // Destroy session cookies regardless of API response
    await destroySession();

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({
      status: false,
      message: "Logout failed",
      error: err.message,
    });
  }
}
