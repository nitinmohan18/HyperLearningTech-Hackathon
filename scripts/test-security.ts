import {
  getClientIp,
  isUuid,
  timingSafeMatch,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "../src/lib/security";
import { verifyAdminRequest } from "../src/lib/admin";
import {
  UploadUrlRequestSchema,
  AdminPaymentVerifySchema,
  AdminPaymentRejectSchema,
  RegistrationSubmitSchema,
} from "../src/lib/validations";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  \x1b[32m[PASS]\x1b[0m ${testName}`);
    passed++;
  } else {
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${testName}${detail ? ` (${detail})` : ""}`);
    failed++;
  }
}

async function runSecurityTests() {
  process.env.ADMIN_SECRET = process.env.ADMIN_SECRET || "security-test-admin-secret-key-32chars";

  console.log("\n=======================================================");
  console.log("  HYPERLEARNINGTECH SECURITY HARDENING TEST SUITE");
  console.log("=======================================================\n");

  // SECTION 1: Client IP Sanitization & Header Spoofing Protection
  console.log("Section 1: Client IP Sanitization & Header Spoofing Protection");
  {
    // Trust cf-connecting-ip
    const h1 = new Headers({ "cf-connecting-ip": "203.0.113.195", "x-forwarded-for": "10.0.0.1" });
    assert(getClientIp(h1) === "203.0.113.195", "Prioritizes trusted Cloudflare connecting IP over x-forwarded-for");

    // Trust x-real-ip
    const h2 = new Headers({ "x-real-ip": "198.51.100.42" });
    assert(getClientIp(h2) === "198.51.100.42", "Extracts trusted x-real-ip");

    // Malicious header injection with path traversal / SQL in IP
    const h3 = new Headers({ "x-forwarded-for": "'; DROP TABLE RateLimit; --, 127.0.0.1" });
    const ip3 = getClientIp(h3);
    assert(ip3 === "127.0.0.1", "Sanitizes SQL injection attempts in x-forwarded-for and extracts clean IP");

    // IPv6 support
    const h4 = new Headers({ "x-real-ip": "2001:0db8:85a3:0000:0000:8a2e:0370:7334" });
    assert(getClientIp(h4) === "2001:0db8:85a3:0000:0000:8a2e:0370:7334", "Supports and validates valid IPv6 addresses");

    // Blank / missing headers fallback
    const h5 = new Headers({});
    assert(getClientIp(h5) === "127.0.0.1", "Gracefully falls back to 127.0.0.1 when no headers present");
  }

  // SECTION 2: CSRF & Origin Verification on Admin Endpoints
  console.log("\nSection 2: CSRF & Origin Verification on Admin Endpoints");
  {
    const adminToken = createAdminSessionToken(1);

    // Cross-site fetch blocked
    const crossSiteReq = new Request("https://hackathon.hyperlearningtech.in/api/admin/payments/123/verify", {
      method: "POST",
      headers: {
        cookie: `hlt_admin_session=${adminToken}`,
        "sec-fetch-site": "cross-site",
      },
    });
    const auth1 = await verifyAdminRequest(crossSiteReq);
    assert(!auth1.authenticated && auth1.status === 403, "Blocks cross-site state mutation with sec-fetch-site: cross-site");

    // Origin mismatch blocked
    const originMismatchReq = new Request("https://hackathon.hyperlearningtech.in/api/admin/payments/123/verify", {
      method: "POST",
      headers: {
        cookie: `hlt_admin_session=${adminToken}`,
        host: "hackathon.hyperlearningtech.in",
        origin: "https://evil-attacker-site.com",
      },
    });
    const auth2 = await verifyAdminRequest(originMismatchReq);
    assert(!auth2.authenticated && auth2.status === 403, "Blocks cross-origin state mutation with origin mismatch");

    // Same-origin request allowed
    const validReq = new Request("https://hackathon.hyperlearningtech.in/api/admin/payments/123/verify", {
      method: "POST",
      headers: {
        cookie: `hlt_admin_session=${adminToken}`,
        host: "hackathon.hyperlearningtech.in",
        origin: "https://hackathon.hyperlearningtech.in",
        "sec-fetch-site": "same-origin",
      },
    });
    const auth3 = await verifyAdminRequest(validReq);
    assert(auth3.authenticated && auth3.status === 200, "Allows legitimate same-origin authenticated admin requests");

    // Safe methods (GET) bypass CSRF checks
    const getReq = new Request("https://hackathon.hyperlearningtech.in/api/admin/registrations", {
      method: "GET",
      headers: {
        cookie: `hlt_admin_session=${adminToken}`,
      },
    });
    const auth4 = await verifyAdminRequest(getReq);
    assert(auth4.authenticated && auth4.status === 200, "Safe read requests (GET) verify session without CSRF blocks");
  }

  // SECTION 3: Timing-Safe Comparison & Session Token Tampering
  console.log("\nSection 3: Timing-Safe Comparison & Session Token Tampering");
  {
    // Valid timing safe match
    assert(timingSafeMatch("secret-key-12345", "secret-key-12345"), "timingSafeMatch returns true for identical secrets");
    assert(!timingSafeMatch("secret-key-12345", "secret-key-wrong"), "timingSafeMatch returns false for different secrets");
    assert(!timingSafeMatch("secret-key-12345", "short"), "timingSafeMatch returns false for different length secrets without throwing");
    assert(!timingSafeMatch(null, "secret"), "timingSafeMatch handles null gracefully without throwing");

    // Tampered session token
    const token = createAdminSessionToken(1);
    const [payloadB64, sig] = token.split(".");
    const tamperedPayload = Buffer.from(JSON.stringify({ role: "admin", issuedAt: Date.now(), expiresAt: Date.now() + 100000000 })).toString("base64url");
    const tamperedToken = `${tamperedPayload}.${sig}`;
    assert(verifyAdminSessionToken(tamperedToken) === null, "Rejects tampered admin session token with signature mismatch");

    // Malformed session token format
    assert(verifyAdminSessionToken("not-a-token") === null, "Rejects malformed session token string");
    assert(verifyAdminSessionToken("") === null, "Rejects empty session token");
  }

  // SECTION 4: Storage Key Security & Path Traversal Prevention
  console.log("\nSection 4: Storage Key Security & Path Traversal Prevention");
  {
    // Upload parameter schema rejects path traversal in filenames
    const badFile1 = UploadUrlRequestSchema.safeParse({ filename: "../../etc/passwd" });
    assert(!badFile1.success, "UploadUrlRequestSchema rejects directory traversal (..) in filename");

    const badFile2 = UploadUrlRequestSchema.safeParse({ filename: "evil\0.pdf" });
    assert(!badFile2.success, "UploadUrlRequestSchema rejects null bytes (\\0) in filename");

    const oversizedFile = UploadUrlRequestSchema.safeParse({ filename: "deck.pdf", sizeBytes: 6 * 1024 * 1024 });
    assert(!oversizedFile.success, "UploadUrlRequestSchema rejects files exceeding 5 MB limit");

    const validUploadReq = UploadUrlRequestSchema.safeParse({ filename: "deck.pdf", sizeBytes: 2 * 1024 * 1024 });
    assert(validUploadReq.success, "UploadUrlRequestSchema accepts valid PDF filename and size");

    // Storage key regex in registration submission schema
    const baseRegistration = {
      type: "SOLO" as const,
      teamName: "Security Test",
      projectTitle: "Securing Registrations",
      techStack: "Next.js, Prisma",
      problemStatement: "A comprehensive problem statement for the hackathon application.",
      existingCodeDisclosure: "None",
      aiUsageDisclosure: "None",
      participants: [
        {
          fullName: "Alice Security",
          email: "alice.sec@example.com",
          phone: "+919876543210",
          college: "IIT Bombay",
          githubUsername: "alicesec",
          role: "LEADER" as const,
          sortOrder: 0,
        },
      ],
    };

    // Traversal in storageKey
    const badKeyReg = RegistrationSubmitSchema.safeParse({
      ...baseRegistration,
      proposal: {
        storageKey: "proposals/uploads/../../etc/passwd.pdf",
        originalName: "deck.pdf",
      },
    });
    assert(!badKeyReg.success, "RegistrationSubmitSchema rejects directory traversal in proposal storageKey");

    // Invalid extension in storageKey
    const badExtReg = RegistrationSubmitSchema.safeParse({
      ...baseRegistration,
      proposal: {
        storageKey: "proposals/uploads/0123456789abcdef0123456789abcdef01234567.exe",
        originalName: "deck.exe",
      },
    });
    assert(!badExtReg.success, "RegistrationSubmitSchema rejects executable extensions in proposal storageKey");

    // Valid 40-character hex key with .pdf extension
    const validKeyReg = RegistrationSubmitSchema.safeParse({
      ...baseRegistration,
      proposal: {
        storageKey: "proposals/uploads/0123456789abcdef0123456789abcdef01234567.pdf",
        originalName: "deck.pdf",
      },
    });
    assert(validKeyReg.success, "RegistrationSubmitSchema accepts strictly formatted proposal storageKey");
  }

  // SECTION 5: UUID Validation & Parameter Injection Defense
  console.log("\nSection 5: UUID Validation & Parameter Injection Defense");
  {
    assert(isUuid("a0000000-0000-4000-8000-000000000001"), "isUuid returns true for valid UUID");
    assert(!isUuid("HLT-W26-1234"), "isUuid returns false for registration numbers");
    assert(!isUuid("'; DROP TABLE Registration; --"), "isUuid returns false for SQL injection strings");
    assert(!isUuid(""), "isUuid returns false for empty string");
    assert(!isUuid(null), "isUuid returns false for null");
  }

  // SECTION 6: Admin Mutation Input Length & Type Limits
  console.log("\nSection 6: Admin Mutation Input Length & Type Limits");
  {
    // Verify schema limits
    const validVerify = AdminPaymentVerifySchema.safeParse({ verifiedBy: "Admin", note: "Verified via UPI statement" });
    assert(validVerify.success, "AdminPaymentVerifySchema accepts valid verification parameters");

    const giantNoteVerify = AdminPaymentVerifySchema.safeParse({ note: "a".repeat(1001) });
    assert(!giantNoteVerify.success, "AdminPaymentVerifySchema rejects notes longer than 1000 characters");

    // Reject schema limits
    const validReject = AdminPaymentRejectSchema.safeParse({ note: "UTR mismatch" });
    assert(validReject.success, "AdminPaymentRejectSchema accepts valid reject note");

    const giantNoteReject = AdminPaymentRejectSchema.safeParse({ note: "a".repeat(1001) });
    assert(!giantNoteReject.success, "AdminPaymentRejectSchema rejects reject notes longer than 1000 characters");
  }

  console.log("\n=======================================================");
  console.log(`  Security Test Results: ${passed} Passed, ${failed} Failed`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runSecurityTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
