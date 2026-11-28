"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, KeyRound, Lock } from "lucide-react";

interface ReferralFormState {
  teamName: string;
  leaderEmail: string;
  registrationRef: string;
  registrationDate: string;
  leaderConsent: boolean;
}

const INITIAL_FORM: ReferralFormState = {
  teamName: "",
  leaderEmail: "",
  registrationRef: "",
  registrationDate: "",
  leaderConsent: false,
};

const SESSION_KEY = "hlt_ca_session_id";

export default function SubmitReferralPage() {
  const [ambassadorId, setAmbassadorId] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [tokenError, setTokenError] = useState<string | null>(null);

  const [form, setForm] = useState<ReferralFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ReferralFormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [claimId, setClaimId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken && urlToken.trim().length >= 6) {
      const derivedId = "HLTCA0001";
      sessionStorage.setItem(SESSION_KEY, derivedId);
      setAmbassadorId(derivedId);
      params.delete("token");
      const cleanUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
      window.history.replaceState({}, "", cleanUrl);
      return;
    }
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) {
      setAmbassadorId(existing);
    }
  }, []);

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = tokenInput.trim();
    if (trimmed.length < 6) {
      setTokenError("Enter the token from your welcome email");
      return;
    }
    setTokenError(null);
    const derivedId = /^HLTCA\d{4,}$/i.test(trimmed) ? trimmed.toUpperCase() : "HLTCA0001";
    sessionStorage.setItem(SESSION_KEY, derivedId);
    setAmbassadorId(derivedId);
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof ReferralFormState, string>> = {};
    if (form.teamName.trim().length < 2) next.teamName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.leaderEmail.trim())) {
      next.leaderEmail = "Enter a valid email";
    }
    if (!form.registrationDate) next.registrationDate = "Select a date";
    if (!form.leaderConsent) next.leaderConsent = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
      setClaimId(`HLTCA-CLM-${rand}`);
      setSubmitting(false);
    }, 300);
  };

  const inputClass =
    "w-full min-h-[40px] rounded-lg border border-white/[0.12] bg-[#0f0a07] px-3 py-2 text-base sm:text-sm text-white placeholder:text-[#786c5f] focus:border-[#e0b885] focus:outline-none transition-colors [color-scheme:dark]";
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
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white">
            Referral Submission
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#8e8275]">
            Log paid Unstop teams for verification.
          </p>

          {!ambassadorId ? (
            <form onSubmit={handleUnlock} className="mt-5 pt-5 border-t border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2 text-[#ffd89b]">
                <Lock size={16} />
                <h2 className="font-serif text-lg text-white">Ambassador Access</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#b8ada0]">
                Open your private email link, or paste your invite token below.
              </p>
              <div>
                <label className={labelClass}>
                  Invite Token <span className="text-[#e0b885]">*</span>
                </label>
                <input
                  type="text"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="Paste your invite token"
                  className={inputClass}
                />
                {tokenError && <p className="mt-1 text-xs text-rose-400">{tokenError}</p>}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
                <button type="submit" className="btn-primary w-full sm:w-auto justify-center">
                  <KeyRound size={15} />
                  <span>Continue</span>
                </button>
                <Link
                  href="/campus-ambassador/apply"
                  className="text-xs text-[#a89d90] underline underline-offset-4 hover:text-white text-center py-1"
                >
                  Need an ID? Apply
                </Link>
              </div>
            </form>
          ) : claimId ? (
            <div className="mt-5 pt-5 border-t border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2.5 text-[#ffd89b]">
                <CheckCircle2 size={20} />
                <h2 className="font-serif text-xl text-white">
                  Referral Recorded
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#d6cec2]">
                Claim for team <strong className="text-white">{form.teamName}</strong> is queued for Unstop verification.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 rounded-lg border border-white/[0.1] bg-[#0f0a07] px-3.5 py-2.5">
                <div>
                  <p className="text-[10px] text-[#8e8275]">Claim ID</p>
                  <p className="font-mono text-sm font-semibold text-[#ffd89b]">
                    {claimId}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#8e8275]">Ambassador · Status</p>
                  <p className="font-mono text-xs text-white">
                    {ambassadorId} · Pending
                  </p>
                </div>
              </div>
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setForm(INITIAL_FORM);
                    setClaimId(null);
                    setErrors({});
                  }}
                  className="btn-primary"
                >
                  Submit Another
                </button>
                <Link
                  href="/campus-ambassador"
                  className="text-xs text-[#a89d90] hover:text-white underline underline-offset-4 px-2 py-2"
                >
                  Back to Overview
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-5 pt-5 border-t border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between gap-2 rounded-lg bg-[#0f0a07] px-3 py-2 text-xs text-[#b8ada0]">
                <span>
                  ID: <strong className="font-mono text-[#ffd89b]">{ambassadorId}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.removeItem(SESSION_KEY);
                    setAmbassadorId(null);
                    setTokenInput("");
                  }}
                  className="text-[#a89d90] hover:text-white underline underline-offset-4"
                >
                  Switch
                </button>
              </div>

              <div>
                <label className={labelClass}>
                  Team Name (as on Unstop) <span className="text-[#e0b885]">*</span>
                </label>
                <input
                  type="text"
                  value={form.teamName}
                  onChange={(e) => setForm({ ...form, teamName: e.target.value })}
                  placeholder="Exact team name"
                  className={inputClass}
                />
                {errors.teamName && (
                  <p className="mt-1 text-xs text-rose-400">{errors.teamName}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Team Leader Email <span className="text-[#e0b885]">*</span>
                </label>
                <input
                  type="email"
                  value={form.leaderEmail}
                  onChange={(e) => setForm({ ...form, leaderEmail: e.target.value })}
                  placeholder="leader@email.com"
                  className={inputClass}
                />
                {errors.leaderEmail && (
                  <p className="mt-1 text-xs text-rose-400">{errors.leaderEmail}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Unstop Reference (Optional)</label>
                  <input
                    type="text"
                    value={form.registrationRef}
                    onChange={(e) => setForm({ ...form, registrationRef: e.target.value })}
                    placeholder="UNSTOP-12345"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Registration Date <span className="text-[#e0b885]">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.registrationDate}
                    onChange={(e) => setForm({ ...form, registrationDate: e.target.value })}
                    className={inputClass}
                  />
                  {errors.registrationDate && (
                    <p className="mt-1 text-xs text-rose-400">{errors.registrationDate}</p>
                  )}
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs sm:text-sm text-[#cfc6ba]">
                  <input
                    type="checkbox"
                    checked={form.leaderConsent}
                    onChange={(e) => setForm({ ...form, leaderConsent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-[#0f0a07] accent-[#e0b885]"
                  />
                  <span>
                    Team paid on Unstop and leader consented to share email for verification.{" "}
                    <span className="text-[#e0b885]">*</span>
                  </span>
                </label>
                {errors.leaderConsent && (
                  <p className="mt-1 text-xs text-rose-400">{errors.leaderConsent}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center"
                >
                  {submitting ? "Submitting..." : "Submit Referral"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
