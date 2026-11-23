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
            <span className="font-serif italic text-[#e0b885]">Entry Formats</span>
          </h2>
          <p className="section-copy mx-auto">
            Choose your participation track. Whether you build alone or collaborate with a squad, registration includes full competition access, inspection review, and certificate eligibility.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* SOLO CARD */}
          <div className="glass rounded-2xl flex flex-col justify-between p-7 sm:p-8 border border-white/[0.08]">
            <div>
              <div className="flex items-center justify-between">
                <User size={24} className="text-[#e0b885]" />
                <span className="font-mono text-xs text-[#b8ada0]">
                  Individual Builder
                </span>
              </div>

              <h3 className="mt-5 font-serif text-3xl font-normal text-white">
                Solo Entry
              </h3>
              <p className="mt-1 text-xs text-[#d6cec2]">
                For independent developers building and shipping an original project end-to-end.
              </p>

              <div className="mt-5 border-y border-white/[0.08] py-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-semibold text-white">
                    ₹99
                  </span>
                  <span className="font-mono text-xs text-[#b8ada0]">
                    per participant
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-[#e0b885]">
                  Effective cost: ₹99 flat
                </p>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-[#d6cec2]">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#e0b885] shrink-0" />
                  <span>One solo participant entry</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#e0b885] shrink-0" />
                  <span>One project submission</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#e0b885] shrink-0" />
                  <span>Normalized 100-point rubric evaluation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#e0b885] shrink-0" />
                  <span>Eligible for Overall Top 5 & Special Category cash awards</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#e0b885] shrink-0" />
                  <span>Individual verifiable participation certificate</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#e0b885] shrink-0" />
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
          <div className="relative glass glass-accent rounded-2xl flex flex-col justify-between p-7 sm:p-8 border border-[#e0b885]/40">
            <div>
              <div className="flex items-center justify-between">
                <Users size={24} className="text-[#e0b885]" />
                <span className="font-mono text-xs font-semibold text-[#e0b885]">
                  2–4 Collaborators · Popular
                </span>
              </div>

              <h3 className="mt-5 font-serif text-3xl font-normal text-white">
                Squad Entry
              </h3>
              <p className="mt-1 text-xs text-[#d6cec2]">
                For teams of 2 to 4 members. One flat fee covers the whole squad with a nominated team leader.
              </p>

              <div className="mt-5 border-y border-white/[0.08] py-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-semibold text-white">
                    ₹200
                  </span>
                  <span className="font-mono text-xs text-[#b8ada0]">
                    flat fee per squad (not per person)
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-[#b8ada0]">
                  Effective cost: 2 members: ₹100/ea · 3 members: ~₹66.7/ea · 4 members: ₹50/ea
                </p>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-[#d6cec2]">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#e0b885] shrink-0" />
                  <span>2–4 participants with one nominated team leader</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#e0b885] shrink-0" />
                  <span>One shared project repository and submission</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#e0b885] shrink-0" />
                  <span>Evaluated on collaborative contribution & execution</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#e0b885] shrink-0" />
                  <span>Eligible for Overall Top 5 & Special Category cash awards</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#e0b885] shrink-0" />
                  <span>Individual participation certificates for every squad member</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#e0b885] shrink-0" />
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
        <div className="mt-8 max-w-4xl mx-auto border-l-2 border-[#e0b885] bg-white/[0.02] p-4 text-xs leading-relaxed text-[#d6cec2]">
          <strong className="text-white font-medium">Important Roster Rule: </strong>
          Squad membership and roster details are permanently locked at the official competition start (10:00 PM IST on 26 December). Any member changes after kickoff require organiser approval with documented justification.
        </div>

        {/* 6-Step Registration Workflow - Clean open list */}
        <div className="mt-16 max-w-4xl mx-auto border-t border-white/[0.08] pt-10">
          <h3 className="text-center font-serif text-2xl font-normal text-white">
            Registration Workflow (6 Simple Steps)
          </h3>
          <p className="text-center text-xs text-[#d6cec2] mt-1">
            Everything you complete before the 25 December deadline
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((st) => (
              <div
                key={st.num}
                className="flex items-start gap-3.5"
              >
                <span className="font-mono text-sm font-semibold text-[#e0b885]">
                  {st.num}.
                </span>
                <div>
                  <h4 className="font-serif text-base font-normal text-white">
                    {st.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#d6cec2] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organiser Confirmation Status Note */}
        <p className="mt-10 max-w-2xl mx-auto text-center font-mono text-xs text-[#b8ada0]">
          <span className="text-[#e0b885]">ℹ Note: </span>
          Registration closes 25 December 2026. The exact closing time, refund policy, and capacity limits are awaiting final organiser confirmation before payment processing.
        </p>
      </div>
    </section>
  );
}
