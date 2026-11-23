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
    <section id="github-submission" className="section-pad border-b border-sand-border/20 bg-cream-alt backdrop-blur-md">
      <div className="container-site">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Mandatory Integrity Process</p>
          <h2 className="section-title">
            GitHub & <span className="font-serif italic text-[#c89f6d]">Project Submission</span>
          </h2>
          <p className="section-copy mx-auto">
            Winter Hackathon ’26 uses a verified private repository inspection process (no GitHub app required). Understand this requirement clearly before registering.
          </p>
        </div>

        {/* Visual Workflow Flowchart */}
        <div className="mt-12 rounded-2xl border border-[#c89f6d]/30 bg-[#16100c]/80 p-6 sm:p-8 backdrop-blur-xl">
          <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c89f6d] mb-6">
            Repository Lifecycle Progression
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center">
            <div className="rounded-xl border border-sand-border/20 bg-[#120d09]/70 p-4">
              <span className="font-mono text-[10px] text-[#8e7a68] uppercase">Phase 1</span>
              <p className="mt-1 font-serif text-lg font-normal text-[#f0eae1]">Private Repository</p>
              <p className="mt-1 text-[11px] text-[#9e8e7c]">Created on Prep Day</p>
            </div>

            <div className="rounded-xl border border-sand-border/20 bg-[#120d09]/70 p-4">
              <span className="font-mono text-[10px] text-[#8e7a68] uppercase">Phase 2</span>
              <p className="mt-1 font-serif text-lg font-normal text-[#f0eae1]">Organiser Inspection</p>
              <p className="mt-1 text-[11px] text-[#9e8e7c]">Verified collaborator access</p>
            </div>

            <div className="rounded-xl border border-sand-border/20 bg-[#120d09]/70 p-4">
              <span className="font-mono text-[10px] text-[#8e7a68] uppercase">Phase 3</span>
              <p className="mt-1 font-serif text-lg font-normal text-[#f0eae1]">Public Reveal</p>
              <p className="mt-1 text-[11px] text-[#9e8e7c]">8:00 PM IST, 27 Dec</p>
            </div>

            <div className="rounded-xl border border-[#c89f6d]/40 bg-[#1e140d]/80 p-4">
              <span className="font-mono text-[10px] text-[#c89f6d] uppercase">Phase 4</span>
              <p className="mt-1 font-serif text-lg font-normal text-[#f0eae1]">Final Submission</p>
              <p className="mt-1 text-[11px] text-[#9e8e7c]">10:00 PM IST freeze</p>
            </div>
          </div>
        </div>

        {/* 7-Step Inspection Protocol */}
        <div className="mt-12">
          <h3 className="font-serif text-2xl font-normal text-[#f0eae1] mb-6">
            Mandatory Private Repository Inspection Workflow
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
            {inspectionSteps.map((st) => (
              <div
                key={st.num}
                className="flex flex-col justify-between rounded-xl border border-sand-border/15 bg-[#120d09]/40 p-4 backdrop-blur-xl"
              >
                <div>
                  <span className="grid h-6 w-6 place-items-center rounded bg-[#c89f6d]/15 font-mono text-xs font-semibold text-[#c89f6d]">
                    {st.num}
                  </span>
                  <h4 className="mt-3 font-serif text-base font-normal text-[#f0eae1] leading-snug">
                    {st.title}
                  </h4>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#9e8e7c]">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Access Warning Callout */}
        <div className="mt-8 rounded-2xl border border-amber-500/35 bg-[#1f1508]/60 p-6 backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-400">
              <AlertTriangle size={20} />
            </div>
            <div className="space-y-1.5 text-xs text-[#9e8e7c]">
              <h4 className="font-serif text-lg font-normal text-amber-200">
                Pending Collaborator Invitations Are Insufficient
              </h4>
              <p className="leading-relaxed">
                Every team leader must invite the official HyperLearningTech GitHub inspection account and confirm that the invitation is active and accepted before 9:00 PM IST on 26 December. If the invitation remains pending or unverified, your entry is considered incomplete and may be held from the official competition start list.
              </p>
              <p className="font-mono text-[11px] text-[#8e7a68]">
                Note: The official GitHub inspection username will be published to registered builders prior to registration closing. Organisers will never request passwords or personal access tokens.
              </p>
            </div>
          </div>
        </div>

        {/* Final Submission Requirements & Optional Video */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Submission Checklist */}
          <div className="rounded-2xl border border-sand-border/20 bg-[#120d09]/45 p-6 sm:p-7 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
                <FileCheck size={20} />
              </div>
              <div>
                <h4 className="font-serif text-2xl font-normal text-[#f0eae1]">
                  Final Submission Checklist
                </h4>
                <p className="font-mono text-[11px] text-[#8e7a68]">
                  Freeze strictly at 10:00 PM IST on 27 Dec
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {submissionChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 rounded-lg border border-sand-border/10 bg-[#16100c]/40 px-3.5 py-2.5 text-[#9e8e7c]"
                >
                  <CheckCircle2 size={15} className="shrink-0 text-[#c89f6d]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Video Guidelines */}
          <div className="flex flex-col justify-between rounded-2xl border border-sand-border/20 bg-[#120d09]/45 p-6 sm:p-7 backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
                  <Video size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-normal text-[#f0eae1]">
                    Demo Video (Recommended but Optional)
                  </h4>
                  <p className="font-mono text-[11px] text-[#8e7a68]">
                    3–5 minutes suggested · Unlisted YouTube / Google Drive
                  </p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-[#9e8e7c]">
                A video presentation is <strong className="text-[#f0eae1]">optional</strong> and not required to win. If submitted, keep it concise and grounded in your working build.
              </p>

              <div className="mt-5 space-y-2.5 rounded-xl border border-sand-border/15 bg-[#16100c]/60 p-4 font-mono text-xs">
                <p className="font-semibold text-[#c89f6d] uppercase tracking-wider text-[11px]">
                  Suggested Video Structure:
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#9e8e7c]">
                  <div>• Problem: 30 sec</div>
                  <div>• Solution: 45 sec</div>
                  <div>• Working Demo: ~2 min</div>
                  <div>• Tech Details: 45 sec</div>
                  <div className="col-span-2">• Next Steps: 30 sec</div>
                </div>
              </div>

              <p className="mt-4 text-xs text-[#8e7a68]">
                Judges evaluate working software, deployed sites, and code diffs on merit. Video production quality is not scored so solo builders are never disadvantaged.
              </p>
            </div>

            <div className="mt-6 border-t border-sand-border/15 pt-4">
              <span className="font-mono text-[11px] text-[#c89f6d]">
                Tip: Test video sharing permissions (anyone with link can view) before 10 PM.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
