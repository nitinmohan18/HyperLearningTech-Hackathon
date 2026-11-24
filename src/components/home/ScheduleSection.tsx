import {
  Clock,
  Flame,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function ScheduleSection() {
  return (
    <section id="schedule" className="section-pad border-b border-white/[0.08] bg-cream-alt">
      <div className="container-site">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Milestones & Timings</p>
            <h2 className="section-title">
              Event <span className="font-serif italic text-[#e0b885]">Schedule</span>
            </h2>
            <p className="section-copy">
              All milestones operate strictly in <strong className="text-white font-medium">Indian Standard Time (IST, UTC+5:30)</strong>.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 font-mono text-xs text-[#b8ada0]">
            <Clock size={15} className="text-[#e0b885]" />
            <span>IST (UTC+5:30)</span>
          </div>
        </div>

        {/* 3 Chronological Timeline Phases - Clean Borderless Layout */}
        <div className="mt-14 space-y-12">
          {/* PHASE 1: PREPARATION DAY (25 Dec) */}
          <div className="border-t border-white/[0.08] pt-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-[#e0b885]">PHASE 01</span>
                <span className="text-white/20">/</span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  25 December 2026 · Preparation Day
                </h3>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#b8ada0]">
                Setup & Architecture Planning
              </span>
            </div>

            <div className="grid gap-8 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
              <div className="pt-4 md:pt-0">
                <span className="font-mono text-xs text-[#e0b885]">Closing Time TBA</span>
                <h4 className="mt-1 font-serif text-lg font-normal text-white">
                  Registration Deadline & Roster Lock
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  All entries must finalize their registration, project pitch deck, and squad members before the closing deadline.
                </p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-8">
                <span className="font-mono text-xs text-[#e0b885]">Throughout the Day</span>
                <h4 className="mt-1 font-serif text-lg font-normal text-white">
                  Tooling Setup & Private Repo Creation
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  Install dependencies, create your private Git repository, and invite the organiser inspection account.
                </p>
              </div>
            </div>
          </div>

          {/* PHASE 2: THE 24-HOUR COMPETITION SPRINT (26 Dec 10 PM -> 27 Dec 10 PM) */}
          <div className="border-t border-white/[0.08] pt-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <Flame size={18} className="text-[#e0b885]" />
                <span className="font-mono text-xs font-semibold text-[#e0b885]">PHASE 02</span>
                <span className="text-white/20">/</span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  26–27 December 2026 · The 24-Hour Build Sprint
                </h3>
              </div>
              <span className="font-mono text-xs font-medium text-[#e0b885]">
                24 Hours Continuous Development (10 PM to 10 PM IST)
              </span>
            </div>

            {/* Kickoff Milestones */}
            <div className="grid gap-6 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
              <div className="pt-4 md:pt-0">
                <span className="font-mono text-xs text-[#b8ada0]">26 Dec · Before 9:00 PM</span>
                <h4 className="mt-1 font-serif text-base font-normal text-white">
                  Collaborator Access Check
                </h4>
                <p className="mt-1.5 text-xs text-[#d6cec2]">
                  Verification that GitHub collaborator invitations are accepted and active.
                </p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-6">
                <span className="font-mono text-xs text-[#b8ada0]">26 Dec · 9:30 PM IST</span>
                <h4 className="mt-1 font-serif text-base font-normal text-white">
                  Official Final Briefing
                </h4>
                <p className="mt-1.5 text-xs text-[#d6cec2]">
                  Final operational briefing outlining checkpoint guidelines and evaluation criteria.
                </p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-6">
                <span className="font-mono text-xs font-semibold text-[#e0b885]">26 Dec · 10:00 PM IST</span>
                <h4 className="mt-1 font-serif text-base font-normal text-white">
                  Competition Kickoff
                </h4>
                <p className="mt-1.5 text-xs text-[#d6cec2]">
                  Continuous timer begins. Initial snapshot recorded as the baseline for 24h work.
                </p>
              </div>
            </div>

            {/* During the 24h & Reveal */}
            <div className="mt-8 grid gap-8 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-t border-white/[0.08] pt-6">
              <div className="pt-4 md:pt-0">
                <span className="font-mono text-xs text-[#e0b885]">
                  26 Dec 10:00 PM – 27 Dec 10:00 PM
                </span>
                <h4 className="mt-1 font-serif text-lg font-normal text-white">
                  Active Build & Hourly Progress Checkpoints
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  Develop your MVP, commit steadily, and log concise hourly updates to verify genuine engineering effort.
                </p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-8">
                <span className="font-mono text-xs text-[#e0b885]">
                  27 Dec · 8:00 PM IST
                </span>
                <h4 className="mt-1 font-serif text-lg font-normal text-white">
                  Public Repository Reveal
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  Switch repository visibility to public for transparent inspection before final code freeze.
                </p>
              </div>
            </div>
          </div>

          {/* PHASE 3: EVALUATION & RESULTS */}
          <div className="border-t border-white/[0.08] pt-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-[#e0b885]">PHASE 03</span>
                <span className="text-white/20">/</span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  27 December 2026 · Submission Freeze & Judging
                </h3>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#b8ada0]">
                10:00 PM IST Code Freeze
              </span>
            </div>

            <div className="grid gap-8 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
              <div className="pt-4 md:pt-0">
                <span className="font-mono text-xs font-semibold text-[#e0b885]">27 Dec · 10:00 PM IST</span>
                <h4 className="mt-1 font-serif text-lg font-normal text-white">
                  Code Freeze & Final Snapshot
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  Development window ends. Final snapshot taken; commits after this mark are excluded from scoring.
                </p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-8">
                <span className="font-mono text-xs text-[#e0b885]">27 Dec · 11:00 PM IST</span>
                <h4 className="mt-1 font-serif text-lg font-normal text-white">
                  Results & Winner Announcement
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  Final scores published on the verified leaderboard and prize distribution initiated.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/schedule"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#e0b885] hover:text-white transition-colors"
          >
            Detailed Schedule Breakdown <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
