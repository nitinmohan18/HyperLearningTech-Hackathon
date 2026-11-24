import { Resend } from "resend";
import { prisma } from "./prisma";
import { EVENT_DETAILS } from "./constants";

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

export function getSenderEmail(): string {
  return (
    process.env.EMAIL_FROM ||
    "HyperLearningTech <registrations@mail.hyperlearningtech.in>"
  );
}

export function getReplyToEmail(): string | undefined {
  return process.env.EMAIL_REPLY_TO || undefined;
}

export function getOwnerEmail(): string {
  return process.env.OWNER_EMAIL || "hyperlearningtech@gmail.com";
}

/**
 * Email A: Participant Acknowledgement Template
 */
export function renderParticipantAckHtml(payload: {
  registrationNumber: string;
  type: string;
  teamName?: string | null;
  leaderName: string;
  feeFormatted: string;
  transactionReference?: string | null;
}): { subject: string; html: string; text: string } {
  const subject = `HyperLearningTech Winter Hackathon '26 — Registration Successfully Initiated [${payload.registrationNumber}]`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0907; color: #f0eae1; margin: 0; padding: 24px; }
          .card { background-color: #140e0a; border: 1px solid #c89f6d33; border-radius: 12px; max-width: 600px; margin: 0 auto; padding: 32px; }
          .header { text-align: center; border-bottom: 1px solid #c89f6d22; padding-bottom: 20px; }
          .title { font-size: 24px; font-weight: 600; color: #f0eae1; margin: 8px 0; }
          .subtitle { color: #c89f6d; font-size: 14px; text-transform: uppercase; letter-spacing: 0.15em; font-family: monospace; }
          .badge { display: inline-block; background-color: #2b1f15; color: #dfc4a2; padding: 6px 12px; border-radius: 6px; font-family: monospace; font-size: 14px; margin: 16px 0; border: 1px solid #c89f6d44; }
          .details { margin: 24px 0; background-color: #1a120d; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.8; }
          .notice { background-color: #261a10; border-left: 4px solid #c89f6d; padding: 14px; margin: 20px 0; font-size: 13px; color: #dfc4a2; line-height: 1.6; }
          .footer { font-size: 12px; color: #8e7a68; text-align: center; margin-top: 32px; border-top: 1px solid #c89f6d22; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div class="subtitle">Official Notice · 1st Edition</div>
            <div class="title">Registration Successfully Initiated</div>
          </div>
          <p>Hello <strong>${payload.leaderName}</strong>,</p>
          <p>Your registration application for <strong>${EVENT_DETAILS.name}</strong> has been logged in our system.</p>

          <div style="text-align: center;">
            <div class="badge">Registration ID: ${payload.registrationNumber}</div>
          </div>

          <div class="details">
            <div><strong>Format:</strong> ${payload.type} Entry</div>
            ${payload.teamName ? `<div><strong>Team Name:</strong> ${payload.teamName}</div>` : ""}
            <div><strong>Participation Fee:</strong> ${payload.feeFormatted}</div>
            ${payload.transactionReference ? `<div><strong>Payment Reference:</strong> ${payload.transactionReference}</div>` : ""}
            <div><strong>Competition Dates:</strong> ${EVENT_DETAILS.dates} (24 Hours)</div>
          </div>

          <div class="notice">
            <strong>Important Status Note:</strong> Your manual UPI payment is currently <strong>awaiting verification</strong> by the organising team. Your participation spot is officially confirmed once the payment reference is cross-verified against official banking statements.
          </div>

          <p>Please preserve this Registration ID for all future correspondence.</p>

          <div class="footer">
            HyperLearningTech Winter Hackathon '26<br/>
            Support: registrations@mail.hyperlearningtech.in · https://hackathon.hyperlearningtech.in
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
HyperLearningTech Winter Hackathon '26 — Registration Initiated
Registration ID: ${payload.registrationNumber}

Hello ${payload.leaderName},

Your registration application has been successfully logged.
Format: ${payload.type} Entry
${payload.teamName ? `Team Name: ${payload.teamName}\n` : ""}Fee: ${payload.feeFormatted}
${payload.transactionReference ? `Payment Ref: ${payload.transactionReference}\n` : ""}Event Dates: ${EVENT_DETAILS.dates}

Important Note: Your payment is currently awaiting manual verification. Your participation spot will be confirmed once verification completes.
Support: registrations@mail.hyperlearningtech.in
  `.trim();

  return { subject, html, text };
}

/**
 * Email B: Owner Notification Template
 */
export function renderOwnerNotificationHtml(payload: {
  registrationNumber: string;
  type: string;
  teamName?: string | null;
  feeFormatted: string;
  submittedAt: string;
  projectTitle: string;
  techStack: string;
  problemStatement: string;
  transactionReference?: string | null;
  proposalFileName?: string | null;
  participants: Array<{
    fullName: string;
    email: string;
    phone: string;
    college: string;
    githubUsername: string;
    role: string;
  }>;
  adminUrl: string;
}): { subject: string; html: string; text: string } {
  const subject = `[NEW REGISTRATION] ${payload.registrationNumber} — ${payload.teamName || payload.participants[0]?.fullName} (${payload.type})`;

  const participantsHtml = payload.participants
    .map(
      (p, i) => `
      <div style="margin-bottom: 12px; padding: 10px; background: #22160e; border-radius: 6px;">
        <strong>#${i + 1} ${p.fullName} (${p.role})</strong><br/>
        Email: ${p.email} | Phone: ${p.phone}<br/>
        GitHub: <a href="https://github.com/${p.githubUsername}" style="color: #c89f6d;">@${p.githubUsername}</a> | College: ${p.college}
      </div>
    `
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: -apple-system, sans-serif; background: #0c0907; color: #f0eae1; padding: 20px;">
        <div style="background: #140e0a; border: 1px solid #c89f6d44; border-radius: 10px; max-width: 650px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #c89f6d; margin-top: 0;">New Hackathon Registration Received</h2>
          <p><strong>Registration ID:</strong> ${payload.registrationNumber}</p>
          <p><strong>Submitted At:</strong> ${payload.submittedAt}</p>
          <p><strong>Format:</strong> ${payload.type} | <strong>Fee:</strong> ${payload.feeFormatted}</p>
          ${payload.teamName ? `<p><strong>Team Name:</strong> ${payload.teamName}</p>` : ""}
          <p><strong>Payment Reference:</strong> <code>${payload.transactionReference || "None provided"}</code></p>

          <h3 style="color: #dfc4a2; border-bottom: 1px solid #332215; padding-bottom: 6px;">Project Brief</h3>
          <p><strong>Title:</strong> ${payload.projectTitle}</p>
          <p><strong>Tech Stack:</strong> ${payload.techStack}</p>
          <p><strong>Problem Statement:</strong> ${payload.problemStatement}</p>
          ${payload.proposalFileName ? `<p><strong>Attached Proposal:</strong> ${payload.proposalFileName}</p>` : ""}

          <h3 style="color: #dfc4a2; border-bottom: 1px solid #332215; padding-bottom: 6px;">Participants Roster (${payload.participants.length})</h3>
          ${participantsHtml}

          <div style="margin-top: 24px; text-align: center;">
            <a href="${payload.adminUrl}" style="background: #c89f6d; color: #0c0907; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 6px;">Open in Admin Console</a>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
NEW REGISTRATION: ${payload.registrationNumber}
Format: ${payload.type}
Team: ${payload.teamName || "N/A"}
Payment Ref: ${payload.transactionReference || "N/A"}
Project: ${payload.projectTitle}
Participants: ${payload.participants.map((p) => `${p.fullName} (@${p.githubUsername}) - ${p.email}`).join("; ")}
Admin Link: ${payload.adminUrl}
  `.trim();

  return { subject, html, text };
}

/**
 * Email C: Spot Confirmation Template
 */
export function renderSpotConfirmedHtml(payload: {
  registrationNumber: string;
  type: string;
  teamName?: string | null;
  leaderName: string;
}): { subject: string; html: string; text: string } {
  const subject = `Your HyperLearningTech Winter Hackathon '26 Spot Is Confirmed! [${payload.registrationNumber}]`;

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: -apple-system, sans-serif; background: #0c0907; color: #f0eae1; padding: 24px;">
        <div style="background: #140e0a; border: 1px solid #4ade8066; border-radius: 12px; max-width: 600px; margin: 0 auto; padding: 32px;">
          <div style="text-align: center;">
            <div style="display: inline-block; background: #14532d; color: #86efac; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: bold; font-family: monospace;">PAYMENT VERIFIED & SPOT LOCKED</div>
            <h1 style="color: #f0eae1; font-size: 26px; margin: 16px 0 8px 0;">Your Hackathon Spot Is Confirmed!</h1>
            <p style="color: #9e8e7c; font-size: 14px;">Registration ID: <strong style="color: #f0eae1;">${payload.registrationNumber}</strong></p>
          </div>

          <p>Hello <strong>${payload.leaderName}</strong>,</p>
          <p>Great news! The organising committee has verified your payment for <strong>${payload.teamName || payload.type + " Entry"}</strong>. Your registration is officially <strong>CONFIRMED</strong>.</p>

          <div style="background: #1c140d; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px; line-height: 1.8;">
            <div><strong>Kickoff:</strong> 26 December 2026, 10:00 PM IST</div>
            <div><strong>Duration:</strong> 24 Hours (Submissions close 27 Dec 10:00 PM IST)</div>
            <div><strong>Format:</strong> 100% Online · Git-based Checkpoint Inspections</div>
          </div>

          <h3 style="color: #dfc4a2;">Important Next Steps:</h3>
          <ol style="color: #dfc4a2; font-size: 14px; line-height: 1.7; padding-left: 20px;">
            <li>Ensure the GitHub usernames provided have public profile visibility.</li>
            <li>You will receive an official repository collaboration invite prior to kickoff.</li>
            <li>Review the competition rules and checkpoint criteria on our portal.</li>
          </ol>

          <div style="text-align: center; margin-top: 30px;">
            <a href="https://hackathon.hyperlearningtech.in/rules" style="background: #c89f6d; color: #0c0907; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px;">Read Official Rules</a>
          </div>

          <div style="font-size: 12px; color: #8e7a68; text-align: center; margin-top: 32px; border-top: 1px solid #c89f6d22; padding-top: 20px;">
            HyperLearningTech Winter Hackathon '26 · Organising Committee
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Your HyperLearningTech Winter Hackathon '26 Spot Is Confirmed!
Registration ID: ${payload.registrationNumber}

Hello ${payload.leaderName},

Your payment has been verified and your spot is confirmed for ${EVENT_DETAILS.name}.
Kickoff: 26 December 2026, 10:00 PM IST
Duration: 24 Hours

Please review competition rules at https://hackathon.hyperlearningtech.in/rules
  `.trim();

  return { subject, html, text };
}

/**
 * Send a direct email via Resend without writing to outbox (for diagnostic tests).
 */
export async function sendDirectEmail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<{ id: string }> {
  const resend = getResendClient();
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const replyTo = getReplyToEmail();
  const res = await resend.emails.send({
    from: getSenderEmail(),
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    ...(replyTo ? { replyTo } : {}),
  });

  if (res.error) {
    throw new Error(res.error.message || "Resend API error");
  }

  if (!res.data?.id) {
    throw new Error("No message ID returned from Resend");
  }

  return { id: res.data.id };
}

/**
 * Process pending emails in the EmailOutbox queue.
 * Complies with requirement: "Email delivery must happen after the database transaction commits. An email failure must never delete or roll back a successfully submitted registration."
 */
export async function processEmailOutbox(registrationId?: string): Promise<{
  processed: number;
  sent: number;
  failed: number;
}> {
  const resend = getResendClient();
  const now = new Date();

  // 1. Recover stuck PROCESSING records:
  // If a worker crashed, timed out, or died, any item stuck in PROCESSING longer than
  // its 10-minute lease window is reset to FAILED so it can be safely re-claimed and retried.
  const stuckThreshold = new Date(Date.now() - 10 * 60 * 1000);
  await prisma.emailOutbox.updateMany({
    where: {
      status: "PROCESSING",
      OR: [
        { nextRetryAt: { lte: now } },
        { nextRetryAt: null, createdAt: { lte: stuckThreshold } },
      ],
    },
    data: {
      status: "FAILED",
      lastError: "Worker processing timed out; recovered for retry",
      nextRetryAt: now,
    },
  });

  const whereClause: any = {
    status: { in: ["PENDING", "FAILED"] },
    retryCount: { lt: 5 }, // maximum 5 retries
  };

  if (registrationId) {
    whereClause.registrationId = registrationId;
  } else {
    // Only fetch if nextRetryAt is null or in the past
    whereClause.OR = [
      { nextRetryAt: null },
      { nextRetryAt: { lte: now } },
    ];
  }

  const outboxItems = await prisma.emailOutbox.findMany({
    where: whereClause,
    take: 10,
    orderBy: { createdAt: "asc" },
  });

  let sent = 0;
  let failed = 0;

  for (const item of outboxItems) {
    // Duplicate-send prevention: atomically claim item with a 10-minute lease.
    // If another concurrent worker claimed it first, updateMany returns count: 0 and we skip.
    const leaseExpiration = new Date(Date.now() + 10 * 60 * 1000);
    const claim = await prisma.emailOutbox.updateMany({
      where: {
        id: item.id,
        status: { in: ["PENDING", "FAILED"] },
      },
      data: {
        status: "PROCESSING",
        nextRetryAt: leaseExpiration,
      },
    });

    if (claim.count === 0) {
      continue;
    }

    if (!resend) {
      // Dev mode fallback when RESEND_API_KEY is not configured
      console.log(`[EmailOutbox Mock] Resend not configured. Simulated delivery to ${item.recipient} (${item.emailType})`);
      await prisma.emailOutbox.update({
        where: { id: item.id },
        data: {
          status: "SENT",
          sentAt: new Date(),
          providerMessageId: `mock_${Date.now()}`,
          nextRetryAt: null,
        },
      });
      sent++;
      continue;
    }

    try {
      const payload: any = item.payload;
      let emailContent: { subject: string; html: string; text: string };

      if (item.emailType === "PARTICIPANT_ACK") {
        emailContent = renderParticipantAckHtml(payload);
      } else if (item.emailType === "OWNER_NOTICE") {
        emailContent = renderOwnerNotificationHtml(payload);
      } else if (item.emailType === "SPOT_CONFIRMED") {
        emailContent = renderSpotConfirmedHtml(payload);
      } else {
        throw new Error(`Unknown email type: ${item.emailType}`);
      }

      const replyTo = getReplyToEmail();
      // Upstream provider-level idempotency key: Resend retains idempotency keys for 24 hours.
      // This protects against in-flight duplicates and rapid retries during transient network timeouts.
      // Long-term deduplication and terminal state are permanently enforced by PostgreSQL's EmailOutbox table.
      const res = await resend.emails.send(
        {
          from: getSenderEmail(),
          to: item.recipient,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
          ...(replyTo ? { replyTo } : {}),
        },
        {
          idempotencyKey: item.id,
        }
      );

      if (res.error) {
        throw new Error(res.error.message || "Resend API error");
      }

      await prisma.emailOutbox.update({
        where: { id: item.id },
        data: {
          status: "SENT",
          sentAt: new Date(),
          providerMessageId: res.data?.id || null,
          nextRetryAt: null,
        },
      });
      sent++;
    } catch (err: any) {
      failed++;
      const errorMessage = err instanceof Error ? err.message : "Unknown send error";
      const nextRetryCount = item.retryCount + 1;
      // Exponential backoff: 1 min, 5 min, 15 min, 1 hour, 4 hours
      const backoffMinutes = [1, 5, 15, 60, 240][Math.min(nextRetryCount - 1, 4)];
      const nextRetryAt = new Date(Date.now() + backoffMinutes * 60 * 1000);

      await prisma.emailOutbox.update({
        where: { id: item.id },
        data: {
          status: "FAILED",
          retryCount: nextRetryCount,
          lastError: errorMessage.slice(0, 500),
          nextRetryAt,
        },
      });
      console.error(`Failed to send email outbox item ${item.id}:`, errorMessage);
    }
  }

  return { processed: outboxItems.length, sent, failed };
}
