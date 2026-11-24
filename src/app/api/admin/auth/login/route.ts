import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { checkRateLimit, getClientIp, createAdminSessionToken } from "@/lib/security";
import { RATE_LIMITS, COOKIE_NAMES } from "@/lib/constants";
import { AdminLoginSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    const rate = await checkRateLimit(
      `admin_login:${ip}`,
      RATE_LIMITS.LOGIN_ATTEMPTS.points,
      RATE_LIMITS.LOGIN_ATTEMPTS.windowSeconds
    );

    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many failed login attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const parsed = AdminLoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const adminSecret = process.env.ADMIN_SECRET;
    if (!adminSecret) {
      console.error("ADMIN_SECRET is not configured in server environment.");
      return NextResponse.json(
        { error: "Admin authentication is not configured on the server." },
        { status: 500 }
      );
    }

    // Timing-safe comparison to prevent timing attacks
    const inputHash = crypto.createHash("sha256").update(parsed.data.secret).digest();
    const secretHash = crypto.createHash("sha256").update(adminSecret).digest();

    if (!crypto.timingSafeEqual(inputHash, secretHash)) {
      return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
    }

    const token = createAdminSessionToken(8);
    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful",
    });

    response.cookies.set(COOKIE_NAMES.ADMIN_SESSION, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 hours
    });

    return response;
  } catch (err) {
    console.error("POST /api/admin/auth/login error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
