import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { isUuid } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(
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
      include: {
        participants: {
          orderBy: { sortOrder: "asc" },
        },
        payment: true,
        proposalFile: true,
        emailOutbox: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({ registration });
  } catch (err) {
    console.error("GET /api/admin/registrations/[id] error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Failed to fetch registration" }, { status: 500 });
  }
}
