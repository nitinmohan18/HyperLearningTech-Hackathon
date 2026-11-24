import Link from "next/link";
import {
  Trophy,
  Medal,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { overallPrizes, specialPrizes } from "@/data/prizes";

export default function PrizesSection() {
  const getRankBadge = (place: string) => {
    switch (place) {
      case "1st":
        return <Trophy size={18} className="text-[#e0b885]" />;
      case "2nd":
        return <Medal size={18} className="text-[#e0b885]/80" />;
      case "3rd":
        return <Medal size={18} className="text-[#a58f68]" />;
      default:
        return <Award size={16} className="text-[#8e7a68]" />;
    }
  };

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

        {/* 1. Overall Top 5 Standings - Clean minimal line-divided cards */}
        <div className="mt-14">
          <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-[#e0b885]" />
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                Overall Top 5 Standings
              </h3>
            </div>
            <span className="font-mono text-xs text-[#b8ada0]">₹6,795 Pool</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/[0.08] rounded-xl overflow-hidden border border-white/[0.08]">
            {overallPrizes.map((prize) => {
              const isFirst = prize.place === "1st";

              return (
                <div
                  key={prize.place}
                  className={`flex flex-col justify-between p-5 sm:p-6 transition-colors ${
                    isFirst
                      ? "col-span-2 sm:col-span-1 bg-[#23170e]/85"
                      : "bg-[#140e0a]/80 hover:bg-[#18110c]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#b8ada0]">
                        {prize.place} Place
                      </span>
                      {getRankBadge(prize.place)}
                    </div>
                    <p className="mt-3 text-xs text-[#d6cec2]">
                      {prize.label}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/[0.08] pt-3">
                    <p className="font-serif text-2xl sm:text-3xl font-normal text-white">
                      {prize.amount}
                    </p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-[#b8ada0]">
                      Cash Award
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
              <Sparkles size={16} className="text-[#e0b885]" />
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                Special Category Awards
              </h3>
            </div>
            <span className="font-mono text-xs text-[#b8ada0]">₹1,994 Pool</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {specialPrizes.map((category) => (
              <div
                key={category.category}
                className="rounded-xl border border-white/[0.08] bg-[#140e0a]/60 p-6 transition-colors hover:border-white/[0.15]"
              >
                <div>
                  <h4 className="font-serif text-2xl font-normal text-white">
                    {category.category}
                  </h4>
                  <p className="mt-1 text-xs text-[#d6cec2]">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/[0.08] pt-4">
                  {category.prizes.map((p) => (
                    <div key={p.place}>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#b8ada0]">
                        {p.place}
                      </span>
                      <p className="mt-1 font-serif text-xl font-normal text-white">
                        {p.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates & Recognition */}
        <div className="mt-14 border-t border-white/[0.08] pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#b8ada0]">
                Verifiable Credentials
              </p>
              <h4 className="mt-1 font-serif text-xl font-normal text-white">
                Official Digital Certificates for All Eligible Submissions
              </h4>
              <p className="mt-1 text-xs text-[#d6cec2] max-w-2xl">
                Every participant who completes the 24h sprint with verified repository activity receives a cryptographically verifiable certificate.
              </p>
            </div>
            <Link
              href="/certificates"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#e0b885] hover:text-white transition-colors shrink-0"
            >
              Verify Certificate <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
