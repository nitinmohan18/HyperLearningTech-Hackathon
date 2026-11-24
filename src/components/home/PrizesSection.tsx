"use client";

import Link from "next/link";
import {
  Trophy,
  Medal,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { specialPrizes } from "@/data/prizes";
import { TestimonialsCard, type PrizeStackItem } from "@/components/core/testimonials-card";

export default function PrizesSection() {
  const prizeStackItems: PrizeStackItem[] = [
    {
      id: "1st",
      place: "1st",
      amount: "₹2,999",
      title: "Overall Champion",
      description: "Awarded to the most outstanding engineering solution with superior architecture, provable commit progression, and high product utility.",
      image: "/prizes/1st.jpg",
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
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Awards & Recognition</p>
            <h2 className="section-title">
              Prizes & <span className="font-serif italic text-[#e0b885]">Recognition</span>
            </h2>
            <p className="section-copy">
              A total cash prize pool of <strong className="text-white font-medium">₹8,789</strong> across 11 winner positions, evaluated transparently via GitHub repositories.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="text-left md:text-right">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#b8ada0]">
                Total Cash Pool
              </p>
              <p className="font-serif text-3xl sm:text-4xl font-normal text-[#e0b885]">
                ₹8,789
              </p>
            </div>
          </div>
        </div>

        {/* 1. Overall Top 5 Standings: Interactive 3D Card Stack with Real Trophies */}
        <div className="mt-12 sm:mt-16">
          <div className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-[#ffd89b]" />
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                Overall Top 5 Standings
              </h3>
            </div>
            <span className="font-mono text-xs text-[#ffd89b] font-medium">₹6,795 Pool</span>
          </div>

          {/* TestimonialsCard 3D Interactive Stack Template */}
          <TestimonialsCard
            items={prizeStackItems}
            showNavigation={true}
            showCounter={true}
          />
        </div>

        {/* 2. Special Category Awards */}
        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#e0b885]" />
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                Special Category Awards
              </h3>
            </div>
            <span className="font-mono text-xs text-[#b8ada0]">₹1,994 Total</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {specialPrizes.map((category) => (
              <div
                key={category.category}
                className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#140e0a]/80 p-6 sm:p-7 backdrop-blur-md transition-all hover:border-[#e0b885]/30 hover:bg-[#18110c]"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#e0b885]">
                        Special Track
                      </span>
                      <h4 className="mt-1 font-serif text-xl sm:text-2xl font-normal text-white">
                        {category.category}
                      </h4>
                    </div>
                    <span className="font-serif text-xl sm:text-2xl font-normal text-[#e0b885]">
                      {category.total}
                    </span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-[#d6cec2] leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-4">
                  <div className="grid grid-cols-3 gap-3">
                    {category.prizes.map((p) => (
                      <div
                        key={p.place}
                        className="rounded-lg border border-white/[0.06] bg-black/30 p-2.5 text-center"
                      >
                        <p className="font-mono text-[10px] text-[#b8ada0]">
                          {p.place}
                        </p>
                        <p className="mt-0.5 font-mono text-sm sm:text-base font-semibold text-white">
                          {p.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prize Assurance Note */}
        <div className="mt-12 rounded-xl border border-white/[0.08] bg-black/20 p-5 text-center sm:p-6 backdrop-blur-sm">
          <p className="font-mono text-xs text-[#b8ada0]">
            <span className="text-[#e0b885] font-semibold">Immediate Settlement:</span> All cash awards are paid directly via UPI to verified winners within 48 hours of final repository verification.
          </p>
        </div>
      </div>
    </section>
  );
}
