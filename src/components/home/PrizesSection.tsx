import Link from "next/link";
import {
  Trophy,
  Medal,
  Award,
  Sparkles,
  ShieldCheck,
  Gift,
  Info,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { overallPrizes, specialPrizes, prizePoolMeta } from "@/data/prizes";

export default function PrizesSection() {
  const getRankBadge = (place: string) => {
    switch (place) {
      case "1st":
        return {
          icon: <Trophy size={20} className="text-[#c89f6d]" />,
          border: "border-[#c89f6d]/50 bg-[#c89f6d]/10",
          glow: "ring-1 ring-[#c89f6d]/30",
        };
      case "2nd":
        return {
          icon: <Medal size={20} className="text-[#c89f6d]/85" />,
          border: "border-sand-border/30 bg-[#16100c]/60",
          glow: "",
        };
      case "3rd":
        return {
          icon: <Medal size={20} className="text-[#8e7a68]" />,
          border: "border-sand-border/30 bg-[#16100c]/60",
          glow: "",
        };
      default:
        return {
          icon: <Award size={18} className="text-[#8e7a68]" />,
          border: "border-sand-border/20 bg-[#120d09]/40",
          glow: "",
        };
    }
  };

  return (
    <section id="prizes" className="section-pad border-b border-sand-border/20 bg-cream">
      <div className="container-site">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Awards & Recognition</p>
            <h2 className="section-title">
              Prizes & <span className="font-serif italic text-[#c89f6d]">Recognition</span>
            </h2>
            <p className="section-copy">
              A total announced cash prize pool of <strong className="text-[#f0eae1] font-semibold">₹8,789</strong> distributed directly across 11 winner positions, backed by verified repository evaluations.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="rounded-2xl border border-[#c89f6d]/35 bg-[#18110b]/70 px-5 py-3 text-right backdrop-blur-xl">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#8e7a68]">
                Total Cash Pool
              </p>
              <p className="font-serif text-3xl font-semibold text-[#c89f6d]">
                ₹8,789
              </p>
            </div>
          </div>
        </div>

        {/* 1. Overall Top 5 Cards */}
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between border-b border-sand-border/20 pb-3">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-[#c89f6d]" />
              <h3 className="font-serif text-2xl font-normal text-[#f0eae1]">
                Overall Top 5 Standings
              </h3>
            </div>
            <span className="font-mono text-xs text-[#8e7a68]">₹6,795 Combined</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {overallPrizes.map((prize) => {
              const badge = getRankBadge(prize.place);
              const isFirst = prize.place === "1st";

              return (
                <div
                  key={prize.place}
                  className={`group relative flex flex-col justify-between rounded-2xl border ${
                    isFirst
                      ? "border-[#c89f6d]/45 bg-[#18120c]/60 shadow-lg shadow-[#c89f6d]/5"
                      : "border-sand-border/15 bg-[#120d09]/40"
                  } p-6 backdrop-blur-xl transition-all duration-300 hover:border-sand-border/40 hover:bg-[#1a120c]/70 hover:-translate-y-1`}
                >
                  {isFirst && (
                    <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full border border-[#c89f6d]/50 bg-[#16100c] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#c89f6d]">
                      ★ Winner
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#8e7a68]">
                        {prize.place} Place
                      </span>
                      <div className={`grid h-8 w-8 place-items-center rounded-lg border ${badge.border}`}>
                        {badge.icon}
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-[#9e8e7c]">
                      {prize.label}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-sand-border/15 pt-4">
                    <p className="font-serif text-3xl sm:text-4xl font-normal text-[#f0eae1]">
                      {prize.amount}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#8e7a68]">
                      Direct Cash Award
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Special Category Awards */}
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between border-b border-sand-border/20 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#c89f6d]" />
              <h3 className="font-serif text-2xl font-normal text-[#f0eae1]">
                Special Category Awards (Top 3 Each)
              </h3>
            </div>
            <span className="font-mono text-xs text-[#8e7a68]">₹1,994 Combined</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {specialPrizes.map((category) => (
              <div
                key={category.category}
                className="rounded-2xl border border-sand-border/20 bg-[#120d09]/45 p-6 sm:p-7 backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-2xl font-normal text-[#f0eae1]">
                      {category.category}
                    </h4>
                    <p className="mt-1 text-xs text-[#9e8e7c]">
                      {category.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-[#c89f6d]/30 bg-[#c89f6d]/10 px-3 py-1 font-mono text-xs font-semibold text-[#c89f6d]">
                    {category.total} Total
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {category.prizes.map((prize) => (
                    <div
                      key={prize.place}
                      className="rounded-xl border border-sand-border/15 bg-[#16100c]/60 p-3.5 text-center"
                    >
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#8e7a68]">
                        {prize.place}
                      </p>
                      <p className="mt-1 font-serif text-xl sm:text-2xl font-semibold text-[#f0eae1]">
                        {prize.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. One Cash Award Rule Callout */}
        <div className="mt-8 rounded-2xl border border-sand-border/25 bg-[#18110b]/55 p-5 backdrop-blur-md">
          <div className="flex items-start gap-3.5">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#c89f6d]/30 bg-[#c89f6d]/10 text-[#c89f6d]">
              <Info size={16} />
            </div>
            <div className="text-xs leading-relaxed text-[#9e8e7c]">
              <strong className="text-[#f0eae1] font-semibold">Award Distribution Rule: </strong>
              Each project can receive only one cash award. If an Overall Top 5 project also qualifies as the highest-ranked entry in a special category, the special-category cash award passes to the next eligible project outside the Overall Top 5.
            </div>
          </div>
        </div>

        {/* 4. Certificates & Hidden Surprises */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Certificates Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-sand-border/15 bg-[#120d09]/40 p-6 sm:p-7 backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-normal text-[#f0eae1]">
                    Verifiable Certificates
                  </h4>
                  <p className="font-mono text-[11px] text-[#8e7a68]">
                    Participation & Top 25 Ranking
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-xs leading-relaxed text-[#9e8e7c]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#c89f6d]" />
                  <span>
                    <strong className="text-[#f0eae1]">Participation Certificates:</strong> Issued to every eligible participant who satisfies the event requirements and submits a verified project.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#c89f6d]" />
                  <span>
                    <strong className="text-[#f0eae1]">Top 25 Ranking Certificates:</strong> Top 25 projects receive official ranking certificates. Every member of a ranked squad receives their own individual certificate with verification ID.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-sand-border/15 pt-4">
              <Link
                href="/certificates"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#c89f6d] hover:text-[#f0eae1] transition-colors"
              >
                Test demo verification portal <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Hidden Surprises Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-sand-border/15 bg-[#120d09]/40 p-6 sm:p-7 backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
                  <Gift size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-normal text-[#f0eae1]">
                    The Hidden Surprises
                  </h4>
                  <p className="font-mono text-[11px] text-[#8e7a68]">
                    Recognition Beyond The Leaderboard
                  </p>
                </div>
              </div>

              <blockquote className="mt-5 rounded-xl border-l-2 border-[#c89f6d] bg-[#16100c]/50 p-3.5 font-serif italic text-sm text-[#f0eae1]">
                “Not every great project makes the Top 5. Some deserve recognition beyond the leaderboard. Keep building — HyperLearningTech has a few surprises waiting.”
              </blockquote>

              <p className="mt-4 text-xs leading-relaxed text-[#9e8e7c]">
                A small number of additional surprise recognitions may be given to promising projects outside cash awards (e.g. for thoughtful MVP design, strong solo execution, creative innovation, or underrated solutions). These are real rewards such as certificates, gifts, mentorship, or learning benefits—not implied cash prizes.
              </p>
            </div>

            <div className="mt-6 border-t border-sand-border/15 pt-4">
              <span className="font-mono text-[11px] text-[#8e7a68]">
                Categories & recipients intentionally unannounced
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
