import { Clock, Globe, Users, Trophy } from "lucide-react";

export default function EventHighlights() {
  const highlights = [
    {
      title: "24-Hour Development Challenge",
      subtitle: "Continuous build window",
      metric: "24 Hours",
      icon: Clock,
      detail: "26 Dec 10:00 PM – 27 Dec 10:00 PM IST",
    },
    {
      title: "Fully Online",
      subtitle: "100% remote participation",
      metric: "Remote",
      icon: Globe,
      detail: "Briefings, check-ins & judging online",
    },
    {
      title: "Solo or Teams of 2–4",
      subtitle: "Flexible entry formats",
      metric: "1 to 4",
      icon: Users,
      detail: "Solo (₹99) or Squad (₹200 flat)",
    },
    {
      title: "₹8,789 Total Cash Prize Pool",
      subtitle: "11 cash positions",
      metric: "₹8,789",
      icon: Trophy,
      detail: "Top 5 overall + 2 special categories",
    },
  ];

  return (
    <section id="overview" className="border-b border-sand-border/20 bg-cream-alt backdrop-blur-md">
      <div className="container-site py-12 sm:py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="eyebrow">At A Glance</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#f0eae1]">
              Event Highlights
            </h2>
          </div>
          <span className="hidden font-mono text-xs text-[#8e7a68] sm:inline">
            Official Edition 1.0
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ title, subtitle, metric, icon: Icon, detail }) => (
            <div
              key={title}
              className="group relative flex flex-col justify-between rounded-2xl border border-sand-border/15 bg-[#120d09]/45 p-6 backdrop-blur-xl transition-all duration-300 hover:border-sand-border/40 hover:bg-[#18110b]/60 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d] shadow-sm transition-colors group-hover:border-[#c89f6d]/50">
                    <Icon size={18} />
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#c89f6d]">
                    {metric}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-xl font-normal text-[#f0eae1] leading-snug">
                  {title}
                </h3>
              </div>
              <div className="mt-4 border-t border-sand-border/15 pt-3">
                <p className="font-mono text-[11px] text-[#8e7a68] uppercase tracking-wider">
                  {subtitle}
                </p>
                <p className="mt-0.5 text-xs text-[#9e8e7c]">
                  {detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
