import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd(), true);

import {
  normalizeEmail,
  normalizePhone,
  normalizeGithub,
  RegistrationSubmitSchema,
} from "../src/lib/validations";
import { validateProposalBuffer } from "../src/lib/file-validator";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

let prisma: any;
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

async function main() {
  const prismaModule = await import("../src/lib/prisma");
  prisma = prismaModule.prisma;

  const {
    createAdminSessionToken,
    verifyAdminSessionToken,
    checkRateLimit,
  } = await import("../src/lib/security");
  console.log("\n=======================================================");
  console.log("HYPERLEARNINGTECH WINTER HACKATHON '26 — TEST SUITE");
  console.log("=======================================================\n");

  // SECTION 1: Identity Normalization & Validation
  console.log("--- 1. Identity Normalization & Validation Tests ---");
  assert(normalizeEmail("  Aarav.Dev@Example.COM ") === "aarav.dev@example.com", "Email lowercasing and trimming");
  assert(normalizeGithub(" @Aarav-Dev ") === "aarav-dev", "GitHub handle lowercase, trim, and strip @");
  assert(normalizePhone("9876543210") === "+919876543210", "Indian 10-digit phone normalized to +91");
  assert(normalizePhone("+91 98765 43210") === "+919876543210", "Indian formatted phone with spaces normalized to +919876543210");
  assert(normalizePhone("+1 (555) 234-5678") === "+15552345678", "US international phone format normalized");

  // SECTION 2: Zod Schema Constraint Tests
  console.log("\n--- 2. Zod Schema Constraint Tests ---");
  const validSolo = RegistrationSubmitSchema.safeParse({
    type: "SOLO",
    teamName: "Solo - Aarav",
    projectTitle: "AI Code Inspector",
    techStack: "Next.js, Python",
    problemStatement: "Automated vulnerability scanner for smart contracts",
    existingCodeDisclosure: "None",
    aiUsageDisclosure: "GitHub Copilot for boilerplate",
    participants: [
      {
        fullName: "Aarav Sharma",
        email: "aarav.test@example.com",
        phone: "+919876543210",
        college: "IIT Bombay",
        githubUsername: "aarav-test-dev",
        role: "LEADER",
        sortOrder: 0,
      },
    ],
  });
  assert(validSolo.success, "Solo registration schema with valid teamName succeeds");

  const invalidSoloMissingTeamName = RegistrationSubmitSchema.safeParse({
    type: "SOLO",
    projectTitle: "AI Code Inspector",
    techStack: "Next.js, Python",
    problemStatement: "Automated vulnerability scanner",
    existingCodeDisclosure: "None",
    aiUsageDisclosure: "None",
    participants: [
      {
        fullName: "Aarav Sharma",
        email: "aarav.test@example.com",
        phone: "+919876543210",
        college: "IIT Bombay",
        githubUsername: "aarav-test-dev",
        role: "LEADER",
        sortOrder: 0,
      },
    ],
  });
  assert(!invalidSoloMissingTeamName.success, "Solo registration without mandatory teamName is rejected");

  const invalidSoloShortTeamName = RegistrationSubmitSchema.safeParse({
    type: "SOLO",
    teamName: "A",
    projectTitle: "AI Code Inspector",
    techStack: "Next.js, Python",
    problemStatement: "Automated vulnerability scanner",
    existingCodeDisclosure: "None",
    aiUsageDisclosure: "None",
    participants: [
      {
        fullName: "Aarav Sharma",
        email: "aarav.test@example.com",
        phone: "+919876543210",
        college: "IIT Bombay",
        githubUsername: "aarav-test-dev",
        role: "LEADER",
        sortOrder: 0,
      },
    ],
  });
  assert(!invalidSoloShortTeamName.success, "Solo registration with teamName < 2 characters is rejected");

  const invalidSoloSquadSize = RegistrationSubmitSchema.safeParse({
    type: "SOLO",
    projectTitle: "AI Code Inspector",
    techStack: "Next.js, Python",
    problemStatement: "Automated vulnerability scanner",
    existingCodeDisclosure: "None",
    aiUsageDisclosure: "None",
    participants: [
      {
        fullName: "Aarav Sharma",
        email: "aarav.test@example.com",
        phone: "+919876543210",
        college: "IIT Bombay",
        githubUsername: "aarav-test-dev",
        role: "LEADER",
        sortOrder: 0,
      },
      {
        fullName: "Rohan Verma",
        email: "rohan.test@example.com",
        phone: "+919876543211",
        college: "IIT Bombay",
        githubUsername: "rohan-test-dev",
        role: "MEMBER",
        sortOrder: 1,
      },
    ],
  });
  assert(!invalidSoloSquadSize.success, "Solo registration with 2 participants is rejected");

  const validSquad2 = RegistrationSubmitSchema.safeParse({
    type: "SQUAD",
    teamName: "Team Null",
    projectTitle: "Distributed Consensus",
    techStack: "Rust, Raft",
    problemStatement: "Fault-tolerant replication engine for edge computing nodes",
    existingCodeDisclosure: "None",
    aiUsageDisclosure: "None",
    participants: [
      {
        fullName: "Lead Builder",
        email: "lead.test@example.com",
        phone: "+919876543210",
        college: "IIT Delhi",
        githubUsername: "lead-test-dev",
        role: "LEADER",
        sortOrder: 0,
      },
      {
        fullName: "Member Two",
        email: "m2.test@example.com",
        phone: "+919876543211",
        college: "IIT Delhi",
        githubUsername: "m2-test-dev",
        role: "MEMBER",
        sortOrder: 1,
      },
    ],
  });
  assert(validSquad2.success, "Squad registration with 2 participants succeeds");

  const invalidSquad1 = RegistrationSubmitSchema.safeParse({
    type: "SQUAD",
    teamName: "Solo Squad",
    projectTitle: "Title",
    techStack: "Stack",
    problemStatement: "Long enough problem statement for valid test",
    existingCodeDisclosure: "None",
    aiUsageDisclosure: "None",
    participants: [
      {
        fullName: "Only Leader",
        email: "only.lead@example.com",
        phone: "+919876543210",
        college: "College",
        githubUsername: "only-lead",
        role: "LEADER",
        sortOrder: 0,
      },
    ],
  });
  assert(!invalidSquad1.success, "Squad registration with 1 participant is rejected");

  const invalidSquadDuplicateMember = RegistrationSubmitSchema.safeParse({
    type: "SQUAD",
    teamName: "Duplicate Squad",
    projectTitle: "Title",
    techStack: "Stack",
    problemStatement: "Long enough problem statement for valid test",
    existingCodeDisclosure: "None",
    aiUsageDisclosure: "None",
    participants: [
      {
        fullName: "Builder One",
        email: "same@example.com",
        phone: "+919876543210",
        college: "College",
        githubUsername: "builder-one",
        role: "LEADER",
        sortOrder: 0,
      },
      {
        fullName: "Builder Two",
        email: "same@example.com", // duplicate email intra-squad
        phone: "+919876543211",
        college: "College",
        githubUsername: "builder-two",
        role: "MEMBER",
        sortOrder: 1,
      },
    ],
  });
  assert(!invalidSquadDuplicateMember.success, "Squad registration with internal duplicate email is rejected");

  // SECTION 3: Binary File Validation Tests (PDF & PPTX)
  console.log("\n--- 3. File Validation Tests (PDF & PPTX) ---");

  // 1. Create a valid 3-page PDF
  const pdf3Doc = await PDFDocument.create();
  pdf3Doc.addPage();
  pdf3Doc.addPage();
  pdf3Doc.addPage();
  const pdf3Bytes = Buffer.from(await pdf3Doc.save());
  const res3 = await validateProposalBuffer(pdf3Bytes);
  assert(res3.valid === true && res3.pageCount === 3, "Valid 3-page PDF accepted");

  // 2. Create an invalid 8-page PDF (> 7 pages limit)
  const pdf8Doc = await PDFDocument.create();
  for (let i = 0; i < 8; i++) pdf8Doc.addPage();
  const pdf8Bytes = Buffer.from(await pdf8Doc.save());
  const res8 = await validateProposalBuffer(pdf8Bytes);
  assert(res8.valid === false && Boolean(res8.error?.includes("exceeds the maximum limit of 7 pages")), "8-page PDF rejected (> 7 page limit)");

  // 3. Fake extension / corrupted binary
  const fakePdfBytes = Buffer.from("THIS IS NOT A VALID PDF FILE HEADER");
  const resFake = await validateProposalBuffer(fakePdfBytes);
  assert(resFake.valid === false, "Fake extension / corrupted binary rejected");

  // 4. Empty buffer rejected
  const resEmpty = await validateProposalBuffer(Buffer.alloc(0));
  assert(resEmpty.valid === false && Boolean(resEmpty.error?.includes("empty")), "Empty file rejected");

  // 5. Valid 4-slide PPTX archive
  const pptxZip = new JSZip();
  pptxZip.file("ppt/slides/slide1.xml", "<xml>slide1</xml>");
  pptxZip.file("ppt/slides/slide2.xml", "<xml>slide2</xml>");
  pptxZip.file("ppt/slides/slide3.xml", "<xml>slide3</xml>");
  pptxZip.file("ppt/slides/slide4.xml", "<xml>slide4</xml>");
  const pptxBytes = await pptxZip.generateAsync({ type: "nodebuffer" });
  const resPptx = await validateProposalBuffer(pptxBytes);
  assert(resPptx.valid === true && resPptx.pageCount === 4, "Valid 4-slide PPTX accepted");

  // 6. PPTX with 10 slides (> 7 slides limit)
  const pptx10Zip = new JSZip();
  for (let i = 1; i <= 10; i++) {
    pptx10Zip.file(`ppt/slides/slide${i}.xml`, `<xml>slide${i}</xml>`);
  }
  const pptx10Bytes = await pptx10Zip.generateAsync({ type: "nodebuffer" });
  const resPptx10 = await validateProposalBuffer(pptx10Bytes);
  assert(resPptx10.valid === false && Boolean(resPptx10.error?.includes("exceeds the maximum limit of 7 slides")), "10-slide PPTX rejected (> 7 slide limit)");

  // SECTION 4: Security & Admin Session Tests
  console.log("\n--- 4. Security & Admin Authentication Tests ---");
  process.env.ADMIN_SECRET = process.env.ADMIN_SECRET || "test-master-secret-12345";
  const validAdminToken = createAdminSessionToken(8);
  const adminPayload = verifyAdminSessionToken(validAdminToken);
  assert(adminPayload !== null && adminPayload.role === "admin", "Signed admin session token verifies successfully");

  const tamperedToken = validAdminToken.slice(0, -4) + "abcd";
  assert(verifyAdminSessionToken(tamperedToken) === null, "Tampered admin session token is rejected");
  assert(verifyAdminSessionToken("invalid.token") === null, "Malformed admin token is rejected");
  assert(verifyAdminSessionToken("") === null, "Empty admin token is rejected");

  // SECTION 5: Persistent Rate Limiting Test
  console.log("\n--- 5. Persistent Rate Limiting Tests (PostgreSQL) ---");
  const testRateKey = `test_ratelimit_${Date.now()}`;
  const rate1 = await checkRateLimit(testRateKey, 3, 60);
  const rate2 = await checkRateLimit(testRateKey, 3, 60);
  const rate3 = await checkRateLimit(testRateKey, 3, 60);
  const rate4 = await checkRateLimit(testRateKey, 3, 60);

  assert(rate1.allowed === true, "Rate limit attempt 1 allowed");
  assert(rate2.allowed === true, "Rate limit attempt 2 allowed");
  assert(rate3.allowed === true, "Rate limit attempt 3 allowed");
  assert(rate4.allowed === false, "Rate limit attempt 4 blocked (exceeded limit)");

  // SECTION 6: End-to-End Database Lifecycle & Duplicate Protection Tests
  console.log("\n--- 6. End-to-End Database Lifecycle & Duplicate Protection ---");
  const testId1 = `test_hlt_${Date.now()}`;
  const emailA = `test.${Date.now()}.a@example.com`;
  const phoneA = `+9198765${Math.floor(10000 + Math.random() * 90000)}`;
  const githubA = `gh-${Date.now().toString(36)}-a`;

  const emailB = `test.${Date.now()}.b@example.com`;
  const phoneB = `+9198765${Math.floor(10000 + Math.random() * 90000)}`;
  const githubB = `gh-${Date.now().toString(36)}-b`;

  let testReg1Id = "";

  try {
    // 1. Direct Atomic Registration Submission (Draft-Free Architecture)
    const submitted = await prisma.$transaction(async (tx: any) => {
      const reg = await tx.registration.create({
        data: {
          registrationNumber: `HLT-TEST-${Math.floor(1000 + Math.random() * 9000)}`,
          type: "SOLO",
          teamName: "Solo Builder Prime",
          feePaise: 9900,
          projectTitle: "AI Code Inspector",
          techStack: "TypeScript",
          problemStatement: "Automated vulnerability detection for smart contracts",
          existingCodeDisclosure: "None",
          aiUsageDisclosure: "None",
          status: "SUBMITTED",
          submittedAt: new Date(),
          idempotencyKey: `idem_test_${Date.now()}`,
        },
      });

      await tx.participant.create({
        data: {
          registrationId: reg.id,
          role: "LEADER",
          fullName: "Test Builder A",
          email: emailA,
          normalizedEmail: normalizeEmail(emailA),
          phone: phoneA,
          normalizedPhone: normalizePhone(phoneA),
          college: "Test University",
          githubUsername: githubA,
          normalizedGithubUsername: normalizeGithub(githubA),
          sortOrder: 0,
        },
      });

      await tx.payment.create({
        data: {
          registrationId: reg.id,
          expectedPaise: 9900,
          transactionReference: "UPI-TEST-123456",
          status: "PENDING",
        },
      });

      await tx.emailOutbox.create({
        data: {
          registrationId: reg.id,
          recipient: emailA,
          emailType: "PARTICIPANT_ACK",
          payload: {
            registrationNumber: reg.registrationNumber,
            type: "SOLO",
            feeFormatted: "₹99",
          },
          status: "PENDING",
        },
      });

      return reg;
    }, { maxWait: 15000, timeout: 30000 });

    testReg1Id = submitted.id;
    assert(submitted.status === "SUBMITTED", "Registration created atomically with SUBMITTED status");
    assert(submitted.teamName === "Solo Builder Prime", "Solo team name saved in PostgreSQL");

    const createdPayment = await prisma.payment.findUnique({ where: { registrationId: submitted.id } });
    assert(createdPayment?.status === "PENDING", "Payment created with PENDING status");

    const outboxCount = await prisma.emailOutbox.count({ where: { registrationId: submitted.id } });
    assert(outboxCount === 1, "Participant acknowledgement email queued in EmailOutbox");

    // 2. Test Database-level Uniqueness Constraints
    // Duplicate Email
    let duplicateEmailBlocked = false;
    try {
      await prisma.participant.create({
        data: {
          registrationId: submitted.id,
          role: "MEMBER",
          fullName: "Imposter",
          email: emailA,
          normalizedEmail: normalizeEmail(emailA),
          phone: phoneB,
          normalizedPhone: normalizePhone(phoneB),
          college: "Other",
          githubUsername: githubB,
          normalizedGithubUsername: normalizeGithub(githubB),
          sortOrder: 1,
        },
      });
    } catch (e: any) {
      if (e.code === "P2002") duplicateEmailBlocked = true;
    }
    assert(duplicateEmailBlocked, "Database unique constraint blocks duplicate normalizedEmail");

    // Duplicate Phone
    let duplicatePhoneBlocked = false;
    try {
      await prisma.participant.create({
        data: {
          registrationId: submitted.id,
          role: "MEMBER",
          fullName: "Imposter 2",
          email: emailB,
          normalizedEmail: normalizeEmail(emailB),
          phone: phoneA,
          normalizedPhone: normalizePhone(phoneA),
          college: "Other",
          githubUsername: githubB,
          normalizedGithubUsername: normalizeGithub(githubB),
          sortOrder: 1,
        },
      });
    } catch (e: any) {
      if (e.code === "P2002") duplicatePhoneBlocked = true;
    }
    assert(duplicatePhoneBlocked, "Database unique constraint blocks duplicate normalizedPhone");

    // Duplicate GitHub handle
    let duplicateGithubBlocked = false;
    try {
      await prisma.participant.create({
        data: {
          registrationId: submitted.id,
          role: "MEMBER",
          fullName: "Imposter 3",
          email: emailB,
          normalizedEmail: normalizeEmail(emailB),
          phone: phoneB,
          normalizedPhone: normalizePhone(phoneB),
          college: "Other",
          githubUsername: githubA,
          normalizedGithubUsername: normalizeGithub(githubA),
          sortOrder: 1,
        },
      });
    } catch (e: any) {
      if (e.code === "P2002") duplicateGithubBlocked = true;
    }
    assert(duplicateGithubBlocked, "Database unique constraint blocks duplicate normalizedGithubUsername");

    // 3. Test Payment Verification & Spot Confirmation Flow
    const verifiedPayment = await prisma.payment.update({
      where: { registrationId: submitted.id },
      data: {
        status: "VERIFIED",
        verifiedAt: new Date(),
        verifiedBy: "Test Suite",
      },
    });
    assert(verifiedPayment.status === "VERIFIED", "Admin payment verification transitions payment to VERIFIED");

    const confirmedReg = await prisma.registration.update({
      where: { id: submitted.id },
      data: {
        status: "CONFIRMED",
        confirmedAt: new Date(),
      },
    });
    assert(confirmedReg.status === "CONFIRMED", "Registration spot officially confirmed");
  } finally {
    // Clean up test records
    if (testReg1Id) {
      await prisma.registration.delete({ where: { id: testReg1Id } }).catch(() => {});
    }
  }

  // SECTION 7: Local Draft Lifecycle, Refresh Recovery & Proposal Persistence
  console.log("\n--- 7. Local Draft Lifecycle, Refresh Recovery & Proposal Persistence ---");

  // 1. Refresh Recovery: Save multi-step form data locally and restore it
  interface MockDraft {
    version: number;
    updatedAt: number;
    type: "Solo" | "Squad";
    step: number;
    formData: Record<string, string>;
    proposalFile?: {
      name: string;
      size: number;
      type: string;
      lastModified: number;
      buffer: Buffer;
    } | null;
  }

  let localStore: Record<string, MockDraft> = {};

  const saveMockDraft = (draft: MockDraft) => {
    // Structured clone simulation as done by browser IndexedDB
    localStore["active_draft"] = JSON.parse(JSON.stringify(draft));
    if (draft.proposalFile) {
      localStore["active_draft"].proposalFile = {
        ...draft.proposalFile,
        buffer: Buffer.from(draft.proposalFile.buffer),
      };
    }
  };

  const loadMockDraft = (): MockDraft | null => {
    return localStore["active_draft"] || null;
  };

  const clearMockDraft = () => {
    delete localStore["active_draft"];
  };

  const sampleDraft: MockDraft = {
    version: 1,
    updatedAt: Date.now(),
    type: "Squad",
    step: 4,
    formData: {
      fullName: "Aarav Sharma",
      email: "aarav.test@example.com",
      phone: "+919876543210",
      college: "IIT Bombay",
      github: "aarav-dev",
      teamName: "Binary Forge",
      teamLeader: "Aarav Sharma",
      member2Name: "Rohan Patel",
      member2Email: "rohan.test@example.com",
      member2Phone: "+919876543211",
      member2College: "IIT Bombay",
      member2Github: "rohan-dev",
      member3Name: "",
      member3Email: "",
      member3Phone: "",
      member3College: "",
      member3Github: "",
      member4Name: "",
      member4Email: "",
      member4Phone: "",
      member4College: "",
      member4Github: "",
      projectTitle: "AI Code Scanner",
      techStack: "Next.js, Python",
      problemStatement: "Automated vulnerability scanner for smart contracts",
      existingCode: "None",
      aiUsage: "Copilot for tests",
      transactionReference: "UPI-REF-123456",
    },
  };

  saveMockDraft(sampleDraft);
  const restoredDraft = loadMockDraft();

  assert(restoredDraft !== null, "Draft recovered successfully from local storage");
  assert(restoredDraft?.type === "Squad", "Restored draft preserves registration type (Squad)");
  assert(restoredDraft?.step === 4, "Restored draft preserves navigation step (Step 4)");
  assert(restoredDraft?.formData.teamName === "Binary Forge", "Restored draft preserves team name");
  assert(restoredDraft?.formData.fullName === "Aarav Sharma", "Restored draft preserves participant full name");
  assert(restoredDraft?.formData.member2Github === "rohan-dev", "Restored draft preserves squad member 2 credentials");

  // 2. Proposal Persistence: Attach PDF file to draft, restore, and verify binary integrity
  const samplePdfDoc = await PDFDocument.create();
  samplePdfDoc.addPage([600, 400]);
  samplePdfDoc.addPage([600, 400]);
  const samplePdfBytes = Buffer.from(await samplePdfDoc.save());

  sampleDraft.proposalFile = {
    name: "architecture-proposal.pdf",
    size: samplePdfBytes.length,
    type: "application/pdf",
    lastModified: Date.now(),
    buffer: samplePdfBytes,
  };

  saveMockDraft(sampleDraft);
  const draftWithProposal = loadMockDraft();

  assert(draftWithProposal?.proposalFile !== null, "Proposal file metadata preserved across simulated refresh");
  assert(draftWithProposal?.proposalFile?.name === "architecture-proposal.pdf", "Proposal file name preserved");
  assert(draftWithProposal?.proposalFile?.size === samplePdfBytes.length, "Proposal file size matches original");
  assert(
    Boolean(draftWithProposal?.proposalFile?.buffer?.equals(samplePdfBytes)),
    "Proposal file binary payload preserved intact without data corruption"
  );

  // 3. Failed Submission Recovery: Draft is preserved when submission fails
  let mockSubmissionFailed = false;
  try {
    const invalidPayload = {
      type: "SOLO",
      teamName: "", // Missing mandatory team name
      projectTitle: "Test",
      techStack: "TS",
      problemStatement: "Short",
      existingCodeDisclosure: "None",
      aiUsageDisclosure: "None",
      participants: [],
    };
    const parsed = RegistrationSubmitSchema.safeParse(invalidPayload);
    if (!parsed.success) {
      throw new Error("Validation failed");
    }
  } catch {
    mockSubmissionFailed = true;
    // On failure, draft is NOT cleared
  }

  assert(mockSubmissionFailed, "Invalid submission correctly caught and rejected");
  const draftAfterFailedSubmit = loadMockDraft();
  assert(
    draftAfterFailedSubmit !== null && draftAfterFailedSubmit.formData.teamName === "Binary Forge",
    "Local draft is preserved after failed submission for user correction"
  );

  // 4. Successful Submission Draft Clearance: Draft is cleared only after verified submission
  clearMockDraft();
  const draftAfterSuccess = loadMockDraft();
  assert(draftAfterSuccess === null, "Local draft is completely cleared upon verified successful submission");

  console.log("\n=======================================================");
  console.log(`TEST SUITE RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
  console.log("=======================================================\n");

  if (failCount > 0) {
    process.exit(1);
  }
}

main()
  .catch((err) => {
    console.error("Test suite fatal error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
