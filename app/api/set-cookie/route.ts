import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token = "", refreshToken = "" } = await req.json();
    const response = NextResponse.json({
      message: "Cookies set successfully",
      success: true,
    });

    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60, // 15 minutes
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to set cookies",
      },
      {
        status: 500,
      }
    );
  }
}