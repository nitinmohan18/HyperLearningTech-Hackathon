"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ReferralFormSection } from "@/components/campus-ambassador/ReferralFormSection";
import { cn } from "@/lib/utils";

interface ApplyFormState {
  fullName: string;
  email: string;
  whatsapp: string;
  background: string;
  organization: string;
  consent: boolean;
}

const INITIAL_STATE: ApplyFormState = {
  fullName: "",
  email: "",
  whatsapp: "",
  background: "",
  organization: "",
  consent: false,
};

const BACKGROUND_OPTIONS = [
  "College / University Student",
  "Other",
];

function generateReferenceId(prefix: string) {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${random}`;
}

export default function CampusAmbassadorApplyPage() {
  const [activeTab, setActiveTab] = useState<"apply" | "referral">("apply");
  const [form, setForm] = useState<ApplyFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplyFormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const validate = (): boolean => {
    const next: Partial<Record<keyof ApplyFormState, string>> = {};
    if (form.fullName.trim().length < 2) next.fullName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email";
    }
    if (!/^[+\d\s-]{10,15}$/.test(form.whatsapp.trim())) {
      next.whatsapp = "Enter a valid 10-digit number";
    }
    if (!form.background) next.background = "Select an option";
    if (form.background === "College / University Student" && form.organization.trim().length < 2) {
      next.organization = "Required";
    }
    if (!form.consent) next.consent = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setReferenceId(generateReferenceId("HLTCA-APP"));
      setSubmitting(false);
    }, 300);
  };

  const inputClass =
    "w-full min-h-[40px] rounded-lg border border-white/[0.12] bg-[#0f0a07] px-3 py-2 text-base sm:text-sm text-white placeholder:text-[#786c5f] focus:border-[#e0b885] focus:outline-none transition-colors";
  const labelClass = "block text-xs font-medium text-[#d6cec2] mb-1";

  return (
    <div className="bg-[#0d0a08] min-h-screen">
      <div className="container-site py-8 sm:py-12 max-w-lg">
        <Link
          href="/campus-ambassador"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-[#a89d90] hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </Link>

        <div className="mt-4 rounded-xl border border-white/[0.1] bg-[#140e0a] p-5 sm:p-6">
          {/* Clean Segmented Tabs */}
          <div className="grid grid-cols-2 rounded-lg bg-[#0f0a07] p-1 border border-white/[0.08]">
            <button
              type="button"
              onClick={() => setActiveTab("apply")}
              className={cn(
                "rounded-md py-2 text-xs sm:text-sm font-medium transition-colors",
                activeTab === "apply"
                  ? "bg-[#241911] text-white"
                  : "text-[#8e8275] hover:text-[#d6cec2]"
              )}
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("referral")}
              className={cn(
                "rounded-md py-2 text-xs sm:text-sm font-medium transition-colors",
                activeTab === "referral"
                  ? "bg-[#241911] text-white"
                  : "text-[#8e8275] hover:text-[#d6cec2]"
              )}
            >
              Submit Referral
            </button>
          </div>

          <div className="mt-5">
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              {activeTab === "apply" ? "Ambassador Application" : "Referral Submission"}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#8e8275]">
              {activeTab === "apply"
                ? "Open to everyone · Free to apply"
                : "Log paid Unstop teams for verification"}
            </p>
          </div>

          <div className="mt-5 pt-5 border-t border-white/[0.08]">
            {activeTab === "referral" ? (
              <ReferralFormSection onSwitchToApply={() => setActiveTab("apply")} />
            ) : referenceId ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-[#ffd89b]">
                  <CheckCircle2 size={20} />
                  <h2 className="font-serif text-xl text-white">
                    Application Received
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#d6cec2]">
                  Thanks, <strong className="text-white">{form.fullName}</strong>. We will review your application and email your HLTCA ID and private referral link.
                </p>
                <div className="rounded-lg border border-white/[0.1] bg-[#0f0a07] px-3.5 py-2.5 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-[#8e8275]">Reference ID</p>
                    <p className="font-mono text-sm font-semibold text-[#ffd89b]">
                      {referenceId}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] text-[#b8ada0]">Pending</span>
                </div>
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <Link href="/campus-ambassador" className="btn-primary">
                    Back to Overview
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(INITIAL_STATE);
                      setReferenceId(null);
                      setErrors({});
                    }}
                    className="text-xs text-[#a89d90] hover:text-white underline underline-offset-4 px-2 py-2"
                  >
                    Submit another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-rose-400">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>WhatsApp</label>
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                    {errors.whatsapp && (
                      <p className="mt-1 text-xs text-rose-400">{errors.whatsapp}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Background</label>
                  <div className="mt-1 flex flex-wrap gap-5">
                    {BACKGROUND_OPTIONS.map((opt) => (
                      <label
                        key={opt}
                        className="flex min-h-[36px] items-center gap-2 cursor-pointer text-sm text-[#d6cec2] hover:text-white"
                      >
                        <input
                          type="radio"
                          name="background"
                          value={opt}
                          checked={form.background === opt}
                          onChange={(e) => setForm({ ...form, background: e.target.value })}
                          className="h-4 w-4 accent-[#e0b885]"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                  {errors.background && (
                    <p className="mt-1 text-xs text-rose-400">{errors.background}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>
                    {form.background === "Other"
                      ? "College / Organization (Optional)"
                      : "College / Organization"}
                  </label>
                  <input
                    type="text"
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    placeholder={
                      form.background === "Other"
                        ? "Organization or community (optional)"
                        : "College or university name"
                    }
                    className={inputClass}
                  />
                  {errors.organization && (
                    <p className="mt-1 text-xs text-rose-400">{errors.organization}</p>
                  )}
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs sm:text-sm text-[#b8ada0]">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded border-white/20 bg-[#0f0a07] accent-[#e0b885]"
                    />
                    <span>
                      I agree to the{" "}
                      <Link
                        href="/campus-ambassador/terms"
                        target="_blank"
                        className="text-white underline underline-offset-4 hover:text-[#ffd89b]"
                      >
                        Terms &amp; Privacy Notice
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1 text-xs text-rose-400">{errors.consent}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
