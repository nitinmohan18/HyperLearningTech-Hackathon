import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EVENT_DETAILS } from "@/lib/constants";
import { checkRateLimit, getClientIp } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    const rate = await checkRateLimit(`reg_status:${ip}`, 30, 60);
    if (!rate.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const regNumber = searchParams.get("reg");

    if (!regNumber) {
      return NextResponse.json({ error: "Registration number is required" }, { status: 400 });
    }

    const trimmed = regNumber.trim().toUpperCase();
    if (trimmed.length < 3 || trimmed.length > 50 || !/^[A-Z0-9-]+$/.test(trimmed)) {
      return NextResponse.json({ error: "Invalid registration number format" }, { status: 400 });
    }

    const registration = await prisma.registration.findUnique({
      where: { registrationNumber: trimmed },
      include: {
        payment: {
          select: {
            status: true,
            expectedPaise: true,
            createdAt: true,
            verifiedAt: true,
          },
        },
      },
    });

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({
      registrationNumber: registration.registrationNumber,
      type: registration.type,
      teamName: registration.teamName,
      status: registration.status,
      feeFormatted:
        registration.type === "SOLO"
          ? EVENT_DETAILS.soloFeeFormatted
          : EVENT_DETAILS.squadFeeFormatted,
      submittedAt: registration.submittedAt,
      confirmedAt: registration.confirmedAt,
      paymentStatus: registration.payment?.status ?? "PENDING",
    });
  } catch (err) {
    console.error("GET /api/registrations/status error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Failed to retrieve registration status" }, { status: 500 });
  }
}
