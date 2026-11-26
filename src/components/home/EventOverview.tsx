import { Clock, Trophy, Medal, Users } from "lucide-react";

export default function EventOverview() {
  const metrics = [
    { value: "24 Hours", label: "Build challenge", note: "Continuous execution", icon: Clock },
    { value: "Up to ₹9,000", label: "Cash prize pool", note: "Direct cash awards", icon: Trophy },
    { value: "Top 25", label: "Ranked projects", note: "Recognised & certified", icon: Medal },
    { value: "Squad Format", label: "Participation", note: "1 to 4 builders · ₹200 flat", icon: Users },
  ];

  return (
    <>
      {/* Key Metrics Bar */}
      <section className="border-b border-sand-border/20 bg-cream-alt backdrop-blur-md">
        <div className="container-site grid grid-cols-2 gap-px bg-sand-border/15 sm:grid-cols-4">
          {metrics.map(({ value, label, note, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center bg-[#0d0a08]/90 p-6 text-center sm:py-9">
              <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl border border-sand-border/20 bg-[#16100c]/60 text-[#c89f6d]">
                <Icon size={18} />
              </div>
              <p className="font-serif text-3xl font-normal text-[#f0eae1] sm:text-4xl">
                {value}
              </p>
              <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8e7a68]">
                {label}
              </p>
              <p className="mt-1 text-xs text-[#9e8e7c]">
                {note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The Challenge Overview */}
      <section className="section-pad border-b border-sand-border/20 bg-cream">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
              The Challenge
            </p>
            <h2 className="mt-3 section-title">
              Build something <span className="font-serif italic font-normal text-[#c89f6d]">real</span> in 24 hours.
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-[#9e8e7c] sm:text-lg">
              Winter Hackathon ’26 brings independent builders together for a focused, transparent online competition. Participants receive a project brief, develop an original working solution, maintain inspectable repository progress, and present a complete submission.
            </p>
            <p className="text-sm leading-relaxed text-[#8e7a68]">
              Genuine development effort matters: AI tools may assist, but use must be disclosed, existing work cannot substitute for the hackathon build, and the project must remain the participant’s or squad’s own original work.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
