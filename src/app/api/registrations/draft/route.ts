import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Deprecated: Public drafts have been migrated to browser IndexedDB storage
 * to eliminate Neon database latency and server-side draft autosaving.
 */
export async function GET() {
  return NextResponse.json({ draft: null });
}

export async function PUT() {
  return NextResponse.json({
    success: true,
    message: "Drafts are stored locally in IndexedDB.",
  });
}
