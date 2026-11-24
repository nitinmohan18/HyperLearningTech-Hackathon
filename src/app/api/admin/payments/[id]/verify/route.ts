import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { isUuid } from "@/lib/security";
import { AdminPaymentVerifySchema } from "@/lib/validations";

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

    const body = await req.json().catch(() => ({}));
    const parsed = AdminPaymentVerifySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid payload" },
        { status: 400 }
      );
    }

    // Find payment by UUID (payment id or registration id) or registration number
    const payment = await prisma.payment.findFirst({
      where: isUuid(cleanId)
        ? {
            OR: [{ id: cleanId }, { registrationId: cleanId }],
          }
        : {
            registration: {
              registrationNumber: cleanId.toUpperCase(),
            },
          },
      include: { registration: true },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "VERIFIED",
        verifiedAt: new Date(),
        verifiedBy: parsed.data.verifiedBy || "Organiser",
        note: parsed.data.note || payment.note,
      },
    });

    return NextResponse.json({
      success: true,
      payment: updatedPayment,
    });
  } catch (err) {
    console.error("POST /api/admin/payments/[id]/verify error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
