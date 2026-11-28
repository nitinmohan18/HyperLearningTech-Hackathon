import {
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function GithubSubmissionSection() {
  const inspectionSteps = [
    {
      num: "01",
      title: "Dedicated Repository",
      desc: "Leader creates 1 dedicated GitHub repository (public or private) for the project.",
    },
    {
      num: "02",
      title: "Organiser Access",
      desc: "Invite official HyperLearningTech account as collaborator, verified before 9:00 PM IST on 26 Dec.",
    },
    {
      num: "03",
      title: "Initial README First",
      desc: "First commit must include initial README documentation before implementation begins.",
    },
    {
      num: "04",
      title: "24-Hour Active Build",
      desc: "Develop your solution between 10:00 PM 26 Dec and 10:00 PM 27 Dec with regular commits.",
    },
    {
      num: "05",
      title: "Updated Final README",
      desc: "Document features, setup steps, external resources, and AI-assisted components before deadline.",
    },
    {
      num: "06",
      title: "Final Freeze at 10 PM",
      desc: "At 10:00 PM IST, final commit is frozen. No post-deadline commits are scored.",
    },
    {
      num: "07",
      title: "Three-Stage Evaluation",
      desc: "Compliance check, 100-point rubric shortlisting, and Top 25 live Google Meet presentations.",
    },
  ];

  return (
    <section id="github-submission" className="section-pad border-b border-white/[0.08] bg-cream-alt">
      <div className="container-site">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Repository Integrity</p>
          <h2 className="section-title">
            GitHub & <span className="font-serif italic text-[#e0b885]">Project Submission</span>
          </h2>
          <p className="section-copy mx-auto">
            A transparent evaluation process with only two mandatory technical requirements: verified organiser repository access and documentation-first README development.
          </p>
        </div>

        {/* 7-Step Inspection Protocol */}
        <div className="mt-14 border-t border-white/[0.08] pt-10">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0b885] mb-8">
            Submission & Evaluation Protocol
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {inspectionSteps.map((st) => (
              <div
                key={st.num}
                className="border-l border-white/[0.1] pl-4 py-1"
              >
                <span className="font-mono text-xs font-semibold text-[#e0b885]">
                  Step {st.num}
                </span>
                <h4 className="mt-1 font-serif text-base font-normal text-white">
                  {st.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-[#d6cec2]">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Clean alert line */}
        <div className="mt-12 rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-5 text-xs text-[#d6cec2]">
          <div className="flex items-start gap-3.5">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-base font-normal text-white">
                Two Mandatory Technical Requirements
              </h4>
              <p className="mt-1 leading-relaxed text-[#d6cec2]">
                1) Provide verified collaborator access for the official HyperLearningTech GitHub account before 9:00 PM IST on 26 December. 2) Commit initial README documentation before project application development begins. Recommended practices (PRs, CI/CD, live deployment) are optional evidence of quality, not disqualification triggers.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/rules"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#e0b885] hover:text-white transition-colors"
          >
            Repository Rules & Guidelines <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
