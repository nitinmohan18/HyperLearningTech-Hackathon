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
              Prizes & <span className="font-serif italic text-[#e0b885]">Recognition</span>
            </h2>
            <p className="section-copy">
              A total announced cash prize pool of <strong className="text-white font-semibold">₹8,789</strong> distributed directly across 11 winner positions, backed by verified repository evaluations.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#b8ada0]">
                Total Cash Pool
              </p>
              <p className="font-serif text-3xl sm:text-4xl font-normal text-[#e0b885]">
                ₹8,789
              </p>
            </div>
          </div>
        </div>

        {/* 1. Overall Top 5 Standings */}
        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-[#e0b885]" />
              <h3 className="font-serif text-2xl font-normal text-white">
                Overall Top 5 Standings
              </h3>
            </div>
            <span className="font-mono text-xs text-[#b8ada0]">₹6,795 Combined</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {overallPrizes.map((prize) => {
              const badge = getRankBadge(prize.place);
              const isFirst = prize.place === "1st";

              return (
                <div
                  key={prize.place}
                  className={`relative flex flex-col justify-between rounded-xl p-5 sm:p-6 transition-colors ${
                    isFirst
                      ? "glass glass-accent border-[#e0b885]/40"
                      : "glass border-white/[0.08]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ada0]">
                        {prize.place} Place
                      </span>
                      {badge.icon}
                    </div>
                    <p className="mt-3 text-xs text-[#d6cec2]">
                      {prize.label}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/[0.08] pt-4">
                    <p className="font-serif text-3xl font-normal text-white">
                      {prize.amount}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-[#b8ada0]">
                      Direct Cash Award
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Special Category Awards */}
        <div className="mt-14">
          <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#e0b885]" />
              <h3 className="font-serif text-2xl font-normal text-white">
                Special Category Awards (Top 3 Each)
              </h3>
            </div>
            <span className="font-mono text-xs text-[#b8ada0]">₹1,994 Combined</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {specialPrizes.map((category) => (
              <div
                key={category.category}
                className="glass rounded-xl p-6 sm:p-7 border border-white/[0.08]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-2xl font-normal text-white">
                      {category.category}
                    </h4>
                    <p className="mt-1 text-xs text-[#d6cec2]">
                      {category.description}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs font-semibold text-[#e0b885]">
                    {category.total} Total
                  </span>
                </div>

                {/* Clean horizontal tier strip instead of nested boxes */}
                <div className="mt-6 grid grid-cols-3 divide-x divide-white/[0.08] border-t border-white/[0.08] pt-4 text-center">
                  {category.prizes.map((prize) => (
                    <div key={prize.place} className="px-2">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#b8ada0]">
                        {prize.place}
                      </p>
                      <p className="mt-1 font-serif text-xl sm:text-2xl font-normal text-white">
                        {prize.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. One Cash Award Rule Callout - Clean inline alert */}
        <div className="mt-8 border-l-2 border-[#e0b885] bg-white/[0.02] p-4 text-xs leading-relaxed text-[#d6cec2]">
          <strong className="text-white font-medium">Award Distribution Rule: </strong>
          Each project can receive only one cash award. If an Overall Top 5 project also qualifies as the highest-ranked entry in a special category, the special-category cash award passes to the next eligible project outside the Overall Top 5.
        </div>

        {/* 4. Certificates & Hidden Surprises */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Certificates Card */}
          <div className="glass rounded-xl flex flex-col justify-between p-6 sm:p-7 border border-white/[0.08]">
            <div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={22} className="text-[#e0b885]" />
                <div>
                  <h4 className="font-serif text-2xl font-normal text-white">
                    Verifiable Certificates
                  </h4>
                  <p className="font-mono text-[11px] text-[#b8ada0]">
                    Participation & Top 25 Ranking
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-xs leading-relaxed text-[#d6cec2]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#e0b885]" />
                  <span>
                    <strong className="text-white">Participation Certificates:</strong> Issued to every eligible participant who satisfies the event requirements and submits a verified project.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#e0b885]" />
                  <span>
                    <strong className="text-white">Top 25 Ranking Certificates:</strong> Top 25 projects receive official ranking certificates. Every member of a ranked squad receives their own individual certificate with verification ID.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-white/[0.08] pt-4">
              <Link
                href="/certificates"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#e0b885] hover:text-white transition-colors"
              >
                Test demo verification portal <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Hidden Surprises Card */}
          <div className="glass rounded-xl flex flex-col justify-between p-6 sm:p-7 border border-white/[0.08]">
            <div>
              <div className="flex items-center gap-3">
                <Gift size={22} className="text-[#e0b885]" />
                <div>
                  <h4 className="font-serif text-2xl font-normal text-white">
                    The Hidden Surprises
                  </h4>
                  <p className="font-mono text-[11px] text-[#b8ada0]">
                    Recognition Beyond The Leaderboard
                  </p>
                </div>
              </div>

              <blockquote className="mt-5 border-l-2 border-[#e0b885] pl-4 font-serif italic text-sm text-white">
                “Not every great project makes the Top 5. Some deserve recognition beyond the leaderboard. Keep building — HyperLearningTech has a few surprises waiting.”
              </blockquote>

              <p className="mt-4 text-xs leading-relaxed text-[#d6cec2]">
                A small number of additional surprise recognitions may be given to promising projects outside cash awards (e.g. for thoughtful MVP design, strong solo execution, creative innovation, or underrated solutions). These are real rewards such as certificates, gifts, mentorship, or learning benefits—not implied cash prizes.
              </p>
            </div>

            <div className="mt-6 border-t border-white/[0.08] pt-4">
              <span className="font-mono text-[11px] text-[#b8ada0]">
                Categories & recipients intentionally unannounced
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
