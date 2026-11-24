import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { isUuid } from "@/lib/security";
import { processEmailOutbox } from "@/lib/email-outbox";

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

    if (!isUuid(cleanId)) {
      return NextResponse.json({ error: "Invalid email log ID format" }, { status: 400 });
    }

    const emailItem = await prisma.emailOutbox.findUnique({
      where: { id: cleanId },
    });

    if (!emailItem) {
      return NextResponse.json({ error: "Email log not found" }, { status: 404 });
    }

    // Reset status to PENDING
    await prisma.emailOutbox.update({
      where: { id: cleanId },
      data: {
        status: "PENDING",
        retryCount: 0,
        nextRetryAt: null,
        lastError: null,
      },
    });

    // Run processing
    const result = await processEmailOutbox(emailItem.registrationId);

    const updated = await prisma.emailOutbox.findUnique({
      where: { id: cleanId },
    });

    return NextResponse.json({
      success: true,
      result,
      email: updated,
    });
  } catch (err) {
    console.error("POST /api/admin/emails/[id]/retry error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Failed to retry email" }, { status: 500 });
  }
}
