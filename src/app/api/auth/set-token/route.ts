import { NextResponse } from "next/server";
import { config } from "@/shared/config";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: config.auth.JWT.REFRESH_TOKEN,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: config.auth.REFRESHTOKENLIVETIME,
    });

    return response;
  } catch (error) {
    console.error("Error setting token:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
