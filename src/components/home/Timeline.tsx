import Link from "next/link";
import { ArrowRight, CalendarDays, Flame, Trophy } from "lucide-react";

export default function Timeline() {
  const items = [
    {
      date: "25 Dec 2026",
      label: "Preparation Day",
      icon: CalendarDays,
      copy: "Registration closes at the published time. Environment configuration, private repository setup, and conceptual planning.",
    },
    {
      date: "26 Dec · 10:00 PM IST",
      label: "Competition Kickoff",
      icon: Flame,
      copy: "The 24-hour continuous build begins. The first commit must contain initial README documentation before development starts.",
    },
    {
      date: "27 Dec · 10:00 PM IST",
      label: "Freeze & Evaluation",
      icon: Trophy,
      copy: "Final freeze at 10:00 PM. Three-stage evaluation leads to Top 25 live Google Meet presentations and UPI prize distribution.",
    },
  ];

  return (
    <section className="border-b border-sand-border/20 bg-cream-alt backdrop-blur-md">
      <div className="container-site section-pad">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
              Schedule
            </p>
            <h2 className="mt-3 section-title">Three decisive days.</h2>
          </div>
          <Link
            href="/schedule"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#c89f6d] hover:text-[#f0eae1] transition-colors"
          >
            Full schedule breakdown <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.date}
                className="group relative flex flex-col justify-between rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-7 backdrop-blur-xl transition-all duration-300 hover:border-sand-border/40 hover:bg-[#18110b]/50 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d] shadow-sm transition-colors group-hover:border-[#c89f6d]/50">
                      <Icon size={18} />
                    </div>
                    <span className="font-mono text-xs text-[#8e7a68]">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-normal text-[#f0eae1]">
                    {item.label}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#9e8e7c]">
                    {item.copy}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
