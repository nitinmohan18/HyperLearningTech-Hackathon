import Link from "next/link";
import { User, Users, Check, ArrowRight, ShieldAlert, FileText, Lock, Clock } from "lucide-react";
import { event } from "@/data/event";

export default function RegistrationPricing() {
  const steps = [
    {
      num: "1",
      title: "Select Format",
      desc: "Choose between Solo (₹99) or Squad (₹200 flat).",
    },
    {
      num: "2",
      title: "Participant Details",
      desc: "Provide your name, contact, college/org, and handle.",
    },
    {
      num: "3",
      title: "Squad Roster",
      desc: "If squad, nominate team leader & list 2–4 members.",
    },
    {
      num: "4",
      title: "Project Proposal",
      desc: "Submit pitch deck (problem, solution, tech stack, AI use).",
    },
    {
      num: "5",
      title: "Payment",
      desc: "Pay registration fee securely & retain reference.",
    },
    {
      num: "6",
      title: "GitHub Setup",
      desc: "Provide GitHub handles & create private repository.",
    },
  ];

  return (
    <section id="registration" className="section-pad border-b border-sand-border/20 bg-cream">
      <div className="container-site">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Participation & Pricing</p>
          <h2 className="section-title">
            Simple, Transparent <br />
            <span className="font-serif italic text-[#c89f6d]">Entry Formats</span>
          </h2>
          <p className="section-copy mx-auto">
            Choose your participation track. Whether you build alone or collaborate with a squad, registration includes full competition access, inspection review, and certificate eligibility.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* SOLO CARD */}
          <div className="relative flex flex-col justify-between rounded-2xl border border-sand-border/20 bg-[#120d09]/45 p-8 backdrop-blur-xl transition-all duration-300 hover:border-sand-border/40 hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
                  <User size={20} />
                </div>
                <span className="rounded-full border border-sand-border/30 bg-[#16100c] px-3 py-1 font-mono text-xs font-medium text-[#8e7a68]">
                  Individual Builder
                </span>
              </div>

              <h3 className="mt-6 font-serif text-3xl font-normal text-[#f0eae1]">
                Solo Entry
              </h3>
              <p className="mt-2 text-xs text-[#9e8e7c]">
                For independent developers building and shipping an original project end-to-end.
              </p>

              <div className="mt-6 border-y border-sand-border/15 py-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-semibold text-[#f0eae1]">
                    ₹99
                  </span>
                  <span className="font-mono text-xs text-[#8e7a68]">
                    per participant
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-[#c89f6d]">
                  Effective cost: ₹99 flat
                </p>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-[#9e8e7c]">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#c89f6d] shrink-0" />
                  <span>One solo participant entry</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#c89f6d] shrink-0" />
                  <span>One project submission</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#c89f6d] shrink-0" />
                  <span>Normalized 100-point rubric evaluation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#c89f6d] shrink-0" />
                  <span>Eligible for Overall Top 5 & Special Category cash awards</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#c89f6d] shrink-0" />
                  <span>Individual verifiable participation certificate</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#c89f6d] shrink-0" />
                  <span>Eligible for Top 25 Ranking Certificate</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <Link href="/register" className="btn-secondary w-full justify-center">
                Register as Solo →
              </Link>
            </div>
          </div>

          {/* SQUAD CARD */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-[#c89f6d]/50 bg-[#16100c]/65 p-8 shadow-xl shadow-[#c89f6d]/5 backdrop-blur-xl transition-all duration-300 hover:border-[#c89f6d] hover:-translate-y-1">
            <span className="absolute -top-3.5 left-8 inline-flex items-center gap-1 rounded-full border border-[#c89f6d]/50 bg-[#0d0a08] px-3 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#c89f6d]">
              ★ Popular Format
            </span>

            <div>
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#c89f6d]/40 bg-[#1c140d]/80 text-[#c89f6d]">
                  <Users size={20} />
                </div>
                <span className="rounded-full border border-[#c89f6d]/30 bg-[#c89f6d]/10 px-3 py-1 font-mono text-xs font-semibold text-[#c89f6d]">
                  2–4 Collaborators
                </span>
              </div>

              <h3 className="mt-6 font-serif text-3xl font-normal text-[#f0eae1]">
                Squad Entry
              </h3>
              <p className="mt-2 text-xs text-[#9e8e7c]">
                For teams of 2 to 4 members. One flat fee covers the whole squad with a nominated team leader.
              </p>

              <div className="mt-6 border-y border-sand-border/20 py-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-semibold text-[#f0eae1]">
                    ₹200
                  </span>
                  <span className="font-mono text-xs text-[#8e7a68]">
                    flat fee per squad (not per person)
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 font-mono text-[11px] text-[#c89f6d]">
                  <span className="rounded bg-[#120d09] px-2 py-0.5 border border-sand-border/15">2 members: ₹100/ea</span>
                  <span className="rounded bg-[#120d09] px-2 py-0.5 border border-sand-border/15">3 members: ~₹66.67/ea</span>
                  <span className="rounded bg-[#120d09] px-2 py-0.5 border border-sand-border/15">4 members: ₹50/ea</span>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-[#9e8e7c]">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#c89f6d] shrink-0" />
                  <span>2–4 participants with one nominated team leader</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#c89f6d] shrink-0" />
                  <span>One shared project repository and submission</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#c89f6d] shrink-0" />
                  <span>Evaluated on collaborative contribution & execution</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#c89f6d] shrink-0" />
                  <span>Eligible for Overall Top 5 & Special Category cash awards</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#c89f6d] shrink-0" />
                  <span>Individual participation certificates for every squad member</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#c89f6d] shrink-0" />
                  <span>Individual Top 25 Ranking Certificates for all squad members</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <Link href="/register" className="btn-primary w-full justify-center">
                Register as Squad →
              </Link>
            </div>
          </div>
        </div>

        {/* Squad Membership Lock Notice */}
        <div className="mt-8 max-w-4xl mx-auto rounded-2xl border border-sand-border/25 bg-[#120d09]/40 p-5 backdrop-blur-md">
          <div className="flex items-start gap-3.5">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#c89f6d]/30 bg-[#c89f6d]/10 text-[#c89f6d]">
              <Lock size={16} />
            </div>
            <div className="text-xs leading-relaxed text-[#9e8e7c]">
              <strong className="text-[#f0eae1] font-semibold">Important Roster Rule: </strong>
              Squad membership and roster details are permanently locked at the official competition start (10:00 PM IST on 26 December). Any member changes after kickoff require organiser approval with documented justification.
            </div>
          </div>
        </div>

        {/* 6-Step Registration Workflow */}
        <div className="mt-14 max-w-4xl mx-auto">
          <h3 className="text-center font-serif text-2xl font-normal text-[#f0eae1]">
            Registration Workflow (6 Simple Steps)
          </h3>
          <p className="text-center text-xs text-[#9e8e7c] mt-1">
            Everything you complete before the 25 December deadline
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((st) => (
              <div
                key={st.num}
                className="flex items-start gap-3 rounded-xl border border-sand-border/15 bg-[#120d09]/30 p-4"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#c89f6d]/15 font-mono text-xs font-semibold text-[#c89f6d]">
                  {st.num}
                </span>
                <div>
                  <h4 className="font-serif text-base font-normal text-[#f0eae1]">
                    {st.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-[#9e8e7c]">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organiser Confirmation Status Note */}
        <div className="mt-10 max-w-4xl mx-auto rounded-xl border border-sand-border/15 bg-[#16100c]/40 p-4 text-center">
          <p className="font-mono text-[11px] text-[#8e7a68]">
            <span className="text-[#c89f6d]">ℹ Note: </span>
            Registration closes 25 December 2026. The exact closing time, refund policy, and capacity limits are awaiting final organiser confirmation before payment processing.
          </p>
        </div>
      </div>
    </section>
  );
}
