import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { isUuid } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminRequest(req);
    if (!auth.authenticated) {
      return NextResponse.json({ error: auth.message }, { status: auth.status });
    }

    const { id } = await params;
    const cleanId = id.trim();

    const registration = await prisma.registration.findFirst({
      where: isUuid(cleanId)
        ? { id: cleanId }
        : { registrationNumber: cleanId.toUpperCase() },
    });

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    const updated = await prisma.registration.update({
      where: { id: registration.id },
      data: {
        status: "CANCELLED",
      },
    });

    return NextResponse.json({
      success: true,
      registration: updated,
    });
  } catch (err) {
    console.error("POST /api/admin/registrations/[id]/reject error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Failed to cancel registration" }, { status: 500 });
  }
}
