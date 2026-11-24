import { NextRequest, NextResponse, after } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/security";
import { RATE_LIMITS, EVENT_DETAILS } from "@/lib/constants";
import {
  RegistrationSubmitSchema,
  normalizeEmail,
  normalizePhone,
  normalizeGithub,
} from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { processEmailOutbox } from "@/lib/email-outbox";
import { generateRegistrationNumber } from "@/lib/draft";
import { getObjectBuffer, deleteObject } from "@/lib/b2";
import { validateProposalBuffer } from "@/lib/file-validator";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    const rate = await checkRateLimit(
      `submit:${ip}`,
      RATE_LIMITS.FINAL_SUBMIT.points,
      RATE_LIMITS.FINAL_SUBMIT.windowSeconds
    );
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many submission attempts. Please wait a minute." },
        { status: 429 }
      );
    }

    // 1. Validate request body using Zod
    const body = await req.json().catch(() => ({}));
    const parsed = RegistrationSubmitSchema.safeParse(body);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json(
        { error: issue?.message || "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 2. Idempotency check: if client sent an idempotency key that was already registered
    if (data.idempotencyKey) {
      const existingByIdempotency = await prisma.registration.findUnique({
        where: { idempotencyKey: data.idempotencyKey },
        include: { payment: true },
      });

      if (existingByIdempotency) {
        const feeFormatted =
          existingByIdempotency.type === "SOLO"
            ? EVENT_DETAILS.soloFeeFormatted
            : EVENT_DETAILS.squadFeeFormatted;

        return NextResponse.json({
          success: true,
          alreadySubmitted: true,
          registrationNumber: existingByIdempotency.registrationNumber,
          status: existingByIdempotency.status,
          feePaise: existingByIdempotency.feePaise,
          feeFormatted,
        });
      }
    }

    // 3. Normalise all participant identities
    const normalizedParticipants = data.participants.map((p, idx) => ({
      ...p,
      role: idx === 0 ? ("LEADER" as const) : ("MEMBER" as const),
      sortOrder: idx,
      normalizedEmail: normalizeEmail(p.email),
      normalizedPhone: normalizePhone(p.phone),
      normalizedGithubUsername: normalizeGithub(p.githubUsername),
    }));

    // 4. Check for existing participant identities globally across all registrations
    const emailList = normalizedParticipants.map((p) => p.normalizedEmail);
    const phoneList = normalizedParticipants.map((p) => p.normalizedPhone);
    const githubList = normalizedParticipants.map((p) => p.normalizedGithubUsername);

    const [existingEmail, existingPhone, existingGithub] = await Promise.all([
      prisma.participant.findFirst({
        where: { normalizedEmail: { in: emailList } },
      }),
      prisma.participant.findFirst({
        where: { normalizedPhone: { in: phoneList } },
      }),
      prisma.participant.findFirst({
        where: { normalizedGithubUsername: { in: githubList } },
      }),
    ]);

    if (existingEmail) {
      return NextResponse.json(
        {
          error: `The email address '${existingEmail.email}' is already registered for this hackathon. Each participant may only register once.`,
          field: "email",
        },
        { status: 409 }
      );
    }

    if (existingPhone) {
      return NextResponse.json(
        {
          error: `The phone number '${existingPhone.phone}' is already registered for this hackathon. Each participant may only register once.`,
          field: "phone",
        },
        { status: 409 }
      );
    }

    if (existingGithub) {
      return NextResponse.json(
        {
          error: `The GitHub username '@${existingGithub.githubUsername}' is already registered for this hackathon. Each participant may only register once.`,
          field: "githubUsername",
        },
        { status: 409 }
      );
    }

    // 5. If proposal file was uploaded, download and validate binary signature and page count
    let proposalBuffer: Buffer | null = null;
    let proposalValidation: { valid: boolean; mimeType?: string; pageCount?: number; error?: string } | null = null;

    if (data.proposal?.storageKey) {
      const storageKey = data.proposal.storageKey;
      const keyPattern = /^proposals\/uploads\/[a-f0-9]{32,64}\.(pdf|pptx)$/i;
      if (!keyPattern.test(storageKey)) {
        return NextResponse.json({ error: "Invalid proposal storage key format." }, { status: 400 });
      }

      // Prevent reusing or hijacking a proposal key already attached to another registration
      const existingProposalFile = await prisma.proposalFile.findUnique({
        where: { storageKey },
      });
      if (existingProposalFile) {
        return NextResponse.json(
          { error: "This proposal file has already been registered with another submission." },
          { status: 409 }
        );
      }

      try {
        proposalBuffer = await getObjectBuffer(storageKey);
        proposalValidation = await validateProposalBuffer(proposalBuffer);

        if (!proposalValidation.valid) {
          await deleteObject(storageKey).catch(() => {});
          return NextResponse.json(
            { error: proposalValidation.error || "Invalid proposal deck. Maximum 7 pages/slides allowed." },
            { status: 400 }
          );
        }
      } catch (err: any) {
        console.error("Proposal file verification error:", err);
        return NextResponse.json(
          { error: "Failed to verify proposal file in storage. Please re-upload your proposal." },
          { status: 400 }
        );
      }
    }

    const feePaise = data.type === "SOLO" ? EVENT_DETAILS.soloFeePaise : EVENT_DETAILS.squadFeePaise;
    const feeFormatted = data.type === "SOLO" ? EVENT_DETAILS.soloFeeFormatted : EVENT_DETAILS.squadFeeFormatted;

    // 6. Generate collision-resistant registration number
    let registrationNumber = generateRegistrationNumber();
    for (let i = 0; i < 3; i++) {
      const collision = await prisma.registration.findUnique({
        where: { registrationNumber },
      });
      if (!collision) break;
      registrationNumber = generateRegistrationNumber();
    }

    // 7. Execute atomic PostgreSQL transaction
    const submissionResult = await prisma.$transaction(async (tx) => {
      // Create new Registration with status SUBMITTED
      const newRegistration = await tx.registration.create({
        data: {
          registrationNumber,
          type: data.type,
          teamName: data.teamName.trim(),
          status: "SUBMITTED",
          feePaise,
          projectTitle: data.projectTitle,
          techStack: data.techStack,
          problemStatement: data.problemStatement,
          existingCodeDisclosure: data.existingCodeDisclosure,
          aiUsageDisclosure: data.aiUsageDisclosure,
          submittedAt: new Date(),
          idempotencyKey: data.idempotencyKey || null,
        },
      });

      // Create Participants
      for (const p of normalizedParticipants) {
        await tx.participant.create({
          data: {
            registrationId: newRegistration.id,
            role: p.role,
            fullName: p.fullName,
            email: p.email,
            normalizedEmail: p.normalizedEmail,
            phone: p.phone,
            normalizedPhone: p.normalizedPhone,
            college: p.college,
            githubUsername: p.githubUsername,
            normalizedGithubUsername: p.normalizedGithubUsername,
            sortOrder: p.sortOrder,
          },
        });
      }

      // Create Payment
      await tx.payment.create({
        data: {
          registrationId: newRegistration.id,
          expectedPaise: feePaise,
          transactionReference: data.transactionReference || null,
          status: "PENDING",
        },
      });

      // If proposal verified, attach ProposalFile record
      if (data.proposal && proposalBuffer && proposalValidation?.valid) {
        await tx.proposalFile.create({
          data: {
            registrationId: newRegistration.id,
            storageKey: data.proposal.storageKey,
            originalName: data.proposal.originalName || "proposal.pdf",
            mimeType: proposalValidation.mimeType!,
            sizeBytes: proposalBuffer.length,
            pageCount: proposalValidation.pageCount!,
          },
        });
      }

      const leader = normalizedParticipants[0];

      // Create Participant Acknowledgement outbox entry
      await tx.emailOutbox.create({
        data: {
          registrationId: newRegistration.id,
          recipient: leader.email,
          emailType: "PARTICIPANT_ACK",
          payload: {
            registrationNumber: newRegistration.registrationNumber,
            type: newRegistration.type,
            teamName: newRegistration.teamName,
            leaderName: leader.fullName,
            feeFormatted,
            transactionReference: data.transactionReference || null,
          },
          status: "PENDING",
        },
      });

      // Create Owner Notification outbox entry
      const ownerEmail = process.env.OWNER_EMAIL || "organizer@hyperlearningtech.in";
      const appUrl = process.env.APP_URL || "https://hackathon.hyperlearningtech.in";

      await tx.emailOutbox.create({
        data: {
          registrationId: newRegistration.id,
          recipient: ownerEmail,
          emailType: "OWNER_NOTICE",
          payload: {
            registrationNumber: newRegistration.registrationNumber,
            type: newRegistration.type,
            teamName: newRegistration.teamName,
            feeFormatted,
            submittedAt: newRegistration.submittedAt?.toISOString() || new Date().toISOString(),
            projectTitle: newRegistration.projectTitle,
            techStack: newRegistration.techStack,
            problemStatement: newRegistration.problemStatement,
            transactionReference: data.transactionReference || null,
            proposalFileName: data.proposal?.originalName || null,
            participants: normalizedParticipants.map((p) => ({
              fullName: p.fullName,
              email: p.email,
              phone: p.phone,
              college: p.college,
              githubUsername: p.githubUsername,
              role: p.role,
            })),
            adminUrl: `${appUrl}/admin/registrations`,
          },
          status: "PENDING",
        },
      });

      return newRegistration;
    }, { maxWait: 10000, timeout: 25000 });

    // 8. Schedule email outbox processing safely after transaction commits
    after(async () => {
      try {
        await processEmailOutbox(submissionResult.id);
      } catch (err) {
        console.error("Asynchronous email outbox trigger error:", err);
      }
    });

    // 9. Return success response with official registration number
    return NextResponse.json({
      success: true,
      registrationNumber: submissionResult.registrationNumber,
      status: submissionResult.status,
      feePaise: submissionResult.feePaise,
      feeFormatted,
    });
  } catch (err: any) {
    console.error("POST /api/registrations/submit error:", err instanceof Error ? err.message : "unknown");

    // Catch database-level unique constraint violations
    if (err.code === "P2002") {
      const targets = err.meta?.target;
      const targetStr = Array.isArray(targets) ? targets.join(", ") : String(targets);
      if (targetStr.includes("normalizedEmail")) {
        return NextResponse.json(
          { error: "One of the submitted email addresses is already registered for this hackathon." },
          { status: 409 }
        );
      }
      if (targetStr.includes("normalizedPhone")) {
        return NextResponse.json(
          { error: "One of the submitted phone numbers is already registered for this hackathon." },
          { status: 409 }
        );
      }
      if (targetStr.includes("normalizedGithubUsername")) {
        return NextResponse.json(
          { error: "One of the submitted GitHub usernames is already registered for this hackathon." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "A participant with these unique credentials has already registered." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred during submission. Please try again." },
      { status: 500 }
    );
  }
}
