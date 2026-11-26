import Link from "next/link";
import { event } from "@/data/event";
import {
  ArrowRight,
  Calendar,
  Flame,
  GitCommit,
  Eye,
  CheckSquare,
  Scale,
  Trophy,
  CreditCard,
} from "lucide-react";

export default function SchedulePage() {
  const milestones = [
    {
      time: "25 Dec 2026 · Published Closing Time (TBA)",
      phase: "Preparation Day",
      icon: Calendar,
      title: "Registration Closes & Squad Roster Lock",
      copy: "Final registrations accepted until the published closing time. Repository guidance and collaboration checklists released to registered builders.",
    },
    {
      time: "25 Dec 2026 · Throughout Day",
      phase: "Preparation Day",
      icon: Calendar,
      title: "Environment Setup & Architecture Planning",
      copy: "Install dependencies, configure local environments, create private Git repositories, and invite the organiser inspection collaborator (non-competition period).",
    },
    {
      time: "26 Dec 2026 · 9:30 PM IST",
      phase: "Briefing",
      icon: Flame,
      title: "Official Final Briefing",
      copy: "Live participant briefing on rules, checkpoint formats, judging rubric, repository inspection procedures, and support communication channels.",
    },
    {
      time: "26 Dec 2026 · 10:00 PM IST",
      phase: "Official Kickoff",
      icon: Flame,
      title: "24-Hour Competition Sprint Begins",
      copy: "The continuous build clock starts. Organisers take the initial private repository snapshot and kickoff confirmation is locked.",
    },
    {
      time: "Hourly · Continuous Cadence",
      phase: "Sprint Tracking",
      icon: GitCommit,
      title: "Hourly Checkpoint Submissions",
      copy: "Participants submit short milestone progress notes, blockers, and git commit hashes via the dashboard to maintain inspectable development evidence.",
    },
    {
      time: "27 Dec 2026 · 8:00 PM IST",
      phase: "Transparency Reveal",
      icon: Eye,
      title: "Repository Public Reveal",
      copy: "All private hackathon repositories flip to public visibility. Final pushes, documentation, and polish commence for the final two sprint hours.",
    },
    {
      time: "27 Dec 2026 · 10:00 PM IST",
      phase: "Hard Deadline",
      icon: CheckSquare,
      title: "Final Submission Window Closes",
      copy: "Final git commit snapshot recorded. All deployment URLs, presentation decks/demos, and team declarations must be submitted.",
    },
    {
      time: "27 Dec 2026 · 10:00–11:00 PM IST",
      phase: "Evaluation",
      icon: Scale,
      title: "Judging & Verification Review",
      copy: "Judges review functionality, technical execution, UI/UX, and commit histories to determine category winners and final Top 25 rankings.",
    },
    {
      time: "27 Dec 2026 · 11:00 PM IST",
      phase: "Ceremony",
      icon: Trophy,
      title: "Official Results Declaration",
      copy: "The official leaderboard is declared on the platform, announcing category winners and Top 25 certified projects.",
    },
    {
      time: "27 Dec 2026 · by 11:05 PM IST",
      phase: "Disbursement",
      icon: CreditCard,
      title: "Prize Distribution & Transfers",
      copy: "Target window for immediate prize transfers and electronic certificate generation initiation.",
    },
  ];

  return (
    <div className="bg-cream">
      <div className="container-site section-pad">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
            IST Timeline
          </p>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#f0eae1]">
            The complete 24-hour <br />
            <span className="font-serif italic font-normal text-[#c89f6d]">
              event timeline.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9e8e7c] sm:text-lg">
            All times are specified in Indian Standard Time (IST, UTC+5:30). Plan your build schedule, sleep intervals, and submission cadence accordingly.
          </p>
        </div>

        {/* Unified Timeline Container */}
        <div className="mt-14 rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-6 backdrop-blur-xl sm:p-10">
          <div className="relative space-y-8 before:absolute before:bottom-3 before:left-5 before:top-3 before:w-px before:bg-sand-border/20 sm:before:left-6">
            {milestones.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.time} className="relative flex items-start gap-5 sm:gap-6">
                  {/* Icon Node */}
                  <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-sand-border/30 bg-[#16100c] text-[#c89f6d] shadow-sm sm:h-12 sm:w-12">
                    <Icon size={18} />
                  </div>

                  {/* Content Block */}
                  <div className="flex-1 pb-4">
                    <div className="flex flex-wrap items-baseline gap-2.5">
                      <span className="font-mono text-xs font-semibold text-[#c89f6d]">
                        {item.time}
                      </span>
                      <span className="font-mono text-[11px] text-[#8e7a68]">
                        · {item.phase}
                      </span>
                    </div>

                    <h2 className="mt-1.5 font-serif text-2xl font-normal text-[#f0eae1]">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#9e8e7c] max-w-2xl">
                      {item.copy}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Callout */}
        <div className="mt-12 rounded-2xl border border-sand-border/20 bg-[#16100c]/40 p-7 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-serif text-xl font-normal text-[#f0eae1]">
                Ready to sync your schedule?
              </h3>
              <p className="mt-1 text-sm text-[#9e8e7c]">
                Review the submission checklist or secure your participation spot before 25 December.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link href="/rules" className="btn-secondary">
                View Rules
              </Link>
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Register for Hackathon <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
