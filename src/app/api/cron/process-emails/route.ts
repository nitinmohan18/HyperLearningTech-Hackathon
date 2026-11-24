import { NextRequest, NextResponse } from "next/server";
import { processEmailOutbox } from "@/lib/email-outbox";
import { timingSafeMatch, pruneExpiredRateLimits } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;

  // Requirement: Reject requests if CRON_SECRET is missing on the server
  if (!cronSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured on the server." },
      { status: 500 }
    );
  }

  // Requirement: Require exact Authorization: Bearer ${process.env.CRON_SECRET} match in constant-time.
  // Do not trust cron headers alone (such as x-vercel-cron).
  const authHeader = req.headers.get("authorization");
  const expectedAuth = `Bearer ${cronSecret}`;

  if (!timingSafeMatch(authHeader, expectedAuth)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Process pending/failed emails in the outbox
    const result = await processEmailOutbox();

    // 2. Automatically prune expired RateLimit database rows to prevent table bloat
    const prunedLimits = await pruneExpiredRateLimits();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      prunedRateLimits: prunedLimits,
      ...result,
    });
  } catch (err: any) {
    console.error("Cron /api/cron/process-emails error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { error: "Failed to process email outbox queue" },
      { status: 500 }
    );
  }
}
