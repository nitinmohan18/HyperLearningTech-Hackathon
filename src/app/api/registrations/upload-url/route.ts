import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp, generateRandomToken } from "@/lib/security";
import { RATE_LIMITS, PROPOSAL_LIMITS } from "@/lib/constants";
import { UploadUrlRequestSchema } from "@/lib/validations";
import { getPresignedUploadUrl } from "@/lib/b2";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    const rate = await checkRateLimit(
      `upload_url:${ip}`,
      RATE_LIMITS.UPLOAD_REQUEST.points,
      RATE_LIMITS.UPLOAD_REQUEST.windowSeconds
    );
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many upload requests. Please slow down." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const parsed = UploadUrlRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid upload parameters" },
        { status: 400 }
      );
    }

    const { filename, mimeType } = parsed.data;

    // Sanitize extension and enforce allowed whitelist
    const ext = path.extname(filename).toLowerCase();
    if (!PROPOSAL_LIMITS.ALLOWED_EXTENSIONS.includes(ext as any)) {
      return NextResponse.json(
        { error: `Unsupported file extension '${ext}'. Allowed: .pdf, .pptx` },
        { status: 400 }
      );
    }

    let resolvedMime = mimeType;
    if (ext === ".pdf") {
      resolvedMime = "application/pdf";
    } else if (ext === ".pptx") {
      resolvedMime = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    }

    // Storage key format: proposals/uploads/{random-token-40-hex}{ext}
    const fileId = generateRandomToken(20);
    const storageKey = `proposals/uploads/${fileId}${ext}`;

    const uploadUrl = await getPresignedUploadUrl(storageKey, resolvedMime || "application/octet-stream", 300);

    return NextResponse.json({
      uploadUrl,
      storageKey,
      fileId,
    });
  } catch (err: any) {
    console.error("POST /api/registrations/upload-url error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { error: "Failed to generate presigned upload URL. Please try again." },
      { status: 500 }
    );
  }
}
