import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd(), true);

import { PDFDocument } from "pdf-lib";

async function testB2Storage() {
  console.log("\n=======================================================");
  console.log("BACKBLAZE B2 S3-COMPATIBLE STORAGE INTEGRATION TEST");
  console.log("=======================================================\n");

  const keyId =
    process.env.B2_APPLICATION_KEY_ID ||
    process.env.B2_KEY_ID ||
    process.env.R2_ACCESS_KEY_ID;
  const appKey =
    process.env.B2_APPLICATION_KEY ||
    process.env.B2_SECRET_ACCESS_KEY ||
    process.env.R2_SECRET_ACCESS_KEY;
  const bucket =
    process.env.B2_BUCKET_NAME || process.env.R2_BUCKET_NAME;
  const endpoint =
    process.env.B2_ENDPOINT || process.env.R2_ENDPOINT;
  const region =
    process.env.B2_REGION || "us-east-005";

  console.log("Configuration Inspection:");
  console.log(`- B2_APPLICATION_KEY_ID: ${keyId ? "CONFIGURED (" + keyId.slice(0, 6) + "...)" : "MISSING"}`);
  console.log(`- B2_APPLICATION_KEY:    ${appKey ? "CONFIGURED (hidden)" : "MISSING"}`);
  console.log(`- B2_BUCKET_NAME:        ${bucket ? "CONFIGURED (" + bucket + ")" : "MISSING"}`);
  console.log(`- B2_ENDPOINT:           ${endpoint ? "CONFIGURED (" + endpoint + ")" : "MISSING"}`);
  console.log(`- B2_REGION:             ${region ? "CONFIGURED (" + region + ")" : "MISSING"}`);

  if (!keyId || !appKey || !bucket || !endpoint) {
    console.log("\n⚠️  Backblaze B2 credentials are not yet configured in your environment.");
    console.log("Please configure the following in .env or .env.local:");
    console.log("  1. B2_APPLICATION_KEY_ID (keyID from Backblaze App Keys)");
    console.log("  2. B2_APPLICATION_KEY    (applicationKey secret from Backblaze App Keys)");
    console.log("  3. B2_BUCKET_NAME        (Private bucket name created in B2)");
    console.log("  4. B2_REGION             (e.g. us-east-005)");
    console.log("  5. B2_ENDPOINT           (e.g. https://s3.us-east-005.backblazeb2.com)");
    console.log("\nOnce configured, re-run this script to execute live upload & download verification.\n");
    return;
  }

  const {
    getB2Client,
    getB2BucketName,
    getPresignedUploadUrl,
    getPresignedDownloadUrl,
    getObjectMetadata,
    getObjectBuffer,
    deleteObject,
  } = await import("../src/lib/b2");

  const testKey = `diagnostics/test-${Date.now()}.pdf`;

  try {
    console.log("\n--- Step 1: Generating Presigned Upload PUT URL ---");
    const uploadUrl = await getPresignedUploadUrl(testKey, "application/pdf", 120);
    console.log("  ✓ Presigned upload URL generated successfully");

    console.log("\n--- Step 2: Uploading Diagnostic Test PDF Document ---");
    const doc = await PDFDocument.create();
    doc.addPage([400, 400]);
    const pdfBytes = Buffer.from(await doc.save());

    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/pdf",
      },
      body: pdfBytes,
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      throw new Error(`Direct B2 PUT upload failed (HTTP ${uploadRes.status}): ${errText}`);
    }
    console.log(`  ✓ Uploaded ${pdfBytes.length} bytes directly to Backblaze B2`);

    console.log("\n--- Step 3: Verifying Object Metadata (HeadObject) ---");
    const meta = await getObjectMetadata(testKey);
    console.log(`  ✓ Object verified on B2. ContentLength: ${meta.ContentLength} bytes, ETag: ${meta.ETag}`);

    console.log("\n--- Step 4: Downloading Object Buffer Server-Side (GetObject) ---");
    const downloadedBuffer = await getObjectBuffer(testKey);
    if (downloadedBuffer.length !== pdfBytes.length) {
      throw new Error(`Buffer length mismatch: expected ${pdfBytes.length}, got ${downloadedBuffer.length}`);
    }
    console.log(`  ✓ Successfully downloaded ${downloadedBuffer.length} bytes; integrity confirmed`);

    console.log("\n--- Step 5: Generating Presigned Download GET URL ---");
    const downloadUrl = await getPresignedDownloadUrl(testKey, "diagnostic-test.pdf", 120);
    console.log("  ✓ Presigned download URL generated successfully");

    console.log("\n--- Step 6: Cleaning Up Test Object (DeleteObject) ---");
    await deleteObject(testKey);
    console.log("  ✓ Test object cleaned up from private B2 bucket");

    console.log("\n=======================================================");
    console.log("RESULT: ALL BACKBLAZE B2 STORAGE TESTS PASSED (100% OPERATIONAL)");
    console.log("=======================================================\n");
  } catch (err: any) {
    console.error("\n✗ Backblaze B2 Test Failed:", err instanceof Error ? err.message : err);
    // Cleanup attempt
    try {
      await deleteObject(testKey);
    } catch {}
    process.exit(1);
  }
}

testB2Storage().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
