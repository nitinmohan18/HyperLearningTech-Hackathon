import { UserCheck, Compass, Play, GitCommit, Send } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      name: "REGISTER",
      icon: UserCheck,
      headline: "Register & Pitch",
      desc: "Register in Squad format (₹200 flat, 1–4 members) and submit your initial problem brief before the 25 Dec deadline.",
    },
    {
      num: "02",
      name: "PREPARE",
      icon: Compass,
      headline: "Setup on 25 Dec",
      desc: "Plan architecture, configure tooling, create your private Git repository, and invite the inspector account.",
    },
    {
      num: "03",
      name: "START",
      icon: Play,
      headline: "Kickoff at 10 PM, 26 Dec",
      desc: "Baseline snapshot is taken at 10:00 PM IST and the 24-hour continuous build clock officially begins.",
    },
    {
      num: "04",
      name: "BUILD",
      icon: GitCommit,
      headline: "Ship & Checkpoint",
      desc: "Commit code steadily and submit concise hourly checkpoints to log verifiable development progress.",
    },
    {
      num: "05",
      name: "SUBMIT",
      icon: Send,
      headline: "Freeze at 10 PM, 27 Dec",
      desc: "Reveal repository public at 8:00 PM. Final snapshot freezes at 10:00 PM IST with live deployment link.",
    },
  ];

  return (
    <section id="how-it-works" className="section-pad border-b border-white/[0.08] bg-cream-alt">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Participation Flow</p>
          <h2 className="section-title">
            How It <span className="font-serif italic text-[#e0b885]">Works</span>
          </h2>
          <p className="section-copy mx-auto">
            A structured 5-step journey from initial registration to final snapshot grading.
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
                    <Icon size={16} className="text-[#b8ada0]" />
                  </div>

                  <p className="mt-4 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#b8ada0]">
                    {st.name}
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-normal text-white">
                    {st.headline}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear boundary note */}
        <div className="mt-12 rounded-xl border border-white/[0.08] bg-[#140e0a]/50 p-4 text-xs leading-relaxed text-[#d6cec2]">
          <strong className="text-white font-medium">Sprint Boundary: </strong>
          Preparation work on 25 December is for architecture and tooling. The 24-hour evaluation measures commits engineered between 10:00 PM IST on 26 Dec and 10:00 PM IST on 27 Dec 2026.
        </div>
      </div>
    </section>
  );
}
