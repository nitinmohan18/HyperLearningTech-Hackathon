-- CreateEnum
CREATE TYPE "RegistrationType" AS ENUM ('SOLO', 'SQUAD');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'CONFIRMED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ParticipantRole" AS ENUM ('LEADER', 'MEMBER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "EmailType" AS ENUM ('PARTICIPANT_ACK', 'OWNER_NOTICE');

-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateTable
CREATE TABLE "Registration" (
    "id" UUID NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "type" "RegistrationType" NOT NULL,
    "teamName" TEXT,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'DRAFT',
    "feePaise" INTEGER NOT NULL,
    "projectTitle" TEXT NOT NULL,
    "techStack" TEXT NOT NULL,
    "problemStatement" TEXT NOT NULL,
    "existingCodeDisclosure" TEXT NOT NULL,
    "aiUsageDisclosure" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "submittedAt" TIMESTAMP(3),
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" UUID NOT NULL,
    "registrationId" UUID NOT NULL,
    "role" "ParticipantRole" NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "normalizedEmail" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "normalizedPhone" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "githubUsername" TEXT NOT NULL,
    "normalizedGithubUsername" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL,
    "registrationId" UUID NOT NULL,
    "expectedPaise" INTEGER NOT NULL,
    "transactionReference" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposalFile" (
    "id" UUID NOT NULL,
    "registrationId" UUID NOT NULL,
    "storageKey" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "pageCount" INTEGER NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProposalFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailLog" (
    "id" UUID NOT NULL,
    "registrationId" UUID NOT NULL,
    "recipient" TEXT NOT NULL,
    "emailType" "EmailType" NOT NULL,
    "providerId" TEXT,
    "status" "EmailStatus" NOT NULL DEFAULT 'PENDING',
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registration_registrationNumber_key" ON "Registration"("registrationNumber");

-- CreateIndex
CREATE INDEX "Registration_status_idx" ON "Registration"("status");

-- CreateIndex
CREATE INDEX "Registration_createdAt_idx" ON "Registration"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_normalizedEmail_key" ON "Participant"("normalizedEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_normalizedPhone_key" ON "Participant"("normalizedPhone");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_normalizedGithubUsername_key" ON "Participant"("normalizedGithubUsername");

-- CreateIndex
CREATE INDEX "Participant_registrationId_idx" ON "Participant"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_registrationId_sortOrder_key" ON "Participant"("registrationId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_registrationId_key" ON "Payment"("registrationId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ProposalFile_registrationId_key" ON "ProposalFile"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "ProposalFile_storageKey_key" ON "ProposalFile"("storageKey");

-- CreateIndex
CREATE INDEX "EmailLog_registrationId_idx" ON "EmailLog"("registrationId");

-- CreateIndex
CREATE INDEX "EmailLog_status_idx" ON "EmailLog"("status");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalFile" ADD CONSTRAINT "ProposalFile_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailLog" ADD CONSTRAINT "EmailLog_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
