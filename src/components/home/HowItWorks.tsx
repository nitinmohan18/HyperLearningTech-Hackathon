import { UserCheck, Compass, Play, GitCommit, Send, AlertCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      name: "REGISTER",
      icon: UserCheck,
      headline: "Lock Your Spot & Pitch",
      desc: "Complete your registration (Solo or Squad) and submit your project brief/pitch deck before the 25 Dec deadline.",
    },
    {
      num: "02",
      name: "PREPARE",
      icon: Compass,
      headline: "Set Up On 25 December",
      desc: "Research, plan architecture, configure tooling, create your private Git repository, and invite the inspector account.",
    },
    {
      num: "03",
      name: "START BUILDING",
      icon: Play,
      headline: "Kickoff at 10 PM, 26 Dec",
      desc: "Attend the 9:30 PM final briefing. At 10:00 PM IST, the initial snapshot baseline is taken and the 24-hour clock starts.",
    },
    {
      num: "04",
      name: "BUILD & TRACK",
      icon: GitCommit,
      headline: "Ship & Checkpoint Hourly",
      desc: "Develop your MVP, commit code steadily, and submit concise hourly progress checkpoints to earn verified effort points.",
    },
    {
      num: "05",
      name: "SUBMIT",
      icon: Send,
      headline: "Freeze at 10 PM, 27 Dec",
      desc: "Reveal repository public at 8:00 PM. Final submission freezes at 10:00 PM with deployment URL, README, and declarations.",
    },
  ];

  return (
    <section id="how-it-works" className="section-pad border-b border-white/[0.08] bg-cream-alt">
      <div className="container-site">
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Participation Flow</p>
          <h2 className="section-title">
            How It <span className="font-serif italic text-[#e0b885]">Works</span>
          </h2>
          <p className="section-copy mx-auto">
            From registration to final project freeze, here is your five-step builder journey through Winter Hackathon ’26.
          </p>
        </div>

        {/* 5-Step Clean Flow */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-x divide-white/[0.08]">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className={`flex flex-col justify-between ${idx > 0 ? "lg:pl-6" : ""} pt-6 sm:pt-0`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#e0b885]">
                      {st.num}
                    </span>
                    <Icon size={18} className="text-[#b8ada0]" />
                  </div>

                  <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b8ada0]">
                    {st.name}
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-normal text-white">
                    {st.headline}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#d6cec2]">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Preparation-Day Boundary Notice */}
        <div className="mt-12 border-l-2 border-[#e0b885] bg-white/[0.02] p-4 text-xs leading-relaxed text-[#d6cec2]">
          <strong className="text-white font-medium">Important Boundary: </strong>
          Preparation-day work (25 December) does not count as competition-period development. Pre-event commits do not earn 24-hour effort points. The 24-hour evaluation strictly measures work engineered between 10:00 PM IST on 26 December and 10:00 PM IST on 27 December 2026.
        </div>
      </div>
    </section>
  );
}
