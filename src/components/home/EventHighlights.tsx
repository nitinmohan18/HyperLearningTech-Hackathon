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
    <section id="overview" className="border-b border-white/[0.08] bg-cream-alt">
      <div className="container-site py-12 sm:py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="eyebrow">At A Glance</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              Event Highlights
            </h2>
          </div>
          <span className="hidden font-mono text-xs text-[#b8ada0] sm:inline">
            Official Edition 1.0
          </span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-white/[0.08]">
          {highlights.map(({ title, subtitle, metric, icon: Icon, detail }, idx) => (
            <div
              key={title}
              className={`flex flex-col justify-between ${idx > 0 ? "lg:pl-8" : ""} pt-6 sm:pt-0`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <Icon size={20} className="text-[#e0b885]" />
                  <span className="font-mono text-xs font-semibold text-[#e0b885]">
                    {metric}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-xl sm:text-2xl font-normal text-white leading-snug">
                  {title}
                </h3>
              </div>
              <div className="mt-5 border-t border-white/[0.08] pt-3">
                <p className="font-mono text-[10px] text-[#b8ada0] uppercase tracking-wider">
                  {subtitle}
                </p>
                <p className="mt-0.5 text-xs text-[#d6cec2]">
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
