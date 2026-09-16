import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req?.cookies?.get("accessToken")?.value;

  console.log("COOKIE:", token);

  return NextResponse.json({
    token: token ?? null,
  });
}