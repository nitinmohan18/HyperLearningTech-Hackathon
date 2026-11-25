import Link from "next/link";
import { ArrowRight, Trophy, Medal, Award, Sparkles, ShieldCheck, FileCheck, Gift } from "lucide-react";
import { overallPrizes, specialPrizes } from "@/data/prizes";

export default function PrizesPage() {
  const policies = [
    {
      title: "One award per project",
      icon: Trophy,
      copy: "A project can receive at most one cash award, even if eligible across multiple categories. The highest value award takes precedence.",
    },
    {
      title: "Ranking & Participation Certificates",
      icon: ShieldCheck,
      copy: "Eligible individual participants receive participation certificates; Top 25 ranked projects receive official ranking certificates for each squad member.",
    },
    {
      title: "Hidden surprise recognition",
      icon: Gift,
      copy: "Additional surprise rewards may conditionally be offered if the event achieves more than 75% ROI. These rewards are not guaranteed.",
    },
  ];

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
    <div className="bg-cream">
      <div className="container-site section-pad">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
            Prize Pool & Awards
          </p>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#f0eae1]">
            ₹14,992 in <br />
            <span className="font-serif italic font-normal text-[#c89f6d]">
              direct cash prizes.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9e8e7c] sm:text-lg">
            A total guaranteed cash prize pool of ₹14,992 distributed across 8 winner positions (Overall Top 5 plus 3 specialized excellence categories), backed by transparent GitHub repository verification.
          </p>
        </div>

        {/* Overall Top 5 */}
        <div className="mt-14">
          <div className="flex items-center justify-between border-b border-sand-border/20 pb-3">
            <h2 className="font-serif text-2xl font-normal text-[#f0eae1]">
              Overall Rankings (Top 5)
            </h2>
            <span className="font-mono text-xs text-[#8e7a68]">IST Distribution by 11:05 PM</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {overallPrizes.map((p) => (
              <div
                key={p.place}
                className="group flex flex-col justify-between rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-6 backdrop-blur-xl transition-all duration-300 hover:border-sand-border/40 hover:bg-[#18110b]/50 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8e7a68]">
                    {p.place} Place
                  </span>
                  {getRankIcon(p.place)}
                </div>
                <div className="mt-8">
                  <p className="font-serif text-3xl font-normal text-[#f0eae1]">{p.amount}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#8e7a68]">
                    Direct cash reward
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Awards - 3 Tracks */}
        <div className="mt-14">
          <div className="flex items-center justify-between border-b border-sand-border/20 pb-3">
            <h2 className="font-serif text-2xl font-normal text-[#f0eae1]">
              Special Excellence Categories
            </h2>
            <span className="font-mono text-xs text-[#8e7a68]">3 Specialized Tracks · ₹499 each</span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {specialPrizes.map((a) => (
              <div
                key={a.category}
                className="flex flex-col justify-between rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-7 backdrop-blur-xl transition-all duration-300 hover:border-sand-border/30"
              >
                <div>
                  <div className="flex items-center gap-3.5">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d] shadow-sm">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-normal text-[#f0eae1]">
                        {a.category}
                      </h3>
                      <p className="text-xs text-[#9e8e7c] mt-0.5">{a.trackLabel}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-[#ded4c5] leading-relaxed">
                    {a.description}
                  </p>

                  <div className="mt-6 border-t border-sand-border/15 pt-3 flex items-center justify-between text-sm">
                    <span className="font-mono text-xs text-[#8e7a68]">
                      Dedicated Winner
                    </span>
                    <span className="font-mono font-semibold text-[#c89f6d]">
                      {a.prizeAmount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules & Eligibility Policies */}
        <div className="mt-14">
          <h2 className="font-serif text-2xl font-normal text-[#f0eae1]">
            Award Terms & Guidelines
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {policies.map(({ title, icon: Icon, copy }) => (
              <div
                key={title}
                className="rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-7 backdrop-blur-xl transition-all duration-300 hover:border-sand-border/30"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d] shadow-sm">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 font-serif text-xl font-normal text-[#f0eae1]">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#9e8e7c]">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-sand-border/20 bg-[#16100c]/40 p-7 sm:p-8 backdrop-blur-xl sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="font-serif text-xl font-normal text-[#f0eae1]">
              Ready to build for rank and prizes?
            </h3>
            <p className="mt-1 text-sm text-[#9e8e7c]">
              Registrations close on 25 December. Join as a solo builder or register your squad.
            </p>
          </div>
          <Link href="/register" className="btn-primary mt-4 shrink-0 sm:mt-0">
            Register Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
