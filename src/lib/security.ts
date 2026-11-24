import crypto from "crypto";
import { prisma } from "./prisma";

/**
 * SHA-256 hash helper
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Generate cryptographically secure random hex string
 */
export function generateRandomToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("hex");
}

/**
 * Sign an admin payload with HMAC-SHA256
 */
function getAdminSecretKey(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SECRET or ADMIN_SESSION_SECRET environment variable is not configured");
  }
  return secret;
}

export interface AdminSessionPayload {
  role: "admin";
  issuedAt: number;
  expiresAt: number;
}

/**
 * Create a signed admin session token.
 * Valid for 8 hours.
 */
export function createAdminSessionToken(hoursValid = 8): string {
  const secretKey = getAdminSecretKey();
  const now = Date.now();
  const payload: AdminSessionPayload = {
    role: "admin",
    issuedAt: now,
    expiresAt: now + hoursValid * 60 * 60 * 1000,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(payloadB64)
    .digest("base64url");

  return `${payloadB64}.${signature}`;
}

/**
 * Verify a signed admin session token.
 */
export function verifyAdminSessionToken(token: string | undefined | null): AdminSessionPayload | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;
  try {
    const secretKey = getAdminSecretKey();
    const expectedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(payloadB64)
      .digest("base64url");

    // Timing-safe comparison to prevent side-channel attacks
    const sigA = Buffer.from(signature);
    const sigB = Buffer.from(expectedSignature);
    if (sigA.length !== sigB.length || !crypto.timingSafeEqual(sigA, sigB)) {
      return null;
    }

    const payload: AdminSessionPayload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf-8")
    );

    if (payload.role !== "admin" || Date.now() > payload.expiresAt) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Shared persistent rate limiter backed by Neon PostgreSQL.
 * Complies with requirement: "Do not rely on an in-memory Map for production rate limiting."
 */
export async function checkRateLimit(
  key: string,
  maxPoints: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  const now = new Date();
  const expireAt = new Date(now.getTime() + windowSeconds * 1000);

  try {
    // Atomic upsert with Postgres
    const record = await prisma.rateLimit.upsert({
      where: { key },
      create: {
        key,
        points: 1,
        expireAt,
      },
      update: {
        points: {
          increment: 1,
        },
      },
    });

    // If existing record was expired, reset it
    if (record.expireAt < now) {
      const resetRecord = await prisma.rateLimit.update({
        where: { key },
        data: {
          points: 1,
          expireAt,
        },
      });
      return {
        allowed: true,
        remaining: maxPoints - 1,
        resetAt: resetRecord.expireAt,
      };
    }

    const allowed = record.points <= maxPoints;
    const remaining = Math.max(0, maxPoints - record.points);

    return {
      allowed,
      remaining,
      resetAt: record.expireAt,
    };
  } catch (error) {
    // Fallback gracefully on transient DB error, logging safe error
    console.error("Rate limiter database error:", error instanceof Error ? error.message : "unknown");
    return {
      allowed: true,
      remaining: 1,
      resetAt: expireAt,
    };
  }
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
export function timingSafeMatch(a: string | undefined | null, b: string | undefined | null): boolean {
  if (typeof a !== "string" || typeof b !== "string") {
    return false;
  }
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Validate UUID v4/standard string format
 */
export function isUuid(val: string | undefined | null): boolean {
  if (!val || typeof val !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val.trim());
}

/**
 * Periodic pruning of expired RateLimit database rows to prevent unbounded table growth
 */
export async function pruneExpiredRateLimits(): Promise<number> {
  try {
    const res = await prisma.rateLimit.deleteMany({
      where: {
        expireAt: { lt: new Date() },
      },
    });
    return res.count;
  } catch (err) {
    console.error("Failed to prune expired rate limits:", err instanceof Error ? err.message : "unknown");
    return 0;
  }
}

/**
 * Get client IP address from standard headers with strict sanitization.
 * Prioritizes trusted edge headers (cf-connecting-ip, x-real-ip) over x-forwarded-for,
 * and strips any spoofed characters.
 */
export function getClientIp(headers: Headers): string {
  // 1. Cloudflare / direct edge IP headers (cannot be forged by end-clients when behind proxy)
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp && isValidIpFormat(cfIp.trim())) {
    return sanitizeIp(cfIp.trim());
  }

  const realIp = headers.get("x-real-ip");
  if (realIp && isValidIpFormat(realIp.trim())) {
    return sanitizeIp(realIp.trim());
  }

  const vercelIp = headers.get("x-vercel-ip");
  if (vercelIp && isValidIpFormat(vercelIp.trim())) {
    return sanitizeIp(vercelIp.trim());
  }

  // 2. X-Forwarded-For fallback (extract first valid IP from comma-separated list)
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",");
    for (const part of parts) {
      const candidate = part.trim();
      if (isValidIpFormat(candidate)) {
        return sanitizeIp(candidate);
      }
    }
  }

  return "127.0.0.1";
}

function isValidIpFormat(ip: string): boolean {
  if (!ip || ip.length > 45) return false;
  // Strict check for IPv4 or IPv6 format
  const ipv4Regex = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
  const ipv6Regex = /^[0-9a-fA-F:]{2,45}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

function sanitizeIp(ip: string): string {
  return ip.replace(/[^0-9a-fA-F:.]/g, "").slice(0, 45);
}
