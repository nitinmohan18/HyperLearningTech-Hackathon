import { NextRequest, NextResponse, after } from "next/server";
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

    const registration = await prisma.registration.findFirst({
      where: isUuid(cleanId)
        ? { id: cleanId }
        : { registrationNumber: cleanId.toUpperCase() },
      include: {
        payment: true,
        participants: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    // Requirement: Unverified payment cannot trigger confirmation
    if (!registration.payment || registration.payment.status !== "VERIFIED") {
      return NextResponse.json(
        { error: "Payment must be verified before confirming registration spot." },
        { status: 400 }
      );
    }

    const leader = registration.participants[0];
    if (!leader) {
      return NextResponse.json({ error: "Registration has no participants" }, { status: 400 });
    }

    // Update status and create Spot Confirmed email outbox entry atomically
    const updated = await prisma.$transaction(async (tx) => {
      const reg = await tx.registration.update({
        where: { id: registration.id },
        data: {
          status: "CONFIRMED",
          confirmedAt: new Date(),
        },
      });

      // Avoid duplicate confirmation emails if already sent or pending
      const existingConfEmail = await tx.emailOutbox.findFirst({
        where: {
          registrationId: registration.id,
          emailType: "SPOT_CONFIRMED",
        },
      });

      if (!existingConfEmail) {
        await tx.emailOutbox.create({
          data: {
            registrationId: registration.id,
            recipient: leader.email,
            emailType: "SPOT_CONFIRMED",
            payload: {
              registrationNumber: reg.registrationNumber,
              type: reg.type,
              teamName: reg.teamName,
              leaderName: leader.fullName,
            },
            status: "PENDING",
          },
        });
      }

      return reg;
    });

    // Trigger email outbox safely within Vercel serverless lifecycle via after()
    after(async () => {
      try {
        await processEmailOutbox(registration.id);
      } catch (err) {
        console.error("Confirmation email send error:", err);
      }
    });

    return NextResponse.json({
      success: true,
      registration: updated,
    });
  } catch (err) {
    console.error("POST /api/admin/registrations/[id]/confirm error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Failed to confirm registration" }, { status: 500 });
  }
}
