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

        {/* 3 Chronological Timeline Phases */}
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
                  Tooling Setup & Dedicated Repo Creation
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  Install dependencies, create your dedicated Git repository (public or private), and ensure organiser access is ready.
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
                  Organiser Access Verification
                </h4>
                <p className="mt-1.5 text-xs text-[#d6cec2]">
                  Verification that official HyperLearningTech collaborator access is active for evaluation.
                </p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-6">
                <span className="font-mono text-xs text-[#b8ada0]">26 Dec · 9:30 PM IST</span>
                <h4 className="mt-1 font-serif text-base font-normal text-white">
                  Official Final Briefing
                </h4>
                <p className="mt-1.5 text-xs text-[#d6cec2]">
                  Final operational briefing outlining documentation requirements and evaluation procedures.
                </p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-6">
                <span className="font-mono text-xs font-semibold text-[#e0b885]">26 Dec · 10:00 PM IST</span>
                <h4 className="mt-1 font-serif text-base font-normal text-white">
                  Competition Kickoff
                </h4>
                <p className="mt-1.5 text-xs text-[#d6cec2]">
                  24-hour sprint begins. First commit must include initial README before development starts.
                </p>
              </div>
            </div>

            {/* Development Journey */}
            <div className="mt-8 border-t border-white/[0.08] pt-6">
              <span className="font-mono text-xs text-[#e0b885]">
                26 Dec 10:00 PM – 27 Dec 10:00 PM IST
              </span>
              <h4 className="mt-1 font-serif text-lg font-normal text-white">
                Recommended 24-Hour Development Journey
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                Hour 0–2: Kickoff, problem selection & initial README • Hour 2–8: Core solution engineering • Hour 8–16: Feature integration • Hour 16–20: Testing & debugging • Hour 20–23: Documentation & demo prep • Hour 23–24: Final submission.
              </p>
            </div>
          </div>

          {/* PHASE 3: EVALUATION & RESULTS */}
          <div className="border-t border-white/[0.08] pt-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-[#e0b885]">PHASE 03</span>
                <span className="text-white/20">/</span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  27 December 2026 · Submission Freeze, Evaluation & Results
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
                  Code Freeze & Final Submission
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  Development window closes. Final commit and updated README are frozen for evaluation. No post-deadline commits are scored.
                </p>
              </div>

              <div className="pt-4 md:pt-0 md:pl-8">
                <span className="font-mono text-xs text-[#e0b885]">Post-Freeze · Three-Stage Assessment</span>
                <h4 className="mt-1 font-serif text-lg font-normal text-white">
                  Top 25 Live Finals & Results
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">
                  Stage 1 compliance check, Stage 2 100-point rubric shortlisting, and Stage 3 Top 25 live Google Meet presentations (5–7 min/team). Results follow final judging, with UPI prize distribution within 2–4 hours.
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
