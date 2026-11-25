import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const auth = await verifyAdminRequest(req);
    if (!auth.authenticated) {
      return NextResponse.json({ error: auth.message }, { status: auth.status });
    }

    const { searchParams } = new URL(req.url);
    const rawSearch = searchParams.get("search")?.trim() || "";
    const rawStatus = searchParams.get("status")?.trim().toUpperCase() || "ALL";
    const rawType = searchParams.get("type")?.trim().toUpperCase() || "ALL";

    // Whitelist validate status and type to prevent query enum errors
    const validStatuses = ["ALL", "DRAFT", "SUBMITTED", "PAYMENT_REJECTED", "CONFIRMED", "CANCELLED"];
    const validTypes = ["ALL", "SOLO", "SQUAD"];

    const status = validStatuses.includes(rawStatus) ? rawStatus : "ALL";
    const type = validTypes.includes(rawType) ? rawType : "ALL";

    // Bound search query length to 100 characters to prevent expensive ILIKE pattern queries
    const search = rawSearch.slice(0, 100);

    const where: any = {
      // Exclude abandoned/unsubmitted drafts from participant roster by default unless specified
      status: status !== "ALL" ? status : { not: "DRAFT" },
    };

    if (type !== "ALL") {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { registrationNumber: { contains: search, mode: "insensitive" } },
        { teamName: { contains: search, mode: "insensitive" } },
        { projectTitle: { contains: search, mode: "insensitive" } },
        {
          participants: {
            some: {
              OR: [
                { fullName: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { githubUsername: { contains: search, mode: "insensitive" } },
              ],
            },
          },
        },
      ];
    }

    const [total, registrations] = await Promise.all([
      prisma.registration.count({ where }),
      prisma.registration.findMany({
        where,
        include: {
          participants: {
            orderBy: { sortOrder: "asc" },
          },
          payment: true,
          proposalFile: true,
          emailOutbox: {
            select: {
              id: true,
              emailType: true,
              status: true,
              retryCount: true,
              sentAt: true,
            },
          },
        },
        orderBy: { submittedAt: "desc" },
        take: 100,
      }),
    ]);

    // Statistics telemetry for overview
    const [totalSubmitted, totalConfirmed, totalSolo, totalSquad, paymentPendingCount] =
      await Promise.all([
        prisma.registration.count({ where: { status: "SUBMITTED" } }),
        prisma.registration.count({ where: { status: "CONFIRMED" } }),
        prisma.registration.count({ where: { type: "SOLO", status: { not: "DRAFT" } } }),
        prisma.registration.count({ where: { type: "SQUAD", status: { not: "DRAFT" } } }),
        prisma.payment.count({ where: { status: "PENDING" } }),
      ]);

    return NextResponse.json({
      total,
      stats: {
        totalSubmitted,
        totalConfirmed,
        totalSolo,
        totalSquad,
        paymentPendingCount,
      },
      registrations,
    });
  } catch (err) {
    console.error("GET /api/admin/registrations error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}
