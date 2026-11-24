"use client";

import Link from "next/link";
import {
  Trophy,
  Medal,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { specialPrizes } from "@/data/prizes";
import { TestimonialsCard, type PrizeStackItem } from "@/components/core/testimonials-card";
import { TapReveal } from "@/components/core/tap-reveal";

export default function PrizesSection() {
  const prizeStackItems: PrizeStackItem[] = [
    {
      id: "1st",
      place: "1st",
      amount: "₹2,999",
      title: "Overall Champion",
      description: "Awarded to the most outstanding engineering solution with superior architecture, provable commit progression, and high product utility.",
      image: "/highlights/prize.jpg",
      perks: [
        "Direct ₹2,999 instant UPI cash transfer",
        "Winner Certificate with tamper-proof verification hash",
        "Featured spotlight on HyperLearningTech network",
      ],
      gradient: "linear-gradient(145deg, rgba(65, 42, 22, 0.9) 0%, rgba(28, 18, 10, 0.96) 100%)",
      badgeColor: "#ffd89b",
      accentColor: "#ffd89b",
    },
    {
      id: "2nd",
      place: "2nd",
      amount: "₹1,999",
      title: "Runner Up",
      description: "Awarded to the second-highest scoring project demonstrating excellent execution, clean code discipline, and seamless UX.",
      image: "/prizes/2nd.jpg",
      perks: [
        "Direct ₹1,999 instant UPI cash transfer",
        "Runner-Up Certificate with digital credential ID",
        "Community showcase inclusion",
      ],
      gradient: "linear-gradient(145deg, rgba(46, 36, 28, 0.9) 0%, rgba(22, 16, 12, 0.96) 100%)",
      badgeColor: "#e0b885",
      accentColor: "#e0b885",
    },
    {
      id: "3rd",
      place: "3rd",
      amount: "₹999",
      title: "2nd Runner Up",
      description: "Recognizing outstanding technical depth and functional delivery built entirely within the 24-hour sprint window.",
      image: "/prizes/3rd.jpg",
      perks: [
        "Direct ₹999 instant UPI cash transfer",
        "Podium Finalist digital certificate",
        "GitHub repository showcase",
      ],
      gradient: "linear-gradient(145deg, rgba(42, 28, 18, 0.9) 0%, rgba(18, 12, 8, 0.96) 100%)",
      badgeColor: "#d4af7a",
      accentColor: "#d4af7a",
    },
    {
      id: "4th",
      place: "4th",
      amount: "₹499",
      title: "4th Place Finalist",
      description: "Awarded for exceptional implementation and strong submission quality among all top general contenders.",
      image: "/prizes/4th.jpg",
      perks: [
        "Direct ₹499 instant UPI cash transfer",
        "Honorary Finalist credentials",
        "Official leaderboard listing",
      ],
      gradient: "linear-gradient(145deg, rgba(32, 23, 16, 0.9) 0%, rgba(16, 11, 8, 0.96) 100%)",
      badgeColor: "#b5a794",
      accentColor: "#b5a794",
    },
    {
      id: "5th",
      place: "5th",
      amount: "₹299",
      title: "5th Place Finalist",
      description: "Awarded for completing a functional, inspectable project achieving Top 5 overall ranking across jury rubrics.",
      image: "/prizes/5th.jpg",
      perks: [
        "Direct ₹299 instant UPI cash transfer",
        "Top 5 Merit Certificate",
        "Official leaderboard listing",
      ],
      gradient: "linear-gradient(145deg, rgba(28, 20, 14, 0.9) 0%, rgba(14, 10, 7, 0.96) 100%)",
      badgeColor: "#a89d90",
      accentColor: "#a89d90",
    },
  ];

  return (
    <section id="prizes" className="section-pad border-b border-white/[0.08] bg-cream">
      <div className="container-site">
        {/* Section Header: Clean, Balanced Editorial Typography with Crisp Border */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
              Prizes & <span className="font-serif italic text-[#ffd89b]">Recognition</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#c7baa8]">
              A total cash prize pool of <strong className="text-white font-medium">₹8,789</strong> across 11 winner positions, evaluated transparently via GitHub repositories.
            </p>
          </div>

          {/* Right Cash Prize: Vertically Balanced Typography */}
          <div className="flex flex-col md:items-end shrink-0 text-left md:text-right">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#a89d90]">
              TOTAL CASH POOL
            </span>
            <span className="font-serif text-4xl sm:text-5xl font-semibold text-[#ffd89b] tracking-tight leading-none mt-1.5">
              ₹8,789
            </span>
            <span className="font-mono text-[11px] text-[#e0b885]/70 tracking-wide mt-1.5 hidden sm:inline-block">
              11 Winner Disbursements
            </span>
          </div>
        </div>

        {/* 1. Overall Top 5 Standings */}
        <div className="mt-10 sm:mt-12">
          <div className="mb-6 flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-[#ffd89b]" />
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                Overall Top 5 Standings
              </h3>
            </div>
            <span className="font-mono text-xs text-[#ffd89b] tracking-wide">₹6,795 allocated</span>
          </div>

          {/* TestimonialsCard 3D Interactive Stack Template */}
          <TestimonialsCard
            items={prizeStackItems}
            showNavigation={true}
            showCounter={true}
          />
        </div>

        {/* 2. Category Excellence Awards */}
        <div className="mt-14 sm:mt-16">
          {/* Category Excellence Header - Responsive wrap */}
          <div className="mb-5 sm:mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-[#ffd89b] shrink-0" />
              <h3 className="font-serif text-lg sm:text-2xl font-normal text-white">
                Category Excellence Awards
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#a89d90] pl-6 sm:pl-0">
              <span className="text-[#ffd89b] font-medium">6 Podium Positions</span>
              <span className="text-white/20">·</span>
              <span>₹1,994 Pool</span>
            </div>
          </div>

          <div className="grid gap-2.5 sm:gap-6 md:grid-cols-2">
            {specialPrizes.map((category, idx) => (
              <TapReveal
                key={category.category}
                label={`Reveal Award #${idx + 1}`}
                hideLabel="Close Card"
                duration={500}
                cellSize={6}
                shimmer={false}
                className="rounded-lg sm:rounded-2xl border border-white/[0.1] bg-[#140e0a]/90 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-[#ffd89b]/40 min-h-[72px] sm:min-h-[200px]"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-start justify-between gap-2.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#e0b885] font-semibold">
                            {idx === 0 ? "Design Track" : "Innovation Track"}
                          </span>
                          <span className="text-white/20 font-mono text-xs">/</span>
                          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#a89d90]">
                            Top 3
                          </span>
                        </div>
                        <h4 className="mt-0.5 sm:mt-1 font-serif text-base sm:text-2xl font-normal text-white">
                          {category.category}
                        </h4>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-serif text-lg sm:text-3xl font-semibold text-[#ffd89b] tracking-tight">
                          {category.total}
                        </span>
                        <p className="font-mono text-[8.5px] sm:text-[10px] uppercase tracking-wider text-[#a89d90] mt-0.5">
                          Total Prize
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 sm:mt-3.5 text-[11px] sm:text-sm text-[#ded4c5] leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-3 sm:mt-6 border-t border-white/[0.08] pt-2.5 sm:pt-4">
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                      {category.prizes.map((p) => (
                        <div
                          key={p.place}
                          className="rounded-md sm:rounded-lg border border-white/[0.08] bg-black/40 p-1.5 sm:p-2.5 text-center shadow-inner transition-colors hover:border-[#ffd89b]/30"
                        >
                          <p className="font-mono text-[8.5px] sm:text-[10px] uppercase tracking-wider text-[#b8ada0]">
                            {p.place}
                          </p>
                          <p className="mt-0.5 font-mono text-xs sm:text-base font-bold text-[#ffd89b]">
                            {p.amount}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TapReveal>
            ))}
          </div>
        </div>

        {/* Prize Assurance Note: Clean Editorial Line without Pill/Box */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex items-center justify-center gap-2 text-center text-xs font-mono text-[#a89d90]">
          <ShieldCheck size={14} className="text-[#ffd89b] shrink-0" />
          <p>
            <span className="text-[#ffd89b] font-medium">Guaranteed Settlement:</span> Direct UPI disbursement within 48 hours of final verified repository freeze.
          </p>
        </div>
      </div>
    </section>
  );
}
