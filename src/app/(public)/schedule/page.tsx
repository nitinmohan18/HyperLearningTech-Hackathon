import Link from "next/link";
import { event } from "@/data/event";
import {
  ArrowRight,
  Calendar,
  Flame,
  GitCommit,
  CheckSquare,
  Scale,
  Trophy,
  CreditCard,
  Video,
  FileCheck,
} from "lucide-react";

export default function SchedulePage() {
  const milestones = [
    {
      time: "25 Dec 2026 · Published Closing Time (TBA)",
      phase: "Preparation Day",
      icon: Calendar,
      title: "Registration Closes & Squad Roster Lock",
      copy: "Final registrations accepted until the published closing time. All squad entries (1–4 members) and leaders are permanently locked.",
    },
    {
      time: "25 Dec 2026 · Throughout Day",
      phase: "Preparation Day",
      icon: Calendar,
      title: "Environment Setup & Architecture Planning",
      copy: "Install dependencies, configure local environments, create dedicated Git repository (public or private), and conduct initial conceptual planning.",
    },
    {
      time: "26 Dec 2026 · Before 9:00 PM IST",
      phase: "Preparation",
      icon: FileCheck,
      title: "Organiser Repository Access Verification",
      copy: "Organisers verify registered entries and ensure the official HyperLearningTech GitHub inspection account has verified access for evaluation.",
    },
    {
      time: "26 Dec 2026 · 9:30 PM IST",
      phase: "Briefing",
      icon: Flame,
      title: "Official Final Briefing",
      copy: "Live participant briefing on rules, documentation requirements, 100-point judging rubric, repository inspection procedures, and support channels.",
    },
    {
      time: "26 Dec 2026 · 10:00 PM IST",
      phase: "Official Kickoff",
      icon: Flame,
      title: "24-Hour Competition Kickoff",
      copy: "The continuous build clock starts. The first meaningful commit must contain initial README documentation before project application development begins.",
    },
    {
      time: "26–27 Dec 2026 · 24-Hour Window",
      phase: "Sprint Journey",
      icon: GitCommit,
      title: "Recommended Development Journey",
      copy: "Hour 0–2: Kickoff & initial README • Hour 2–8: Core solution development • Hour 8–16: Feature integration • Hour 16–20: Testing & debugging • Hour 20–23: Documentation & demo prep • Hour 23–24: Final submission.",
    },
    {
      time: "27 Dec 2026 · 10:00 PM IST",
      phase: "Hard Deadline",
      icon: CheckSquare,
      title: "Competition Ends · Final Submission Freeze",
      copy: "All development freezes strictly at 10:00 PM IST. Final repository commit and updated README are locked for evaluation. Commits after this deadline are excluded from scoring.",
    },
    {
      time: "Post-Freeze · Assessment",
      phase: "Stage 1 & 2",
      icon: Scale,
      title: "Compliance Verification & 100-Point Evaluation",
      copy: "Stage 1 verifies registration, repo access, README, and deadlines. Stage 2 evaluates projects against the official 100-point rubric to shortlist the top 25 eligible teams.",
    },
    {
      time: "Live Session · Top 25",
      phase: "Stage 3",
      icon: Video,
      title: "Top 25 Live Final Round (Google Meet)",
      copy: "Shortlisted teams present live via Google Meet in a 5–7 minute session per team (explaining problem, demonstrating solution, detailing implementation, and answering jury questions).",
    },
    {
      time: "Following Final Judging",
      phase: "Ceremony",
      icon: Trophy,
      title: "Official Results Declaration",
      copy: "Official results declared following completion of final judging, revealing Overall Champions, Category Pioneers, and Top 25 certified projects.",
    },
    {
      time: "Within 2–4 Hours Post-Results",
      phase: "Disbursement",
      icon: CreditCard,
      title: "Direct UPI Prize Distribution",
      copy: "Prize money transferred through UPI within 2–4 hours after the official result announcement, subject to winner verification and successful payment processing.",
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
            All times operate strictly in Indian Standard Time (IST, UTC+5:30). Plan your build schedule, documentation cadence, and final submission accordingly.
          </p>
        </div>

        {/* Unified Timeline Container */}
        <div className="mt-14 rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-6 backdrop-blur-xl sm:p-10">
          <div className="relative space-y-8 before:absolute before:bottom-3 before:left-5 before:top-3 before:w-px before:bg-sand-border/20 sm:before:left-6">
            {milestones.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="relative flex items-start gap-5 sm:gap-6">
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
