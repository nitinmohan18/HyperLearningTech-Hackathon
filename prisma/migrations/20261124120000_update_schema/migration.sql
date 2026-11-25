-- AlterEnum
ALTER TYPE "EmailStatus" ADD VALUE 'PROCESSING';

-- AlterEnum
ALTER TYPE "EmailType" ADD VALUE 'SPOT_CONFIRMED';

-- AlterEnum
BEGIN;
CREATE TYPE "RegistrationStatus_new" AS ENUM ('DRAFT', 'SUBMITTED', 'PAYMENT_REJECTED', 'CONFIRMED', 'CANCELLED');
ALTER TABLE "public"."Registration" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Registration" ALTER COLUMN "status" TYPE "RegistrationStatus_new" USING ("status"::text::"RegistrationStatus_new");
ALTER TYPE "RegistrationStatus" RENAME TO "RegistrationStatus_old";
ALTER TYPE "RegistrationStatus_new" RENAME TO "RegistrationStatus";
DROP TYPE "public"."RegistrationStatus_old";
ALTER TABLE "Registration" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- DropForeignKey
ALTER TABLE "EmailLog" DROP CONSTRAINT "EmailLog_registrationId_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "draftTokenHash" TEXT,
ADD COLUMN     "idempotencyKey" TEXT;

-- DropTable
DROP TABLE "EmailLog";

-- CreateTable
CREATE TABLE "EmailOutbox" (
    "id" UUID NOT NULL,
    "registrationId" UUID NOT NULL,
    "recipient" TEXT NOT NULL,
    "emailType" "EmailType" NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "EmailStatus" NOT NULL DEFAULT 'PENDING',
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "providerMessageId" TEXT,
    "nextRetryAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "EmailOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateLimit" (
    "key" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RateLimit_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE INDEX "EmailOutbox_registrationId_idx" ON "EmailOutbox"("registrationId");

-- CreateIndex
CREATE INDEX "EmailOutbox_status_nextRetryAt_idx" ON "EmailOutbox"("status", "nextRetryAt");

-- CreateIndex
CREATE INDEX "RateLimit_expireAt_idx" ON "RateLimit"("expireAt");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_draftTokenHash_key" ON "Registration"("draftTokenHash");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_idempotencyKey_key" ON "Registration"("idempotencyKey");

-- CreateIndex
CREATE INDEX "Registration_draftTokenHash_idx" ON "Registration"("draftTokenHash");

-- AddForeignKey
ALTER TABLE "EmailOutbox" ADD CONSTRAINT "EmailOutbox_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
