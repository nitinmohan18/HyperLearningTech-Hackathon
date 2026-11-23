import {
  FolderGit2,
  UserCheck,
  Camera,
  GitCommit,
  Eye,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Video,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function GithubSubmissionSection() {
  const inspectionSteps = [
    {
      num: "1",
      title: "Create 1 Private Repository",
      desc: "The team leader creates a single private GitHub repo for the project before the verification deadline.",
    },
    {
      num: "2",
      title: "Invite Organiser Inspector",
      desc: "Add the official HyperLearningTech inspection account as a collaborator with read access.",
    },
    {
      num: "3",
      title: "Verify Collaborator Access",
      desc: "The invitation must be accepted and verified before 9:00 PM IST on 26 Dec. Pending invites are insufficient.",
    },
    {
      num: "4",
      title: "Baseline Snapshot (10 PM, 26 Dec)",
      desc: "At 10:00 PM IST kickoff, organisers capture the initial commit state as baseline for 24h sprint evaluation.",
    },
    {
      num: "5",
      title: "Regular Commits & Pushes",
      desc: "Push meaningful commits and PRs during the 24 hours. Judges inspect diffs, commit timelines, and active progress.",
    },
    {
      num: "6",
      title: "Public Reveal (8 PM, 27 Dec)",
      desc: "At 8:00 PM IST, leaders switch repo visibility to Public for transparent community and judge examination.",
    },
    {
      num: "7",
      title: "Final Snapshot (10 PM, 27 Dec)",
      desc: "At 10:00 PM IST deadline, final snapshot freezes. Post-deadline commits are excluded from scoring.",
    },
  ];

  const submissionChecklist = [
    "Project Title & One-line Summary",
    "Problem Statement & Target Users",
    "Solution Summary & Core Value",
    "Key Feature List & Capabilities",
    "Live Deployment URL (Production Link)",
    "Public Repository URL (after reveal)",
    "Setup & Local Installation Instructions",
    "Individual / Squad Contribution Statement",
    "AI Tools & Pre-existing Asset Disclosures",
  ];

  return (
    <section id="github-submission" className="section-pad border-b border-white/[0.08] bg-cream-alt">
      <div className="container-site">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Mandatory Integrity Process</p>
          <h2 className="section-title">
            GitHub & <span className="font-serif italic text-[#e0b885]">Project Submission</span>
          </h2>
          <p className="section-copy mx-auto">
            Winter Hackathon ’26 uses a verified private repository inspection process (no GitHub app required). Understand this requirement clearly before registering.
          </p>
        </div>

        {/* Visual Workflow Flowchart - Clean open progression */}
        <div className="mt-12 border-t border-white/[0.08] pt-8">
          <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e0b885] mb-8">
            Repository Lifecycle Progression
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            <div className="pt-4 md:pt-0">
              <span className="font-mono text-[10px] text-[#b8ada0] uppercase">Phase 1</span>
              <p className="mt-1 font-serif text-lg font-normal text-white">Private Repository</p>
              <p className="mt-1 text-xs text-[#d6cec2]">Created on Prep Day</p>
            </div>

            <div className="pt-4 md:pt-0 md:pl-4">
              <span className="font-mono text-[10px] text-[#b8ada0] uppercase">Phase 2</span>
              <p className="mt-1 font-serif text-lg font-normal text-white">Organiser Inspection</p>
              <p className="mt-1 text-xs text-[#d6cec2]">Verified collaborator access</p>
            </div>

            <div className="pt-4 md:pt-0 md:pl-4">
              <span className="font-mono text-[10px] text-[#b8ada0] uppercase">Phase 3</span>
              <p className="mt-1 font-serif text-lg font-normal text-white">Public Reveal</p>
              <p className="mt-1 text-xs text-[#d6cec2]">8:00 PM IST, 27 Dec</p>
            </div>

            <div className="pt-4 md:pt-0 md:pl-4">
              <span className="font-mono text-[10px] text-[#e0b885] uppercase">Phase 4</span>
              <p className="mt-1 font-serif text-lg font-normal text-white">Final Submission</p>
              <p className="mt-1 text-xs text-[#d6cec2]">10:00 PM IST freeze</p>
            </div>
          </div>
        </div>

        {/* 7-Step Inspection Protocol - Clean open grid */}
        <div className="mt-14 border-t border-white/[0.08] pt-10">
          <h3 className="font-serif text-2xl font-normal text-white mb-6">
            Mandatory Private Repository Inspection Workflow
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {inspectionSteps.map((st) => (
              <div
                key={st.num}
                className="flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-[#e0b885]">
                    Step {st.num}
                  </span>
                  <h4 className="mt-2 font-serif text-base font-normal text-white leading-snug">
                    {st.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Access Warning Callout - Clean alert line */}
        <div className="mt-10 border-l-2 border-amber-500 bg-amber-500/[0.04] p-5 text-xs text-[#d6cec2]">
          <div className="flex items-start gap-3.5">
            <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="font-serif text-lg font-normal text-amber-100">
                Pending Collaborator Invitations Are Insufficient
              </h4>
              <p className="leading-relaxed">
                Every team leader must invite the official HyperLearningTech GitHub inspection account and confirm that the invitation is active and accepted before 9:00 PM IST on 26 December. If the invitation remains pending or unverified, your entry is considered incomplete and may be held from the official competition start list.
              </p>
              <p className="font-mono text-[11px] text-[#b8ada0]">
                Note: The official GitHub inspection username will be published to registered builders prior to registration closing. Organisers will never request passwords or personal access tokens.
              </p>
            </div>
          </div>
        </div>

        {/* Final Submission Requirements & Optional Video */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Submission Checklist */}
          <div className="glass rounded-xl p-6 sm:p-7 border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-5">
              <FileCheck size={20} className="text-[#e0b885]" />
              <div>
                <h4 className="font-serif text-2xl font-normal text-white">
                  Final Submission Checklist
                </h4>
                <p className="font-mono text-[11px] text-[#b8ada0]">
                  Freeze strictly at 10:00 PM IST on 27 Dec
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {submissionChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-[#d6cec2]"
                >
                  <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-[#e0b885]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Video Guidelines */}
          <div className="glass rounded-xl flex flex-col justify-between p-6 sm:p-7 border border-white/[0.08]">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Video size={20} className="text-[#e0b885]" />
                <div>
                  <h4 className="font-serif text-2xl font-normal text-white">
                    Demo Video (Recommended but Optional)
                  </h4>
                  <p className="font-mono text-[11px] text-[#b8ada0]">
                    3–5 minutes suggested · Unlisted YouTube / Google Drive
                  </p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-[#d6cec2]">
                A video presentation is <strong className="text-white">optional</strong> and not required to win. If submitted, keep it concise and grounded in your working build.
              </p>

              <div className="mt-4 border-l border-white/[0.1] pl-3.5 font-mono text-xs">
                <p className="font-semibold text-[#e0b885] uppercase tracking-wider text-[11px]">
                  Suggested Video Structure:
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#d6cec2] mt-2">
                  <div>• Problem: 30 sec</div>
                  <div>• Solution: 45 sec</div>
                  <div>• Working Demo: ~2 min</div>
                  <div>• Tech Details: 45 sec</div>
                  <div className="col-span-2">• Next Steps: 30 sec</div>
                </div>
              </div>

              <p className="mt-4 text-xs text-[#b8ada0]">
                Judges evaluate working software, deployed sites, and code diffs on merit. Video production quality is not scored so solo builders are never disadvantaged.
              </p>
            </div>

            <div className="mt-6 border-t border-white/[0.08] pt-4">
              <span className="font-mono text-[11px] text-[#e0b885]">
                Tip: Test video sharing permissions (anyone with link can view) before 10 PM.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
