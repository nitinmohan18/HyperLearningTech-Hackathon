import Link from "next/link";
import { User, Users, Check, ArrowRight } from "lucide-react";
import { event } from "@/data/event";

export default function RegistrationPricing() {
  const steps = [
    { num: "01", title: "Select Track", desc: "Choose Solo (₹99) or Squad (₹200 flat)." },
    { num: "02", title: "Team Details", desc: "Nominate leader, squad roster & handles." },
    { num: "03", title: "Pitch Brief", desc: "Submit project problem, scope & tech stack." },
    { num: "04", title: "GitHub Sync", desc: "Create private repository & invite inspector." },
  ];

  return (
    <section id="registration" className="section-pad border-b border-white/[0.08] bg-cream">
      <div className="container-site">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Participation & Pricing</p>
          <h2 className="section-title">
            Simple, Transparent <br />
            <span className="font-serif italic text-[#e0b885]">Entry Formats</span>
          </h2>
          <p className="section-copy mx-auto">
            Build independently or with a squad. Full competition access, repository inspection, and verifiable certification included.
          </p>
        </div>

        {/* Pricing Cards - 2 Clean Premium Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {/* SOLO CARD */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#140e0a]/70 p-6 sm:p-8 flex flex-col justify-between transition-colors hover:border-white/[0.15]">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User size={20} className="text-[#e0b885]" />
                  <span className="font-serif text-2xl font-normal text-white">
                    Solo Entry
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#b8ada0]">
                  Individual Builder
                </span>
              </div>

              <div className="mt-6 border-y border-white/[0.08] py-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl sm:text-5xl font-normal text-white">
                    {event.soloFee}
                  </span>
                  <span className="font-mono text-xs text-[#b8ada0]">
                    flat per participant
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-[#d6cec2]">
                <li className="flex items-center gap-2.5">
                  <Check size={15} className="text-[#e0b885] shrink-0" />
                  <span>1 individual participant & project submission</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={15} className="text-[#e0b885] shrink-0" />
                  <span>Full evaluation under normalized 100-point rubric</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={15} className="text-[#e0b885] shrink-0" />
                  <span>Eligible for Overall Top 5 & Special Category cash awards</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={15} className="text-[#e0b885] shrink-0" />
                  <span>Personal verifiable digital completion certificate</span>
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
          <div className="relative rounded-2xl border border-[#e0b885]/40 bg-[#1e130c]/70 p-6 sm:p-8 flex flex-col justify-between transition-colors hover:border-[#e0b885]/60 shadow-[0_0_30px_rgba(224,184,133,0.06)]">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-[#e0b885]" />
                  <span className="font-serif text-2xl font-normal text-white">
                    Squad Entry
                  </span>
                </div>
                <span className="font-mono text-[11px] font-semibold text-[#e0b885]">
                  2–4 Members
                </span>
              </div>

              <div className="mt-6 border-y border-white/[0.08] py-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl sm:text-5xl font-normal text-white">
                    {event.squadFee}
                  </span>
                  <span className="font-mono text-xs text-[#b8ada0]">
                    flat per entire squad (as low as ₹50/person)
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-[#d6cec2]">
                <li className="flex items-center gap-2.5">
                  <Check size={15} className="text-[#e0b885] shrink-0" />
                  <span>Nominate team leader + 1 to 3 collaborators</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={15} className="text-[#e0b885] shrink-0" />
                  <span>One shared private GitHub repository & project submission</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={15} className="text-[#e0b885] shrink-0" />
                  <span>Individual member contribution scoring in evaluation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={15} className="text-[#e0b885] shrink-0" />
                  <span>Individual verifiable digital certificates for every member</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <Link href="/register" className="btn-primary w-full justify-center">
                Register Your Squad →
              </Link>
            </div>
          </div>
        </div>

        {/* Streamlined 4-Step Registration Process Flow (replacing cluttered cards) */}
        <div className="mt-16 border-t border-white/[0.08] pt-10">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0b885] text-center mb-8">
            Registration Checklist
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div key={st.num} className="border-l border-white/[0.1] pl-4">
                <span className="font-mono text-xs font-semibold text-[#e0b885]">
                  {st.num}
                </span>
                <h4 className="mt-1 font-serif text-base font-normal text-white">
                  {st.title}
                </h4>
                <p className="mt-1 text-xs text-[#d6cec2]">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
