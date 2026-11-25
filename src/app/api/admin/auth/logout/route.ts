import { NextResponse } from "next/server";
import { COOKIE_NAMES } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Admin session cleared",
  });

  // Explicitly clear session cookie across all path variations
  response.cookies.set(COOKIE_NAMES.ADMIN_SESSION, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
