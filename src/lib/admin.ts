import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { COOKIE_NAMES } from "./constants";
import { verifyAdminSessionToken } from "./security";

/**
 * Verify if incoming request is from an authenticated admin with strict CSRF and origin validation.
 */
export async function verifyAdminRequest(req?: NextRequest | Request): Promise<{
  authenticated: boolean;
  status: number;
  message?: string;
}> {
  // 1. Enforce CSRF protection on state-changing mutation requests
  if (req && req.method && !["GET", "HEAD", "OPTIONS"].includes(req.method.toUpperCase())) {
    const secFetchSite = req.headers.get("sec-fetch-site");
    if (secFetchSite === "cross-site") {
      return { authenticated: false, status: 403, message: "Forbidden: Cross-site request rejected." };
    }

    const origin = req.headers.get("origin");
    const host = req.headers.get("host");

    if (origin && host) {
      try {
        const originUrl = new URL(origin);
        const originHostname = originUrl.hostname.toLowerCase();
        // Host header might include port
        const hostHostname = host.split(":")[0].toLowerCase();

        const appUrlHost = process.env.APP_URL
          ? new URL(process.env.APP_URL).hostname.toLowerCase()
          : null;

        const isAllowed =
          originHostname === hostHostname ||
          (appUrlHost && originHostname === appUrlHost) ||
          originHostname === "localhost" ||
          originHostname === "127.0.0.1";

        if (!isAllowed) {
          return { authenticated: false, status: 403, message: "Forbidden: Origin verification failed." };
        }
      } catch {
        return { authenticated: false, status: 403, message: "Forbidden: Malformed origin header." };
      }
    }
  }

  // 2. Extract and verify admin session token
  let token: string | undefined = undefined;

  // NextRequest cookies object
  if (req && "cookies" in req && typeof (req as any).cookies?.get === "function") {
    token = (req as any).cookies.get(COOKIE_NAMES.ADMIN_SESSION)?.value;
  }

  // Standard Request headers cookie fallback
  if (!token && req && "headers" in req && typeof req.headers?.get === "function") {
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAMES.ADMIN_SESSION}=([^;]+)`));
      if (match) {
        token = decodeURIComponent(match[1]);
      }
    }
  }

  // Next.js server component context fallback
  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(COOKIE_NAMES.ADMIN_SESSION)?.value;
    } catch {
      // Gracefully handle execution outside Next.js request store (e.g., test runners)
    }
  }

  if (!token) {
    return { authenticated: false, status: 401, message: "Unauthorized. Admin session required." };
  }

  const payload = verifyAdminSessionToken(token);
  if (!payload) {
    return { authenticated: false, status: 401, message: "Session expired or invalid. Please log in again." };
  }

  return { authenticated: true, status: 200 };
}
