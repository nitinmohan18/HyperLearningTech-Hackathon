import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { isUuid } from "@/lib/security";
import { AdminPaymentRejectSchema } from "@/lib/validations";

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
    const parsed = AdminPaymentRejectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid payload" },
        { status: 400 }
      );
    }

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
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    const [updatedPayment] = await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: "REJECTED",
          note: parsed.data.note || "Payment rejected by organiser",
        },
      }),
      prisma.registration.update({
        where: { id: payment.registrationId },
        data: {
          status: "PAYMENT_REJECTED",
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      payment: updatedPayment,
    });
  } catch (err) {
    console.error("POST /api/admin/payments/[id]/reject error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Failed to reject payment" }, { status: 500 });
  }
}
