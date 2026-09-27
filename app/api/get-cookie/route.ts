import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get(process.env.NEXT_TOKEN ?? "accessToken")?.value;
  const refreshToken = cookieStore.get(process.env.NEXT_REFRESH_TOKEN ?? "refreshToken")?.value;

  return NextResponse.json({
    token: token ?? null,
    refreshToken: refreshToken ?? null,
  });
}