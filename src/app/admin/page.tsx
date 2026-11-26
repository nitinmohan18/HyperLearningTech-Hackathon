import { ShieldCheck, Users, CreditCard, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [
    totalCount,
    submittedCount,
    confirmedCount,
    soloCount,
    squadCount,
    paymentsPending,
    paymentsVerified,
    proposalsCount,
    pendingEmails,
  ] = await Promise.all([
    prisma.registration.count({ where: { status: { not: "DRAFT" } } }),
    prisma.registration.count({ where: { status: "SUBMITTED" } }),
    prisma.registration.count({ where: { status: "CONFIRMED" } }),
    prisma.registration.count({ where: { type: "SOLO", status: { not: "DRAFT" } } }),
    prisma.registration.count({ where: { type: "SQUAD", status: { not: "DRAFT" } } }),
    prisma.payment.count({ where: { status: "PENDING" } }),
    prisma.payment.count({ where: { status: "VERIFIED" } }),
    prisma.proposalFile.count(),
    prisma.emailOutbox.count({ where: { status: "FAILED" } }),
  ]);

  const stats = [
    { label: "Total Registrations", value: totalCount.toString(), note: "Excluding abandoned drafts", icon: Users },
    { label: "Confirmed Spots", value: confirmedCount.toString(), note: "Payment verified & locked", icon: CheckCircle2 },
    { label: "Awaiting Verification", value: submittedCount.toString(), note: "Pending organizer approval", icon: AlertCircle },
    { label: "Legacy Solo Entries", value: soloCount.toString(), note: "Pre-update records", icon: Users },
    { label: "Squad Entries (₹200)", value: squadCount.toString(), note: "1-4 member teams", icon: Users },
    { label: "Pending Payments", value: paymentsPending.toString(), note: "Require manual UPI check", icon: CreditCard },
    { label: "Verified Payments", value: paymentsVerified.toString(), note: "Bank reference matched", icon: CreditCard },
    { label: "Proposals Uploaded", value: proposalsCount.toString(), note: "Stored in Backblaze B2", icon: FileText },
  ];

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#c89f6d]">
              Live Database Telemetry
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#f0eae1] mt-1">
            Hackathon Command Center
          </h1>
          <p className="mt-1 text-xs text-[#9e8e7c]">
            Live operational metrics for Winter Hackathon ’26 registrations, UPI payments, and proposal files.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/registrations"
            className="btn-primary text-xs h-9 px-4"
          >
            Manage Registrations
          </Link>
          <Link
            href="/admin/payments"
            className="btn-secondary text-xs h-9 px-4"
          >
            Verify Payments
          </Link>
        </div>
      </div>

      {pendingEmails > 0 && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-950/30 p-4 text-xs text-amber-200">
          <div className="flex items-center gap-2.5">
            <AlertCircle size={18} className="text-amber-400 shrink-0" />
            <span>
              {pendingEmails} email outbox {pendingEmails === 1 ? "notification has" : "notifications have"} failed delivery and can be retried in the Registrations view.
            </span>
          </div>
        </div>
      )}

      {/* Stats Metrics Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, note, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-sand-border/20 bg-[#140e0a]/60 p-5 shadow-card backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs text-[#8e7a68] uppercase tracking-wider">{label}</p>
              <Icon size={16} className="text-[#c89f6d]" />
            </div>
            <div className="mt-4">
              <p className="font-serif text-3xl font-normal text-[#f0eae1]">{value}</p>
              <p className="mt-1 font-mono text-[11px] text-[#9e8e7c]">{note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Information Card */}
      <div className="mt-8 rounded-xl border border-sand-border/20 bg-[#140e0a]/40 p-6 shadow-card">
        <div className="flex items-start gap-3">
          <ShieldCheck size={22} className="text-[#c89f6d] shrink-0 mt-0.5" />
          <div>
            <h2 className="font-serif text-lg font-normal text-[#f0eae1]">
              Live Production Operations
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-[#9e8e7c]">
              All data shown in this console reflects real-time records from Neon PostgreSQL. Registrations are automatically created with <span className="text-[#f0eae1] font-mono">SUBMITTED</span> status and <span className="text-[#f0eae1] font-mono">PENDING</span> payment. After matching the participant’s transaction reference with official bank statements, mark the payment as verified and confirm the participant spot to trigger Email C.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
