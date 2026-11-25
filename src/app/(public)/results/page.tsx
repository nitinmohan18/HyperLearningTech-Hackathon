import Link from "next/link";
import { Award, Sparkles, Trophy, Medal, ArrowRight, ShieldCheck } from "lucide-react";
import { overallPrizes, specialPrizes } from "@/data/prizes";
import { leaderboard } from "@/data/mock-data";

export default function ResultsPage() {
  const getPodiumIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy size={20} className="text-[#c89f6d]" />;
      case 1:
        return <Medal size={20} className="text-[#c89f6d]/80" />;
      default:
        return <Medal size={20} className="text-[#8e7a68]" />;
    }
  };

  return (
    <div className="bg-cream">
      <div className="container-site section-pad">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
              Declaration & Honors
            </p>
            <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#f0eae1]">
              Official Event Results
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#9e8e7c] sm:text-lg">
              Honoring champions, category pioneers, and all Top 25 certified projects for Winter Hackathon ’26.
            </p>
          </div>
          <span className="font-mono text-xs text-[#8e7a68]">
            Declaration: 27 Dec 2026, 11:00 PM IST
          </span>
        </div>

        {/* Top 3 Podium Highlights */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {overallPrizes.slice(0, 3).map((p, i) => (
            <div
              key={p.place}
              className={`flex flex-col justify-between rounded-2xl border bg-[#120d09]/35 p-7 backdrop-blur-xl transition-all duration-300 ${
                i === 0
                  ? "border-[#c89f6d]/40 shadow-card"
                  : "border-sand-border/15 hover:border-sand-border/30"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8e7a68]">
                    {p.place} Place Award
                  </span>
                  {getPodiumIcon(i)}
                </div>
                <h3 className="mt-5 font-serif text-2xl sm:text-3xl font-normal text-[#f0eae1]">
                  {leaderboard[i]?.project ?? "Evaluation Pending"}
                </h3>
                <p className="mt-1 font-mono text-xs text-[#8e7a68]">
                  {leaderboard[i]?.team ? `Team: ${leaderboard[i].team}` : "Declaration Post-Freeze"}
                </p>
              </div>

              <div className="mt-8 border-t border-sand-border/15 pt-4 flex items-center justify-between">
                <span className="font-mono text-xs text-[#8e7a68]">Cash Reward:</span>
                <span className="font-serif text-2xl font-normal text-[#c89f6d]">{p.amount}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Special Category Winners */}
        <div className="mt-14">
          <h2 className="font-serif text-2xl font-normal text-[#f0eae1]">
            Special Excellence Winners
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {specialPrizes.map((a) => (
              <div key={a.category} className="rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-7 backdrop-blur-xl">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d] shadow-sm">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#f0eae1]">
                      {a.category}
                    </h3>
                    <p className="text-xs text-[#9e8e7c]">{a.trackLabel}</p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-[#ded4c5] leading-relaxed">
                  {a.description}
                </p>

                <div className="mt-6 border-t border-sand-border/15 pt-3 flex items-center justify-between text-sm">
                  <span className="font-mono text-xs text-[#8e7a68]">Special Cash Award</span>
                  <span className="font-mono font-semibold text-[#c89f6d]">{a.prizeAmount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 25 Ranking Announcement */}
        <div className="mt-14 rounded-2xl border border-sand-border/20 bg-[#16100c]/40 p-8 sm:p-10 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#c89f6d]">
                <ShieldCheck size={16} />
                <span>Certification Program</span>
              </div>
              <h2 className="mt-3 font-serif text-3xl font-normal text-[#f0eae1]">
                Top 25 Official Rankings & Certificates
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#9e8e7c]">
                Every project qualifying in the Top 25 receives an authenticated ranking certificate. Every squad member receives an individual credential with unique verification ID.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-4">
              <Link href="/leaderboard" className="btn-primary">
                View Full Leaderboard <ArrowRight size={16} />
              </Link>
              <Link href="/certificates" className="btn-secondary">
                Verify Credentials
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
