import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { isUuid } from "@/lib/security";
import { getPresignedDownloadUrl } from "@/lib/b2";

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

    const proposal = await prisma.proposalFile.findFirst({
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

    if (!proposal) {
      return NextResponse.json({ error: "Proposal file not found" }, { status: 404 });
    }

    const downloadUrl = await getPresignedDownloadUrl(
      proposal.storageKey,
      proposal.originalName,
      300
    );

    return NextResponse.json({
      downloadUrl,
      originalName: proposal.originalName,
      sizeBytes: proposal.sizeBytes,
      pageCount: proposal.pageCount,
    });
  } catch (err: any) {
    console.error("GET /api/admin/proposals/[id]/download error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Failed to generate download URL" }, { status: 500 });
  }
}
