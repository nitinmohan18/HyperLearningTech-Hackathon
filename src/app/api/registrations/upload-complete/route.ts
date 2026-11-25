import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Deprecated: Proposal verification and database persistence are now executed
 * atomically upon final submission in POST /api/registrations/submit.
 */
export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Proposals are verified and committed atomically on submission.",
  });
}
