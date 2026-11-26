import Link from "next/link";
import { ArrowRight, Trophy, Medal, Award } from "lucide-react";
import { overallPrizes, specialPrizes } from "@/data/prizes";

export default function PrizePool() {
  const getRankIcon = (place: string) => {
    switch (place) {
      case "1st":
        return <Trophy size={18} className="text-[#c89f6d]" />;
      case "2nd":
      case "3rd":
        return <Medal size={18} className="text-[#c89f6d]/80" />;
      default:
        return <Award size={18} className="text-[#8e7a68]" />;
    }
  };

  return (
    <section className="border-b border-sand-border/20 bg-cream-alt backdrop-blur-md">
      <div className="container-site section-pad">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
              Prizes & Recognition
            </p>
            <h2 className="mt-3 section-title">
              Recognise the <span className="font-serif italic font-normal text-[#c89f6d]">work.</span>
            </h2>
          </div>
          <Link
            href="/prizes"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#c89f6d] hover:text-[#f0eae1] transition-colors"
          >
            View all prize terms <ArrowRight size={14} />
          </Link>
        </div>

        {/* Overall Top 5 Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {overallPrizes.map((prize) => (
            <div
              key={prize.place}
              className="group rounded-2xl border border-sand-border/15 bg-[#120d09]/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-sand-border/40 hover:bg-[#18110b]/55 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#8e7a68]">
                  {prize.place} Place
                </span>
                {getRankIcon(prize.place)}
              </div>
              <div className="mt-8">
                <p className="font-serif text-3xl font-normal text-[#f0eae1]">
                  {prize.amount}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8e7a68]">
                  Direct cash reward
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Special Categories */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {specialPrizes.map((award) => (
            <div
              key={award.category}
              className="flex flex-col justify-between rounded-2xl border border-sand-border/15 bg-[#120d09]/40 p-6 backdrop-blur-xl sm:flex-row sm:items-center"
            >
              <div className="flex items-start gap-3.5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-sand-border/20 bg-[#1c140d]/60 text-[#c89f6d]">
                  <Award size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#f0eae1]">
                    {award.category}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#9e8e7c]">
                    {award.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:text-right">
                <p className="font-mono text-sm font-semibold text-[#c89f6d]">
                  {award.prizeAmount}
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-[#8e7a68]">
                  {award.trackLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
