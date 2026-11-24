import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
// Load Next.js development environment first
loadEnvConfig(projectDir, true);

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✓ ${testName}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failCount++;
  }
}

async function runVerification() {
  console.log("\n=======================================================");
  console.log("RUNTIME NEON DATABASE BRANCH PROTECTION VERIFICATION");
  console.log("=======================================================\n");

  const { getValidatedDatabaseUrl } = await import("../src/lib/prisma");

  // Test 1: Next.js development environment loading
  console.log("--- 1. Next.js Development Environment Loading (.env.development.local) ---");

  const devDbUrl = process.env.DATABASE_URL;
  const devExpectedHost = process.env.EXPECTED_DATABASE_HOST;

  assert(Boolean(devDbUrl), "DATABASE_URL is defined in Next.js development runtime");
  assert(Boolean(devExpectedHost), "EXPECTED_DATABASE_HOST is defined in Next.js development runtime");

  const devActualHost = devDbUrl ? new URL(devDbUrl).hostname : "";
  const devNormActual = devActualHost.replace("-pooler", "");
  const devNormExpected = (devExpectedHost || "").replace("-pooler", "");

  assert(
    devNormActual.includes("ep-icy-fire-benpd9o6"),
    `Runtime DATABASE_URL hostname is the DEVELOPMENT Neon branch (${devActualHost})`
  );
  assert(
    !devNormActual.includes("ep-frosty-smoke-befmuhgw"),
    "Runtime DATABASE_URL is NOT falling back to the production Neon branch"
  );
  assert(
    devNormActual === devNormExpected,
    `Runtime DATABASE_URL hostname matches EXPECTED_DATABASE_HOST (${devNormExpected})`
  );

  // Test 2: Runtime Branch Validation Functionality
  console.log("\n--- 2. Runtime Validation in src/lib/prisma.ts ---");

  // Valid branch match succeeds
  let validatedUrl = "";
  try {
    validatedUrl = getValidatedDatabaseUrl();
  } catch (err: any) {
    console.error("Unexpected error:", err.message);
  }
  assert(Boolean(validatedUrl), "getValidatedDatabaseUrl() succeeds when branch matches");

  // Mismatch branch throws safe error
  console.log("\n--- 3. Mismatch Protection Tests ---");
  const originalExpected = process.env.EXPECTED_DATABASE_HOST;
  process.env.EXPECTED_DATABASE_HOST = "ep-wrong-branch.c-9.us-east-2.aws.neon.tech";
  let mismatchCaught = false;
  let mismatchErrorMessage = "";
  try {
    getValidatedDatabaseUrl();
  } catch (err: any) {
    mismatchCaught = true;
    mismatchErrorMessage = err.message;
  }
  assert(mismatchCaught, "Mismatched EXPECTED_DATABASE_HOST throws an error");
  assert(
    mismatchErrorMessage.includes("Database branch validation failed"),
    "Error message explains branch validation failure"
  );
  assert(
    !mismatchErrorMessage.includes("postgres://") &&
    !mismatchErrorMessage.includes("postgresql://") &&
    !mismatchErrorMessage.includes("@"),
    "Error message does NOT leak connection strings, credentials, or passwords"
  );

  // Missing EXPECTED_DATABASE_HOST
  delete process.env.EXPECTED_DATABASE_HOST;
  let missingExpectedCaught = false;
  try {
    getValidatedDatabaseUrl();
  } catch (err: any) {
    missingExpectedCaught = true;
    assert(err.message.includes("EXPECTED_DATABASE_HOST is not set"), "Missing EXPECTED_DATABASE_HOST fails safely");
  }
  assert(missingExpectedCaught, "Missing EXPECTED_DATABASE_HOST is rejected");

  // Missing DATABASE_URL
  const originalDbUrl = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;
  let missingDbCaught = false;
  try {
    getValidatedDatabaseUrl();
  } catch (err: any) {
    missingDbCaught = true;
    assert(err.message.includes("DATABASE_URL is not set"), "Missing DATABASE_URL fails safely");
  }
  assert(missingDbCaught, "Missing DATABASE_URL is rejected");

  // Restore env
  process.env.EXPECTED_DATABASE_HOST = originalExpected;
  process.env.DATABASE_URL = originalDbUrl;

  console.log("\n=======================================================");
  console.log(`VERIFICATION RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
  console.log("=======================================================\n");

  if (failCount > 0) {
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error("Verification fatal error:", err);
  process.exit(1);
});
