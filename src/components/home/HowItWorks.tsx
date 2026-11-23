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
    <section id="how-it-works" className="section-pad border-b border-sand-border/20 bg-cream-alt backdrop-blur-md">
      <div className="container-site">
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Participation Flow</p>
          <h2 className="section-title">
            How It <span className="font-serif italic text-[#c89f6d]">Works</span>
          </h2>
          <p className="section-copy mx-auto">
            From registration to final project freeze, here is your five-step builder journey through Winter Hackathon ’26.
          </p>
        </div>

        {/* 5-Step Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="group relative flex flex-col justify-between rounded-2xl border border-sand-border/15 bg-[#120d09]/45 p-6 backdrop-blur-xl transition-all duration-300 hover:border-sand-border/40 hover:bg-[#18110b]/60 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#c89f6d]">
                      {st.num}
                    </span>
                    <div className="grid h-9 w-9 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d] shadow-sm transition-colors group-hover:border-[#c89f6d]/50">
                      <Icon size={17} />
                    </div>
                  </div>

                  <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8e7a68]">
                    {st.name}
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-normal text-[#f0eae1]">
                    {st.headline}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-[#9e8e7c]">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Preparation-Day Boundary Notice */}
        <div className="mt-10 rounded-2xl border border-sand-border/25 bg-[#16100c]/60 p-5 backdrop-blur-md">
          <div className="flex items-start gap-3.5">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#c89f6d]/30 bg-[#c89f6d]/10 text-[#c89f6d]">
              <AlertCircle size={16} />
            </div>
            <div className="text-xs leading-relaxed text-[#9e8e7c]">
              <strong className="text-[#f0eae1] font-semibold">Important Boundary: </strong>
              Preparation-day work (25 December) does not count as competition-period development. Pre-event commits do not earn 24-hour effort points. The 24-hour evaluation strictly measures work engineered between 10:00 PM IST on 26 December and 10:00 PM IST on 27 December 2026.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
