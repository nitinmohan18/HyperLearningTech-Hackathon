import { loadEnvConfig } from "@next/env";
import path from "node:path";

// Load development environment
loadEnvConfig(path.resolve(process.cwd()), true);

async function main() {
  const { getResendClient, getSenderEmail, getReplyToEmail, getOwnerEmail } = await import("../src/lib/email-outbox");
  console.log("\n=======================================================");
  console.log("RESEND EMAIL INTEGRATION AUDIT & LIVE TEST");
  console.log("=======================================================\n");

  const apiKey = process.env.RESEND_API_KEY;
  const sender = getSenderEmail();
  const replyTo = getReplyToEmail();
  const owner = getOwnerEmail();

  // Test recipient MUST be explicitly configured and never a real participant
  const testRecipient = process.env.TEST_EMAIL_RECIPIENT || owner;

  console.log("Configuration audit:");
  console.log("- Sender (EMAIL_FROM):", sender);
  console.log("- Reply-To (EMAIL_REPLY_TO):", replyTo || "Not set (optional)");
  console.log("- Owner (OWNER_EMAIL):", owner);
  console.log("- Test Recipient:", testRecipient);
  console.log("- API Key Present:", Boolean(apiKey && apiKey.length > 5));

  if (!apiKey) {
    console.error("\nFAIL: RESEND_API_KEY is not set.");
    process.exit(1);
  }

  if (!sender.includes("@mail.hyperlearningtech.in") && !sender.includes("hyperlearningtech.in")) {
    console.warn("\nWARNING: Sender does not appear to use the verified sending domain.");
  }

  console.log("\nDispatching 1 safe diagnostic test email to:", testRecipient);

  const resend = getResendClient();
  if (!resend) {
    console.error("FAIL: Could not initialize Resend client.");
    process.exit(1);
  }

  const timestamp = new Date().toISOString();
  const testSubject = `[TEST] HyperLearningTech Winter Hackathon '26 — Resend Verification (${timestamp})`;

  const testHtml = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: -apple-system, sans-serif; background: #0c0907; color: #f0eae1; padding: 24px;">
        <div style="background: #140e0a; border: 1px solid #c89f6d44; border-radius: 12px; max-width: 560px; margin: 0 auto; padding: 28px;">
          <h2 style="color: #c89f6d; margin-top: 0;">HyperLearningTech Winter Hackathon '26</h2>
          <p style="font-size: 14px; color: #f0eae1;">This is a safe diagnostic test verifying the Resend transactional email integration.</p>
          <div style="background: #1e150f; border-radius: 8px; padding: 14px; font-family: monospace; font-size: 12px; color: #dfc4a2; line-height: 1.7;">
            <div><strong>Verified Sending Domain:</strong> mail.hyperlearningtech.in</div>
            <div><strong>Sender Address:</strong> ${sender}</div>
            <div><strong>Reply-To:</strong> ${replyTo || "Default"}</div>
            <div><strong>Timestamp:</strong> ${timestamp}</div>
            <div><strong>Status:</strong> Integration Operational</div>
          </div>
          <p style="font-size: 11px; color: #8e7a68; margin-top: 24px;">Organising Committee · HyperLearningTech Winter Hackathon '26</p>
        </div>
      </body>
    </html>
  `;

  const testText = `
HyperLearningTech Winter Hackathon '26 — Resend Verification
Timestamp: ${timestamp}
Sender: ${sender}
Reply-To: ${replyTo || "Default"}
Status: Integration Operational
  `.trim();

  try {
    const res = await resend.emails.send({
      from: sender,
      to: testRecipient,
      subject: testSubject,
      html: testHtml,
      text: testText,
      ...(replyTo ? { replyTo } : {}),
    });

    if (res.error) {
      console.error("\nFAIL: Resend API returned error:", res.error);
      process.exit(1);
    }

    console.log("\n✓ Test email dispatched successfully!");
    console.log("  Provider Message ID:", res.data?.id);
    console.log("  Recipient:", testRecipient);
    console.log("  Sender:", sender);
    console.log("\n=======================================================");
    console.log("AUDIT STATUS: RESEND INTEGRATION IS OPERATIONAL");
    console.log("=======================================================\n");
  } catch (err: any) {
    console.error("\nFAIL: Exception during email dispatch:", err.message || err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Unhandled error:", err);
  process.exit(1);
});
