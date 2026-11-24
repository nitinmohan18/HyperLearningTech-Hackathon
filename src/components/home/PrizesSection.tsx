"use client";

import {
  Trophy,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { TestimonialsCard, type PrizeStackItem } from "@/components/core/testimonials-card";
import { TapReveal } from "@/components/core/tap-reveal";

const specialPrizes = [
  {
    category: "Best UI/UX",
    track: "Design Track",
    description:
      "Recognising an exceptionally clear, intuitive and accessible user experience, supported by thoughtful interface design and usability.",
    prizes: [{ place: "Winner", amount: "₹499" }],
  },
  {
    category: "Best Innovation & Uniqueness",
    track: "Innovation Track",
    description:
      "Recognising an original idea, distinctive approach and creative technical execution that sets the project apart.",
    prizes: [{ place: "Winner", amount: "₹499" }],
  },
  {
    category: "Best Social Impact & Practical Utility",
    track: "Impact Track",
    description:
      "Recognising a practical solution that addresses a meaningful real-world problem and demonstrates clear potential for positive impact.",
    prizes: [{ place: "Winner", amount: "₹499" }],
  },
];

export default function PrizesSection() {
  const prizeStackItems: PrizeStackItem[] = [
    {
      id: "1st",
      place: "1st",
      amount: "₹5,999",
      title: "Overall Champion",
      description:
        "Awarded to the most outstanding engineering solution with superior architecture, verified development progress and strong product utility.",
      image: "/highlights/prize.jpg",
      perks: [
        "Direct ₹5,999 UPI cash transfer",
        "Winner Certificate with digital verification",
        "Featured spotlight on the HyperLearningTech network",
      ],
      gradient:
        "linear-gradient(145deg, rgba(65, 42, 22, 0.9) 0%, rgba(28, 18, 10, 0.96) 100%)",
      badgeColor: "#ffd89b",
      accentColor: "#ffd89b",
    },
    {
      id: "2nd",
      place: "2nd",
      amount: "₹3,499",
      title: "Runner Up",
      description:
        "Awarded to the second-highest scoring project for excellent execution, technical discipline and product experience.",
      image: "/prizes/2nd.jpg",
      perks: [
        "Direct ₹3,499 UPI cash transfer",
        "Runner-Up Certificate with digital credential",
        "Community showcase inclusion",
      ],
      gradient:
        "linear-gradient(145deg, rgba(46, 36, 28, 0.9) 0%, rgba(22, 16, 12, 0.96) 100%)",
      badgeColor: "#e0b885",
      accentColor: "#e0b885",
    },
    {
      id: "3rd",
      place: "3rd",
      amount: "₹2,499",
      title: "Second Runner Up",
      description:
        "Recognising strong technical depth, a functional product and meaningful progress throughout the 24-hour challenge.",
      image: "/prizes/3rd.jpg",
      perks: [
        "Direct ₹2,499 UPI cash transfer",
        "Podium Finalist digital certificate",
        "GitHub repository showcase",
      ],
      gradient:
        "linear-gradient(145deg, rgba(42, 28, 18, 0.9) 0%, rgba(18, 12, 8, 0.96) 100%)",
      badgeColor: "#d4af7a",
      accentColor: "#d4af7a",
    },
    {
      id: "4th",
      place: "4th",
      amount: "₹999",
      title: "4th Place Finalist",
      description:
        "Awarded for exceptional implementation, strong functionality and high-quality project delivery.",
      image: "/prizes/4th.jpg",
      perks: [
        "Direct ₹999 UPI cash transfer",
        "Honorary Finalist certificate",
        "Official leaderboard listing",
      ],
      gradient:
        "linear-gradient(145deg, rgba(32, 23, 16, 0.9) 0%, rgba(16, 11, 8, 0.96) 100%)",
      badgeColor: "#b5a794",
      accentColor: "#b5a794",
    },
    {
      id: "5th",
      place: "5th",
      amount: "₹499",
      title: "5th Place Finalist",
      description:
        "Recognising a complete, inspectable project that earns a place among the five highest-ranked overall entries.",
      image: "/prizes/5th.jpg",
      perks: [
        "Direct ₹499 UPI cash transfer",
        "Top 5 Merit Certificate",
        "Official leaderboard listing",
      ],
      gradient:
        "linear-gradient(145deg, rgba(28, 20, 14, 0.9) 0%, rgba(14, 10, 7, 0.96) 100%)",
      badgeColor: "#a89d90",
      accentColor: "#a89d90",
    },
  ];

  return (
    <section
      id="prizes"
      className="section-pad border-b border-white/[0.08] bg-cream"
    >
      <div className="container-site">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-white sm:text-5xl">
              Prizes &{" "}
              <span className="font-serif italic text-[#ffd89b]">
                Recognition
              </span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#c7baa8] sm:text-base">
              Compete for a total prize budget of{" "}
              <strong className="font-medium text-white">₹15,000</strong>,
              including five overall awards, three category awards and
              additional surprise recognitions subject to the event&apos;s
              published eligibility conditions.
            </p>
          </div>

          {/* Total Prize Upto */}
          <div className="flex shrink-0 flex-col text-left md:items-end md:text-right">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#a89d90]">
              TOTAL PRIZE UPTO
            </span>
            <span className="mt-1.5 font-serif text-4xl font-semibold leading-none tracking-tight text-[#ffd89b] sm:text-5xl">
              ₹15,000
            </span>
            <span className="mt-1.5 hidden font-mono text-[11px] tracking-wide text-[#e0b885]/70 sm:inline-block">
              8 Guaranteed Cash Awards
            </span>
          </div>
        </div>

        {/* 1. Overall Top 5 Standings */}
        <div className="mt-10 sm:mt-12">
          <div className="mb-6 flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-[#ffd89b]" />
              <h3 className="font-serif text-xl font-normal text-white sm:text-2xl">
                Overall Top 5 Standings
              </h3>
            </div>
            <span className="font-mono text-xs tracking-wide text-[#ffd89b]">
              ₹13,500 allocated
            </span>
          </div>

          {/* TestimonialsCard 3D Interactive Stack */}
          <TestimonialsCard
            items={prizeStackItems}
            showNavigation={true}
            showCounter={true}
          />
        </div>

        {/* 2. Category Excellence Awards */}
        <div className="mt-14 sm:mt-16">
          <div className="mb-5 flex flex-col gap-2 border-b border-white/[0.06] pb-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="shrink-0 text-[#ffd89b]" />
              <h3 className="font-serif text-lg font-normal text-white sm:text-2xl">
                Category Excellence Awards
              </h3>
            </div>
            <div className="flex items-center gap-2 pl-6 font-mono text-[11px] text-[#a89d90] sm:pl-0 sm:text-xs">
              <span className="font-medium text-[#ffd89b]">
                3 Category Winners
              </span>
              <span className="text-white/20">·</span>
              <span className="mt-1.5 font-serif text-4xl font-semibold leading-none tracking-tight text-[#ffd89b] sm:text-5xl">
                ₹15,00
              </span>
            </div>
          </div>

          {/* Three reveal cards: one for each special category */}
          <div className="grid gap-2.5 sm:gap-6 md:grid-cols-3">
            {specialPrizes.map((category, idx) => (
              <TapReveal
                key={category.category}
                label={`Reveal Award #${idx + 1}`}
                hideLabel="Close Card"
                duration={500}
                cellSize={6}
                shimmer={false}
                className="min-h-[72px] rounded-lg border border-white/[0.1] bg-[#140e0a]/90 shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-xl hover:border-[#ffd89b]/40 sm:min-h-[200px] sm:rounded-2xl"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#e0b885] sm:text-[10px]">
                            {category.track}
                          </span>
                          <span className="font-mono text-xs text-white/20">
                            /
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[#a89d90] sm:text-[10px]">
                            1 Winner
                          </span>
                        </div>
                        <h4 className="mt-0.5 font-serif text-base font-normal text-white sm:mt-1 sm:text-2xl">
                          {category.category}
                        </h4>
                      </div>

                    </div>

                    <p className="mt-2 text-[11px] leading-relaxed text-[#ded4c5] sm:mt-3.5 sm:text-sm">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-3 border-t border-white/[0.08] pt-2.5 sm:mt-6 sm:pt-4">
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                      {category.prizes.map((prize) => (
                        <div
                          key={prize.place}
                          className="col-span-3 rounded-md border border-white/[0.08] bg-black/40 p-1.5 text-center shadow-inner transition-colors hover:border-[#ffd89b]/30 sm:rounded-lg sm:p-2.5"
                        >
                          <p className="font-mono text-[8.5px] uppercase tracking-wider text-[#b8ada0] sm:text-[10px]">
                            {prize.place}
                          </p>
                          <p className="mt-0.5 font-mono text-xs font-bold text-[#ffd89b] sm:text-base">
                            {prize.amount}
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

        {/* Prize Assurance Note */}
        <div className="mt-12 flex items-center justify-center gap-2 border-t border-white/[0.06] pt-6 text-center text-xs font-mono text-[#a89d90]">
          <ShieldCheck size={14} className="shrink-0 text-[#ffd89b]" />
          <p>
            <span className="font-medium text-[#ffd89b]">
              Guaranteed Settlement:
            </span>{" "}
            Direct UPI disbursement within 3 hours of final verified
            repository freeze. Additional surprise rewards may be announced
            if the event achieves the published ROI eligibility target.
          </p>
        </div>
      </div>
    </section>
  );
}
