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
    <section id="schedule" className="section-pad border-b border-sand-border/20 bg-cream-alt">
      <div className="container-site">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Milestones & Timings</p>
            <h2 className="section-title">
              Event <span className="font-serif italic text-[#e0b885]">Schedule</span>
            </h2>
            <p className="section-copy">
              All timings are strictly in <strong className="text-white font-medium">Indian Standard Time (IST, UTC+5:30)</strong>. Understand the clear separation between the preparation phase and the official 24-hour build challenge.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 font-mono text-xs text-[#b8ada0]">
            <Clock size={15} className="text-[#e0b885]" />
            <span>Timezone: IST (UTC+5:30)</span>
          </div>
        </div>

        {/* 3 Chronological Timeline Phases */}
        <div className="mt-14 space-y-12">
          {/* PHASE 1: PREPARATION DAY (25 Dec) */}
          <div className="border-t border-white/[0.08] pt-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-[#e0b885]">PHASE 01</span>
                <span className="text-white/30">/</span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  25 December 2026 · Preparation Day
                </h3>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#b8ada0]">
                Environment Setup · Not Scored as Sprint
              </span>
            </div>

            <div className="grid gap-8 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
              <div className="pt-4 md:pt-0">
                <span className="font-mono text-xs text-[#e0b885]">Published Closing Time (Exact time TBA)</span>
                <h4 className="mt-1 font-serif text-lg font-normal text-white">
                  Registration Closes & Squad Roster Lock
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  All solo entries and squads must register their team and submit their project pitch deck before the deadline. Rosters freeze permanently.
                </p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-8">
                <span className="font-mono text-xs text-[#e0b885]">Throughout the Day</span>
                <h4 className="mt-1 font-serif text-lg font-normal text-white">
                  Environment Configuration & Planning
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  Install dependencies, create your private GitHub repository, plan architecture, and verify tools. Note: Pre-competition work does not earn sprint effort points.
                </p>
              </div>
            </div>
          </div>

          {/* PHASE 2: THE 24-HOUR COMPETITION SPRINT (26 Dec 10 PM -> 27 Dec 10 PM) */}
          <div className="rounded-2xl border border-[#e0b885]/30 bg-white/[0.02] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
              <div className="flex items-center gap-3">
                <Flame size={18} className="text-[#e0b885]" />
                <span className="font-mono text-xs font-semibold text-[#e0b885]">PHASE 02</span>
                <span className="text-white/30">/</span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  26–27 December 2026 · The 24-Hour Build Sprint
                </h3>
              </div>
              <span className="font-mono text-xs font-medium text-[#e0b885]">
                24 Hours Continuous Development (10 PM to 10 PM IST)
              </span>
            </div>

            <div className="mt-8 space-y-6">
              {/* Kickoff Milestones */}
              <div className="grid gap-6 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
                <div className="pt-4 md:pt-0">
                  <span className="font-mono text-xs text-[#b8ada0]">26 Dec · Before 9:00 PM</span>
                  <h4 className="mt-1 font-serif text-base font-normal text-white">
                    Collaborator Access Check
                  </h4>
                  <p className="mt-1.5 text-xs text-[#d6cec2]">
                    Organisers verify registrations, squad rosters, and ensure the official GitHub inspection collaborator invitation is accepted.
                  </p>
                </div>

                <div className="pt-4 md:pt-0 md:pl-6">
                  <span className="font-mono text-xs text-[#b8ada0]">26 Dec · 9:30 PM IST</span>
                  <h4 className="mt-1 font-serif text-base font-normal text-white">
                    Official Final Briefing
                  </h4>
                  <p className="mt-1.5 text-xs text-[#d6cec2]">
                    Live kickoff briefing covering rules, hourly checkpoints format, support channels, and repo inspection workflow.
                  </p>
                </div>

                <div className="pt-4 md:pt-0 md:pl-6">
                  <span className="font-mono text-xs font-semibold text-[#e0b885]">26 Dec · 10:00 PM IST</span>
                  <h4 className="mt-1 font-serif text-base font-normal text-white">
                    Competition Begins · Repo Snapshot
                  </h4>
                  <p className="mt-1.5 text-xs text-[#d6cec2]">
                    Continuous build clock starts! Organisers record initial repository snapshot as the baseline for 24h work.
                  </p>
                </div>
              </div>

              {/* During the 24h & Reveal */}
              <div className="grid gap-6 md:grid-cols-2 border-t border-white/[0.08] pt-6">
                <div>
                  <span className="font-mono text-xs text-[#e0b885]">
                    26 Dec 10:00 PM – 27 Dec 10:00 PM
                  </span>
                  <h4 className="mt-1 font-serif text-lg font-normal text-white">
                    Active Development & Hourly Checkpoints
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                    Participants write code, commit steadily, and log concise hourly updates (completed tasks, next goals, blockers, screenshot/diff evidence). Provisional leaderboard updates regularly.
                  </p>
                </div>

                <div>
                  <span className="font-mono text-xs text-[#e0b885]">
                    27 Dec · 8:00 PM IST
                  </span>
                  <h4 className="mt-1 font-serif text-lg font-normal text-white">
                    Planned Public Repository Reveal
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                    Team leaders are instructed to switch their repository visibility from private to public for transparent peer and judge inspection before the final polish.
                  </p>
                </div>
              </div>

              {/* Deadline */}
              <div className="border-t border-white/[0.08] pt-5">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-red-300">
                  27 Dec · 10:00 PM IST · Hard Deadline & Submission Freeze
                </span>
                <p className="mt-1 text-xs leading-relaxed text-[#d6cec2]">
                  All code pushes and dashboard submissions freeze. Organisers record the final repository snapshot. No post-deadline commits or changes will be considered for competition scoring.
                </p>
              </div>
            </div>
          </div>

          {/* PHASE 3: EVALUATION & RESULTS (27 Dec 10:00 PM onwards) */}
          <div className="border-t border-white/[0.08] pt-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-[#e0b885]">PHASE 03</span>
                <span className="text-white/30">/</span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  27 December 2026 · Evaluation, Results & Prizes
                </h3>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#b8ada0]">
                Judging & Rapid Payouts
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
              <div className="pt-4 md:pt-0">
                <span className="font-mono text-xs text-[#e0b885]">10:00 – 11:00 PM IST</span>
                <h4 className="mt-1 font-serif text-lg font-normal text-white">
                  Judging & Code Verification
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  Judges test live deployments, inspect repo diffs, review documentation, check disclosures, and lock final 100-point scores.
                </p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-6">
                <span className="font-mono text-xs text-[#e0b885]">11:00 PM IST (Target)</span>
                <h4 className="mt-1 font-serif text-lg font-normal text-white">
                  Official Results Announcement
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  Final leaderboard declared on the official platform and event channels: Overall Top 5, Category Winners, Top 25 Ranked, and Hidden Surprises.
                </p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-6">
                <span className="font-mono text-xs font-semibold text-[#e0b885]">By 11:05 PM IST (Target)</span>
                <h4 className="mt-1 font-serif text-lg font-normal text-white">
                  Target Direct Prize Distribution
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  Immediate electronic prize disbursement to verified solo winners and squad leaders (subject to payment-system availability).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Checkpoints Protocol Callout */}
        <div className="mt-12 border-l-2 border-[#e0b885] bg-white/[0.02] p-5 text-xs text-[#d6cec2]">
          <div className="flex items-start gap-3">
            <GitBranch size={18} className="text-[#e0b885] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-lg font-normal text-white">
                Hourly Progress Checkpoints Protocol
              </h4>
              <p className="mt-1 leading-relaxed">
                Participants submit a concise update via the dashboard: completed work, current status, next milestone, blockers, and evidence link/screenshot. Checkpoints are evidence of authentic progress, not a button-click scoring mechanism. Empty, copied, or repetitive updates do not earn points.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
