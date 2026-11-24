import {
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function GithubSubmissionSection() {
  const inspectionSteps = [
    {
      num: "01",
      title: "Private Repo",
      desc: "Leader creates 1 private GitHub repo for the squad before deadline.",
    },
    {
      num: "02",
      title: "Inspector Access",
      desc: "Add the official organiser inspection account as collaborator.",
    },
    {
      num: "03",
      title: "Access Confirmed",
      desc: "Must be accepted & verified before 9:00 PM IST on 26 Dec.",
    },
    {
      num: "04",
      title: "Baseline Snapshot",
      desc: "At 10:00 PM IST kickoff, initial baseline state is captured.",
    },
    {
      num: "05",
      title: "Continuous Commits",
      desc: "Push commits & diffs across the 24 hours with hourly checkpoints.",
    },
    {
      num: "06",
      title: "Public Reveal",
      desc: "Switch repository to Public at 8:00 PM IST, 27 Dec for peer audit.",
    },
    {
      num: "07",
      title: "Final Freeze",
      desc: "At 10:00 PM IST, final snapshot freezes code for grading.",
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
            A transparent inspection process through private repositories. No third-party apps required.
          </p>
        </div>

        {/* 7-Step Inspection Protocol - Clean modern minimal list */}
        <div className="mt-14 border-t border-white/[0.08] pt-10">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0b885] mb-8">
            Inspection Protocol
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
                Collaborator Invitation Requirement
              </h4>
              <p className="mt-1 leading-relaxed text-[#d6cec2]">
                Every team leader must invite the official HyperLearningTech GitHub inspection account and confirm that access is active before 9:00 PM IST on 26 December. Pending or unaccepted invites cannot be evaluated.
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
