import { UserCheck, FolderGit2, Terminal, Rocket } from "lucide-react";

export default function HowToParticipate() {
  const steps = [
    {
      step: "01",
      title: "Register",
      icon: UserCheck,
      copy: "Register in the Squad format (1–4 members, ₹200 flat) and submit your project proposal and declarations.",
    },
    {
      step: "02",
      title: "Prepare",
      icon: FolderGit2,
      copy: "Set up your private GitHub repository and complete pre-event briefings on 25 December.",
    },
    {
      step: "03",
      title: "Build",
      icon: Terminal,
      copy: "24-hour sprint begins 26 Dec at 10 PM IST. Log hourly checkpoints and git commits.",
    },
    {
      step: "04",
      title: "Submit",
      icon: Rocket,
      copy: "Deploy your project, submit repo access, feature breakdown, and demo before 10 PM IST.",
    },
  ];

  return (
    <section className="section-pad border-b border-sand-border/20 bg-cream">
      <div className="container-site">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
          Participation Flow
        </p>
        <h2 className="mt-3 section-title">From registration to reveal.</h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative flex flex-col justify-between rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-7 backdrop-blur-xl transition-all duration-300 hover:border-sand-border/40 hover:bg-[#18110b]/50 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d] shadow-sm transition-colors group-hover:border-[#c89f6d]/50">
                      <Icon size={18} />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#8e7a68]">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-normal text-[#f0eae1]">
                    {item.title}
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
