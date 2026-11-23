import {
  CalendarDays,
  Clock,
  Flame,
  GitBranch,
  Eye,
  CheckCircle2,
  Trophy,
  CreditCard,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function ScheduleSection() {
  return (
    <section id="schedule" className="section-pad border-b border-sand-border/20 bg-cream-alt backdrop-blur-md">
      <div className="container-site">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Milestones & Timings</p>
            <h2 className="section-title">
              Event <span className="font-serif italic text-[#c89f6d]">Schedule</span>
            </h2>
            <p className="section-copy">
              All timings are strictly in <strong className="text-[#f0eae1] font-medium">Indian Standard Time (IST, UTC+5:30)</strong>. Understand the clear separation between the preparation phase and the official 24-hour build challenge.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-sand-border/25 bg-[#120d09]/60 px-4 py-2 font-mono text-xs text-[#8e7a68]">
            <Clock size={15} className="text-[#c89f6d]" />
            <span>Timezone: IST (UTC+5:30)</span>
          </div>
        </div>

        {/* 3 Chronological Phases */}
        <div className="mt-12 space-y-8">
          {/* PHASE 1: PREPARATION DAY (25 Dec) */}
          <div className="rounded-2xl border border-sand-border/20 bg-[#120d09]/40 p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border/15 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-sand-border/20 font-mono text-xs font-semibold text-[#f0eae1]">
                  01
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#f0eae1]">
                  25 December 2026 · Preparation Day
                </h3>
              </div>
              <span className="rounded-full border border-sand-border/30 bg-[#16100c]/80 px-3 py-0.5 font-mono text-[11px] uppercase tracking-wider text-[#8e7a68]">
                Setup Only · Not Scored as Sprint
              </span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-[#8e7a68]">
                <p className="font-mono text-xs text-[#c89f6d]">
                  Published Closing Time (Exact time TBA)
                </p>
                <h4 className="mt-1 font-serif text-lg font-normal text-[#f0eae1]">
                  Registration Closes & Squad Roster Lock
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#9e8e7c]">
                  All solo entries and squads must register their team and submit their project pitch deck before the deadline. Rosters freeze permanently.
                </p>
              </div>

              <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-[#8e7a68]">
                <p className="font-mono text-xs text-[#c89f6d]">
                  Throughout the Day
                </p>
                <h4 className="mt-1 font-serif text-lg font-normal text-[#f0eae1]">
                  Environment Configuration & Planning
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#9e8e7c]">
                  Install dependencies, create your private GitHub repository, plan architecture, and verify tools. Note: Pre-competition work does not earn sprint effort points.
                </p>
              </div>
            </div>
          </div>

          {/* PHASE 2: THE 24-HOUR COMPETITION SPRINT (26 Dec 10 PM -> 27 Dec 10 PM) */}
          <div className="relative rounded-2xl border-2 border-[#c89f6d]/50 bg-[#16100c]/65 p-6 sm:p-8 shadow-xl shadow-[#c89f6d]/5 backdrop-blur-xl">
            <div className="absolute -top-3.5 left-8 inline-flex items-center gap-1.5 rounded-full border border-[#c89f6d]/60 bg-[#0d0a08] px-3.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#c89f6d]">
              <Flame size={13} className="text-[#c89f6d] animate-pulse" />
              <span>The 24-Hour Active Build Sprint</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border/20 pb-4 pt-2">
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#c89f6d]/20 font-mono text-xs font-semibold text-[#c89f6d]">
                  02
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#f0eae1]">
                  26–27 December 2026 · Official Competition Window
                </h3>
              </div>
              <span className="rounded-full border border-[#c89f6d]/40 bg-[#c89f6d]/15 px-3 py-0.5 font-mono text-[11px] uppercase tracking-wider text-[#c89f6d] font-medium">
                24 Hours Continuous Development
              </span>
            </div>

            <div className="mt-6 space-y-6">
              {/* Kickoff Milestones */}
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-sand-border/15 bg-[#120d09]/50 p-4">
                  <span className="font-mono text-xs text-[#8e7a68]">26 Dec · Before 9:00 PM</span>
                  <h4 className="mt-1 font-serif text-base font-normal text-[#f0eae1]">
                    Collaborator Access Check
                  </h4>
                  <p className="mt-1 text-xs text-[#9e8e7c]">
                    Organisers verify registrations, squad rosters, and ensure the official GitHub inspection collaborator invitation is accepted.
                  </p>
                </div>

                <div className="rounded-xl border border-sand-border/15 bg-[#120d09]/50 p-4">
                  <span className="font-mono text-xs text-[#8e7a68]">26 Dec · 9:30 PM IST</span>
                  <h4 className="mt-1 font-serif text-base font-normal text-[#f0eae1]">
                    Official Final Briefing
                  </h4>
                  <p className="mt-1 text-xs text-[#9e8e7c]">
                    Live kickoff briefing covering rules, hourly checkpoints format, support channels, and repo inspection workflow.
                  </p>
                </div>

                <div className="rounded-xl border border-[#c89f6d]/30 bg-[#1c140d]/80 p-4">
                  <span className="font-mono text-xs font-semibold text-[#c89f6d]">26 Dec · 10:00 PM IST</span>
                  <h4 className="mt-1 font-serif text-base font-normal text-[#f0eae1]">
                    Competition Begins · Repo Snapshot
                  </h4>
                  <p className="mt-1 text-xs text-[#9e8e7c]">
                    Continuous build clock starts! Organisers record initial repository snapshot as the baseline for 24h work.
                  </p>
                </div>
              </div>

              {/* During the 24h & Reveal */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-sand-border/15 bg-[#120d09]/50 p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#c89f6d]">
                      26 Dec 10:00 PM – 27 Dec 10:00 PM
                    </span>
                    <span className="rounded-full bg-sand-border/15 px-2 py-0.5 font-mono text-[10px] text-[#8e7a68]">
                      Hourly Cadence
                    </span>
                  </div>
                  <h4 className="mt-2 font-serif text-lg font-normal text-[#f0eae1]">
                    Active Development & Hourly Checkpoints
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#9e8e7c]">
                    Participants write code, commit steadily, and log concise hourly updates (completed tasks, next goals, blockers, screenshot/diff evidence). Provisional leaderboard updates regularly.
                  </p>
                </div>

                <div className="rounded-xl border border-sand-border/15 bg-[#120d09]/50 p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#c89f6d]">
                      27 Dec · 8:00 PM IST
                    </span>
                    <span className="rounded-full bg-sand-border/15 px-2 py-0.5 font-mono text-[10px] text-[#8e7a68]">
                      2 Hours Before Deadline
                    </span>
                  </div>
                  <h4 className="mt-2 font-serif text-lg font-normal text-[#f0eae1]">
                    Planned Public Repository Reveal
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#9e8e7c]">
                    Team leaders are instructed to switch their repository visibility from private to public for transparent peer and judge inspection before the final polish.
                  </p>
                </div>
              </div>

              {/* Deadline */}
              <div className="rounded-xl border border-red-500/30 bg-[#200d0a]/40 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-red-400">
                    27 Dec · 10:00 PM IST · Hard Deadline
                  </span>
                  <span className="font-mono text-[11px] text-[#8e7a68]">
                    Strict Submission Freeze
                  </span>
                </div>
                <h4 className="mt-2 font-serif text-xl font-normal text-[#f0eae1]">
                  Competition Ends & Final Repository Snapshot Recorded
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#9e8e7c]">
                  All code pushes and dashboard submissions freeze. Organiser captures the final commit snapshot. No post-deadline commits or changes will be considered for competition scoring.
                </p>
              </div>
            </div>
          </div>

          {/* PHASE 3: EVALUATION & RESULTS (27 Dec 10:00 PM onwards) */}
          <div className="rounded-2xl border border-sand-border/20 bg-[#120d09]/40 p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border/15 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-sand-border/20 font-mono text-xs font-semibold text-[#f0eae1]">
                  03
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#f0eae1]">
                  27 December 2026 · Evaluation, Results & Prizes
                </h3>
              </div>
              <span className="rounded-full border border-sand-border/30 bg-[#16100c]/80 px-3 py-0.5 font-mono text-[11px] uppercase tracking-wider text-[#8e7a68]">
                Judging & Rapid Payouts
              </span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-[#8e7a68]">
                <p className="font-mono text-xs text-[#c89f6d]">
                  10:00 – 11:00 PM IST
                </p>
                <h4 className="mt-1 font-serif text-lg font-normal text-[#f0eae1]">
                  Judging & Code Verification
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#9e8e7c]">
                  Judges test live deployments, inspect repo diffs, review documentation, check disclosures, and lock final 100-point scores.
                </p>
              </div>

              <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-[#8e7a68]">
                <p className="font-mono text-xs text-[#c89f6d]">
                  11:00 PM IST (Target)
                </p>
                <h4 className="mt-1 font-serif text-lg font-normal text-[#f0eae1]">
                  Official Results Announcement
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#9e8e7c]">
                  Final leaderboard declared on the official platform and event channels: Overall Top 5, Category Winners, Top 25 Ranked, and Hidden Surprises.
                </p>
              </div>

              <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-[#c89f6d]">
                <p className="font-mono text-xs font-semibold text-[#c89f6d]">
                  By 11:05 PM IST (Target)
                </p>
                <h4 className="mt-1 font-serif text-lg font-normal text-[#f0eae1]">
                  Target Direct Prize Distribution
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#9e8e7c]">
                  Immediate electronic prize disbursement to verified solo winners and squad leaders (subject to payment-system availability).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Checkpoints Protocol Callout */}
        <div className="mt-8 rounded-2xl border border-sand-border/20 bg-[#16100c]/50 p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
                <GitBranch size={18} />
              </div>
              <div>
                <h4 className="font-serif text-xl font-normal text-[#f0eae1]">
                  Hourly Progress Checkpoints Protocol
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-[#9e8e7c]">
                  Participants submit a concise update via the dashboard: completed work, current status, next milestone, blockers, and evidence link/screenshot. Checkpoints are evidence of authentic progress, not a button-click scoring mechanism. Empty, copied, or repetitive updates do not earn points.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
