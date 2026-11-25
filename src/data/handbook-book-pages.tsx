import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Flame, ShieldAlert, CheckCircle2, Trophy, GitBranch, AlertTriangle } from 'lucide-react';
import type { BookPage } from '@/components/core/interactive-book';
import { judgingCriteria } from '@/data/judging';
import { rulesData } from '@/data/rules';

export interface HandbookBookDeck {
  id: string;
  title: string;
  author: string;
  pages: BookPage[];
  innerCoverContent: (jumpToPage: (sheetIdx: number, printedPage?: number) => void) => React.ReactNode;
  coverNode: React.ReactNode;
  backCoverContent: React.ReactNode;
}

function TocItem({
  pageNum,
  title,
  meta,
  onClick,
}: {
  pageNum: string;
  title: string;
  meta?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="group flex w-full items-center justify-between border-b border-[#e8decb] py-1.5 text-left transition-colors hover:border-[#b7894c]"
    >
      <div className="min-w-0 pr-2">
        <span className="font-mono text-[10px] font-semibold text-[#8a6539] mr-2">{pageNum}</span>
        <span className="font-serif text-[14px] font-medium text-[#241910] group-hover:text-[#7c4d19]">
          {title}
        </span>
      </div>
      {meta && (
        <span className="shrink-0 font-mono text-[10px] text-[#7c6a56] group-hover:text-[#8a6539]">
          {meta}
        </span>
      )}
    </button>
  );
}

function MilestoneCard({
  time,
  badge,
  title,
  desc,
  highlight = false,
}: {
  time: string;
  badge?: string;
  title: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3 ${
        highlight
          ? 'border-[#cfa468]/60 bg-[#f6ebd8]/80'
          : 'border-[#e4d7c1] bg-[#faf5ea]/75'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <span className="font-mono text-[10px] font-semibold text-[#8a5d26]">{time}</span>
        {badge && (
          <span className="rounded-full border border-[#d6be9a] bg-white/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#6e5230]">
            {badge}
          </span>
        )}
      </div>
      <h4 className="mt-1 font-serif text-[15px] font-semibold text-[#1e150e]">{title}</h4>
      <p className="mt-1 text-[11.5px] leading-relaxed text-[#4f3e2e]">{desc}</p>
    </div>
  );
}

function RulePageContent({ groupIndex }: { groupIndex: number }) {
  const group = rulesData[groupIndex];
  return (
    <div className="space-y-2.5">
      <p className="border-l-2 border-[#c89f6d] pl-2.5 text-[12px] italic text-[#5c4835]">
        {group.summary}
      </p>
      <div className="space-y-2">
        {group.rules.map((rule, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-[#e4d7c1] bg-[#faf5ea]/80 p-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-serif text-[14px] font-semibold text-[#1e150e]">
                {rule.title}
              </h4>
              {rule.tag && (
                <span className="shrink-0 rounded-full border border-[#d6be9a] bg-white/90 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#8a5d26]">
                  {rule.tag}
                </span>
              )}
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-[#4a3a2c]">{rule.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CriterionPageContent({
  criterionIndex,
  extraNote,
}: {
  criterionIndex: number;
  extraNote?: string;
}) {
  const c = judgingCriteria[criterionIndex];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded-lg border border-[#cfa468]/50 bg-[#f6ebd8]/80 px-3.5 py-2.5">
        <div>
          <p className="font-mono text-[9.5px] uppercase tracking-wider text-[#7c5c38]">
            Rubric Weight
          </p>
          <p className="font-serif text-lg font-semibold text-[#1e150e]">{c.name}</p>
        </div>
        <div className="text-right shrink-0 pl-2">
          <span className="font-serif text-2xl font-bold text-[#8a5d26]">{c.points}</span>
          <span className="ml-1 font-mono text-[11px] text-[#6e5230]">pts</span>
        </div>
      </div>

      <div className="rounded-lg border border-[#e4d7c1] bg-white/75 p-3">
        <p className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#8a6539]">
          What Judges Evaluate
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-[#33261b]">{c.evaluates}</p>
      </div>

      <div className="space-y-1.5">
        <p className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#8a6539]">
          Evaluation Breakdown
        </p>
        {c.details.map((detail, idx) => (
          <div key={idx} className="flex items-start gap-2 text-[11.5px] leading-relaxed text-[#463628]">
            <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[#9c6f34]" />
            <span>{detail}</span>
          </div>
        ))}
      </div>

      {c.subBreakdown && (
        <div className="rounded-lg border border-[#e4d7c1] bg-[#faf5ea]/85 p-2.5 space-y-1.5">
          <p className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#8a5d26]">
            Effort Sub-Allocation (25 pts)
          </p>
          {c.subBreakdown.map((sub) => (
            <div key={sub.item} className="flex items-baseline justify-between gap-2 text-[11px] border-b border-[#ece0cc] last:border-0 pb-1 last:pb-0">
              <span className="font-medium text-[#281c12]">{sub.item}</span>
              <span className="font-mono font-semibold text-[#8a5d26] shrink-0">{sub.points} pts</span>
            </div>
          ))}
        </div>
      )}

      {extraNote && (
        <p className="rounded-md bg-[#f5ecdc] px-3 py-2 text-[11px] text-[#594430]">
          {extraNote}
        </p>
      )}
    </div>
  );
}

function CoverPlate({
  vol,
  eyebrow,
  titleLine1,
  titleLine2,
  footer,
  bgClass,
  accentColor,
}: {
  vol: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  footer: string;
  bgClass: string;
  accentColor: string;
}) {
  return (
    <div className={`relative flex h-full w-full flex-col justify-between p-8 text-center ${bgClass}`}>
      <div className="pointer-events-none absolute inset-4 border border-[#e0b885]/35" />
      <div className="pointer-events-none absolute inset-6 border border-[#e0b885]/15" />

      <div className="relative z-10 pt-2">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: accentColor }}>
          {vol} · WINTER HACKATHON &rsquo;26
        </p>
        <div className="mx-auto my-2.5 h-px w-24 opacity-40" style={{ backgroundColor: accentColor }} />
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e8dfd3]/75">{eyebrow}</p>
      </div>

      <div className="relative z-10 my-auto">
        <h2 className="font-serif text-4xl font-normal leading-[1.08] text-[#f5efe5]">
          {titleLine1}
          <span className="block italic" style={{ color: accentColor }}>
            {titleLine2}
          </span>
        </h2>
      </div>

      <div className="relative z-10 pb-2">
        <div className="mx-auto mb-3 h-px w-32 opacity-30" style={{ backgroundColor: accentColor }} />
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d6cec2]">{footer}</p>
      </div>
    </div>
  );
}

function VolumeBackCover({
  ctaHref,
  ctaLabel,
}: {
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-3 grid h-11 w-11 place-items-center rounded-full border border-[#d6be9a] bg-white text-[#8a5d26] shadow-sm">
        <Trophy size={18} />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a6539]">
        End of Volume
      </p>
      <h4 className="mt-1 font-serif text-2xl font-medium text-[#1e150e]">
        Ready to Build?
      </h4>
      <p className="mt-2 max-w-[26ch] text-xs leading-relaxed text-[#5a4735]">
        Lock your registration before 25 Dec 2026 and ship an inspectable 24-hour MVP.
      </p>
      <div className="mt-5 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#cbb697] bg-white px-4 py-2 font-mono text-[11px] font-medium text-[#2c1f14] hover:bg-[#faf5eb]"
        >
          {ctaLabel} <ArrowRight size={12} />
        </Link>
        <Link
          href="/register"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1e140d] px-5 py-2 font-mono text-[11px] font-semibold text-[#f5efe5] hover:bg-[#322116]"
        >
          Register Now <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

export const handbookBookDecks: Record<string, HandbookBookDeck> = {
  schedule: {
    id: 'schedule',
    title: 'Event Schedule',
    author: 'Phase 01 – 03 · IST',
    coverNode: (
      <CoverPlate
        vol="VOLUME I"
        eyebrow="Milestones & Timings"
        titleLine1="Event"
        titleLine2="Schedule"
        footer="25–27 Dec 2026 · IST (UTC+5:30)"
        bgClass="bg-gradient-to-br from-[#21150d] via-[#170f09] to-[#110a06]"
        accentColor="#e0b885"
      />
    ),
    innerCoverContent: (jumpToPage) => (
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6539]">
            Milestones & Timings · Vol I
          </p>
          <h2 className="mt-1 font-serif text-3xl font-semibold text-[#1e150e]">
            Event <span className="italic text-[#8a5d26]">Schedule</span>
          </h2>
          <p className="mt-1.5 text-[12px] leading-relaxed text-[#574534]">
            All milestones operate strictly in <strong className="text-[#1e150e]">Indian Standard Time (IST, UTC+5:30)</strong>.
          </p>

          <div className="mt-4">
            <p className="mb-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#8a6539]">
              Page Index (Click to Jump)
            </p>
            <TocItem pageNum="P.01" title="Overview & IST Chronology" meta="Intro" onClick={() => jumpToPage(-1, 1)} />
            <TocItem pageNum="P.02" title="Phase 01 · Preparation Day" meta="25 Dec" onClick={() => jumpToPage(0, 2)} />
            <TocItem pageNum="P.03" title="Phase 02 · Kickoff Sequence" meta="26 Dec" onClick={() => jumpToPage(0, 3)} />
            <TocItem pageNum="P.04" title="Phase 02 · Build & Reveal" meta="26–27 Dec" onClick={() => jumpToPage(1, 4)} />
            <TocItem pageNum="P.05" title="Phase 03 · Freeze & Judging" meta="27 Dec" onClick={() => jumpToPage(1, 5)} />
            <TocItem pageNum="P.06" title="Phase 03 · Results & Prizes" meta="11:00 PM" onClick={() => jumpToPage(2, 6)} />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#e8decb] pt-2.5">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#6d5943]">
            <Clock size={12} className="text-[#8a5d26]" /> IST (UTC+5:30)
          </span>
          <Link
            href="/schedule"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8a5d26] hover:underline"
          >
            Full Breakdown <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    ),
    backCoverContent: <VolumeBackCover ctaHref="/schedule" ctaLabel="Detailed Schedule Page" />,
    pages: [
      {
        pageNumber: 1,
        subtitle: 'Overview · IST (UTC+5:30)',
        title: '3-Phase Timeline',
        content: (
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-lg border border-[#d9c4a3] bg-[#f7efe0] px-3 py-2 text-[11.5px] text-[#453425]">
              <Clock size={14} className="shrink-0 text-[#8a5d26]" />
              <span>
                All milestones run strictly in <strong>IST (UTC+5:30)</strong>.
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="rounded-lg border border-[#e4d7c1] bg-[#faf5ea] p-3">
                <span className="font-mono text-[10px] font-semibold text-[#8a5d26]">PHASE 01 · 25 DEC</span>
                <h4 className="font-serif text-[15px] font-semibold text-[#1e150e]">Preparation Day</h4>
                <p className="mt-0.5 text-[11.5px] text-[#534232]">
                  Roster lock, tooling setup &amp; private GitHub repo creation.
                </p>
              </div>

              <div className="rounded-lg border border-[#cfa468]/60 bg-[#f6ebd8]/80 p-3">
                <div className="flex items-center gap-1.5">
                  <Flame size={13} className="text-[#8a5d26]" />
                  <span className="font-mono text-[10px] font-semibold text-[#8a5d26]">PHASE 02 · 26–27 DEC</span>
                </div>
                <h4 className="font-serif text-[15px] font-semibold text-[#1e150e]">24-Hour Build Sprint</h4>
                <p className="mt-0.5 text-[11.5px] text-[#534232]">
                  10 PM Kickoff → 24h continuous build, hourly checkpoints &amp; 8 PM public reveal.
                </p>
              </div>

              <div className="rounded-lg border border-[#e4d7c1] bg-[#faf5ea] p-3">
                <span className="font-mono text-[10px] font-semibold text-[#8a5d26]">PHASE 03 · 27 DEC</span>
                <h4 className="font-serif text-[15px] font-semibold text-[#1e150e]">Freeze &amp; Results</h4>
                <p className="mt-0.5 text-[11.5px] text-[#534232]">
                  10 PM hard freeze, 10–11 PM judging, 11 PM results &amp; prize transfers.
                </p>
              </div>
            </div>
          </div>
        ),
        backSubtitle: 'Phase 01 · 25 Dec 2026',
        backTitle: 'Preparation Day',
        backContent: (
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#7c5c38]">
              Setup &amp; Planning
            </p>
            <MilestoneCard
              time="25 Dec · Closing Time TBA"
              badge="Pre-Event"
              title="Registration & Roster Lock"
              desc="Finalize registration, pitch deck, and squad members. Rosters lock permanently."
            />
            <MilestoneCard
              time="25 Dec · All Day"
              badge="Setup Only"
              title="Tooling & Private Repo"
              desc="Install dependencies, create 1 private Git repo, and invite the organiser inspection account."
            />
            <div className="rounded-lg border border-[#e4d7c1] bg-[#f4ebdc] p-2.5 text-[11px] text-[#574534]">
              <strong>Note:</strong> Prep-day setup earns no 24-hour sprint points.
            </div>
          </div>
        ),
      },
      {
        pageNumber: 2,
        subtitle: 'Phase 02 · 26 Dec 2026',
        title: 'Kickoff Sequence',
        content: (
          <div className="space-y-2.5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#7c5c38]">
              24h Sprint (10 PM → 10 PM IST)
            </p>
            <MilestoneCard
              time="26 Dec · Before 9:00 PM IST"
              badge="Verify"
              title="Collaborator Access Check"
              desc="Confirm GitHub inspector invitation is accepted and active."
            />
            <MilestoneCard
              time="26 Dec · 9:30 PM IST"
              badge="Briefing"
              title="Official Final Briefing"
              desc="Rules, checkpoint format, judging rubric &amp; support channels."
            />
            <MilestoneCard
              time="26 Dec · 10:00 PM IST"
              badge="Kickoff"
              title="Competition Kickoff"
              desc="24h clock begins; baseline repository snapshot captured."
              highlight
            />
          </div>
        ),
        backSubtitle: 'Phase 02 · 26–27 Dec 2026',
        backTitle: 'Build & Public Reveal',
        backContent: (
          <div className="space-y-3">
            <MilestoneCard
              time="26 Dec 10 PM – 27 Dec 10 PM"
              badge="24h Window"
              title="Active Build & Checkpoints"
              desc="Ship your MVP, commit steadily, and log hourly progress updates with evidence."
              highlight
            />
            <MilestoneCard
              time="27 Dec · 8:00 PM IST"
              badge="Reveal"
              title="Public Repository Reveal"
              desc="Switch repo from private to public for transparent peer &amp; judge inspection."
            />
            <div className="rounded-lg border border-[#e4d7c1] bg-[#faf5ea] p-2.5 text-[11px] text-[#534232]">
              <strong>Final 2 Hours:</strong> Polish docs, tests, and live deployment before 10 PM freeze.
            </div>
          </div>
        ),
      },
      {
        pageNumber: 3,
        subtitle: 'Phase 03 · 27 Dec 2026',
        title: 'Freeze & Judging',
        content: (
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#7c5c38]">
              10:00 PM IST Code Freeze
            </p>
            <MilestoneCard
              time="27 Dec · 10:00 PM IST"
              badge="Hard Freeze"
              title="Code Freeze & Final Snapshot"
              desc="Build ends; post-deadline commits excluded. Live URL, README &amp; disclosures due."
              highlight
            />
            <MilestoneCard
              time="27 Dec · 10:00 – 11:00 PM IST"
              badge="Evaluation"
              title="Judging & Verification"
              desc="Live deployment testing, repo diff &amp; commit audit, and 100-point scoring."
            />
          </div>
        ),
        backSubtitle: 'Phase 03 · 27 Dec 2026',
        backTitle: 'Results & Prizes',
        backContent: (
          <div className="space-y-3">
            <MilestoneCard
              time="27 Dec · 11:00 PM IST"
              badge="Ceremony"
              title="Results Announcement"
              desc="Top 5, Category Winners, Top 25 Ranked &amp; Surprise awards published."
              highlight
            />
            <MilestoneCard
              time="27 Dec · By 11:05 PM IST"
              badge="Payout"
              title="Direct Prize Distribution"
              desc="Immediate electronic transfers to verified winners + digital certificates."
            />
            <div className="pt-1" onClick={(e) => e.stopPropagation()}>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8a5d26] hover:underline"
              >
                Full Schedule Page <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ),
      },
    ],
  },

  'how-it-works': {
    id: 'how-it-works',
    title: 'How It Works',
    author: '5-Step Participation Flow',
    coverNode: (
      <CoverPlate
        vol="VOLUME II"
        eyebrow="Participation Flow"
        titleLine1="How It"
        titleLine2="Works"
        footer="Register · Prepare · Start · Build · Submit"
        bgClass="bg-gradient-to-br from-[#2d170e] via-[#1f1009] to-[#130905]"
        accentColor="#f0c48b"
      />
    ),
    innerCoverContent: (jumpToPage) => (
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6539]">
            Participation Flow · Vol II
          </p>
          <h2 className="mt-1 font-serif text-3xl font-semibold text-[#1e150e]">
            How It <span className="italic text-[#8a5d26]">Works</span>
          </h2>
          <p className="mt-1.5 text-[12px] leading-relaxed text-[#574534]">
            A structured 5-step journey from initial registration to final snapshot grading.
          </p>

          <div className="mt-4">
            <p className="mb-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#8a6539]">
              Page Index (Click to Jump)
            </p>
            <TocItem pageNum="P.01" title="5-Step Journey Overview" meta="Flow" onClick={() => jumpToPage(-1, 1)} />
            <TocItem pageNum="P.02" title="01 · Register & Pitch" meta="REGISTER" onClick={() => jumpToPage(0, 2)} />
            <TocItem pageNum="P.03" title="02 · Setup on 25 Dec" meta="PREPARE" onClick={() => jumpToPage(0, 3)} />
            <TocItem pageNum="P.04" title="03 · Kickoff at 10 PM, 26 Dec" meta="START" onClick={() => jumpToPage(1, 4)} />
            <TocItem pageNum="P.05" title="04 · Ship & Checkpoint" meta="BUILD" onClick={() => jumpToPage(1, 5)} />
            <TocItem pageNum="P.06" title="05 · Freeze & Sprint Boundary" meta="SUBMIT" onClick={() => jumpToPage(2, 6)} />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#e8decb] pt-2.5 font-mono text-[10px] text-[#6d5943]">
          <span>24-Hour Continuous Sprint</span>
          <span className="text-[#8a5d26]">Solo (₹99) · Squad (₹200)</span>
        </div>
      </div>
    ),
    backCoverContent: <VolumeBackCover ctaHref="/faq" ctaLabel="Read Hackathon FAQ" />,
    pages: [
      {
        pageNumber: 1,
        subtitle: 'Participation Flow',
        title: 'How the Sprint Runs',
        content: (
          <div className="space-y-3">
            <div className="rounded-lg border border-[#cfa468]/60 bg-[#f6ebd8]/80 p-3">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8a5d26]">
                24-Hour Build Window
              </p>
              <p className="mt-1 font-serif text-[15px] font-semibold text-[#1e150e]">
                26 Dec, 10:00 PM → 27 Dec, 10:00 PM IST
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-[#4f3e2e]">
                Preparation on 25 Dec is for setup and planning only. Evaluation strictly scores code engineered inside the 24-hour window.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-lg border border-[#e4d7c1] bg-[#faf5ea] p-3">
                <p className="font-mono text-[9.5px] uppercase tracking-wider text-[#8a6539]">Solo Entry</p>
                <p className="mt-0.5 font-serif text-xl font-semibold text-[#1e150e]">₹99</p>
                <p className="mt-0.5 text-[11px] text-[#534232]">1 builder · full rubric parity</p>
              </div>
              <div className="rounded-lg border border-[#e4d7c1] bg-[#faf5ea] p-3">
                <p className="font-mono text-[9.5px] uppercase tracking-wider text-[#8a6539]">Squad Entry</p>
                <p className="mt-0.5 font-serif text-xl font-semibold text-[#1e150e]">₹200</p>
                <p className="mt-0.5 text-[11px] text-[#534232]">2–4 members · flat fee</p>
              </div>
            </div>

            <div className="rounded-lg border border-[#e4d7c1] bg-white/80 p-3 text-[11.5px] leading-relaxed text-[#463628]">
              <strong className="text-[#1e150e]">Verifiable Progress:</strong> Commit steadily to your private GitHub repo, log hourly checkpoints, reveal public at 8 PM on 27 Dec, and freeze at 10 PM.
            </div>
          </div>
        ),
        backSubtitle: 'Step 01 · REGISTER',
        backTitle: 'Register & Pitch',
        backContent: (
          <div className="space-y-3">
            <MilestoneCard
              time="Step 01 · Before 25 Dec"
              badge="Entry"
              title="Format & Problem Brief"
              desc="Enter Solo (₹99) or Squad of 2–4 (₹200 flat) and submit your problem brief."
              highlight
            />
            <div className="space-y-1.5 rounded-lg border border-[#e4d7c1] bg-[#faf5ea] p-3 text-[11.5px] text-[#463628]">
              <p className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#8a6539]">
                Checklist
              </p>
              <p>• Nominate team leader &amp; squad GitHub handles.</p>
              <p>• Define problem scope &amp; planned stack.</p>
              <p>• Declare any starter templates or AI tools upfront.</p>
            </div>
          </div>
        ),
      },
      {
        pageNumber: 2,
        subtitle: 'Step 02 · PREPARE',
        title: 'Setup on 25 Dec',
        content: (
          <div className="space-y-3">
            <MilestoneCard
              time="Step 02 · 25 Dec 2026"
              badge="Setup Only"
              title="Tooling & Private Repo"
              desc="Plan architecture, install packages, create 1 private Git repo, and invite the inspector account."
              highlight
            />
            <div className="space-y-1.5 rounded-lg border border-[#e4d7c1] bg-[#faf5ea] p-3 text-[11.5px] text-[#463628]">
              <p className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#8a6539]">
                GitHub Protocol
              </p>
              <p>• 1 private repository owned by the team leader.</p>
              <p>• Invite the official HyperLearningTech inspector.</p>
              <p>• Access verified before <strong>9:00 PM IST, 26 Dec</strong>.</p>
            </div>
          </div>
        ),
        backSubtitle: 'Step 03 · START',
        backTitle: 'Kickoff at 10 PM, 26 Dec',
        backContent: (
          <div className="space-y-3">
            <MilestoneCard
              time="Step 03 · 26 Dec · 10:00 PM IST"
              badge="Kickoff"
              title="Baseline & 24h Clock"
              desc="Initial repo snapshot captured at 10:00 PM IST as the 24-hour clock begins."
              highlight
            />
            <div className="space-y-1.5 rounded-lg border border-[#e4d7c1] bg-[#faf5ea] p-3 text-[11.5px] text-[#463628]">
              <p className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#8a6539]">
                Kickoff Sequence
              </p>
              <p>• <strong>9:30 PM IST:</strong> Official Final Briefing.</p>
              <p>• <strong>10:00 PM IST:</strong> Baseline snapshot locked.</p>
              <p>• Only post-kickoff commits earn sprint effort points.</p>
            </div>
          </div>
        ),
      },
      {
        pageNumber: 3,
        subtitle: 'Step 04 · BUILD',
        title: 'Ship & Checkpoint',
        content: (
          <div className="space-y-3">
            <MilestoneCard
              time="Step 04 · 26 Dec 10 PM – 27 Dec 10 PM"
              badge="24h Sprint"
              title="Commit & Checkpoint"
              desc="Push commits steadily and log concise hourly checkpoints to prove active progress."
              highlight
            />
            <div className="space-y-1.5 rounded-lg border border-[#e4d7c1] bg-[#faf5ea] p-3 text-[11.5px] text-[#463628]">
              <p className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#8a6539]">
                Verified Effort (25 pts)
              </p>
              <p>• Hourly logs with progress, blockers &amp; screenshots.</p>
              <p>• Steady commits, diffs, tests &amp; squad contributions.</p>
              <p>• No last-minute bulk code dumps.</p>
            </div>
          </div>
        ),
        backSubtitle: 'Step 05 · SUBMIT',
        backTitle: 'Freeze at 10 PM, 27 Dec',
        backContent: (
          <div className="space-y-3">
            <MilestoneCard
              time="Step 05 · 27 Dec · 8 PM & 10 PM IST"
              badge="Freeze"
              title="Reveal & Final Submission"
              desc="Switch repo public at 8 PM. Final snapshot, live URL, README &amp; disclosures lock at 10 PM IST."
              highlight
            />
            <div className="rounded-lg border border-[#cfa468] bg-[#f5ead6] p-3 text-[11.5px] leading-relaxed text-[#3a2a1c]">
              <strong>Sprint Boundary:</strong> 25 Dec is prep only. Evaluation strictly scores commits between <strong>10 PM IST (26 Dec)</strong> and <strong>10 PM IST (27 Dec)</strong>.
            </div>
          </div>
        ),
      },
    ],
  },

  judging: {
    id: 'judging',
    title: 'Judging & Scoring',
    author: 'Normalized 100-Point Rubric',
    coverNode: (
      <CoverPlate
        vol="VOLUME III"
        eyebrow="Transparent Evaluation"
        titleLine1="Judging &"
        titleLine2="Scoring"
        footer="100 Points · 7 Criteria · Verified Effort"
        bgClass="bg-gradient-to-br from-[#161e2e] via-[#111724] to-[#0b0f18]"
        accentColor="#e0b885"
      />
    ),
    innerCoverContent: (jumpToPage) => (
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6539]">
            Transparent Evaluation · Vol III
          </p>
          <h2 className="mt-1 font-serif text-3xl font-semibold text-[#1e150e]">
            Judging &amp; <span className="italic text-[#8a5d26]">Scoring</span>
          </h2>
          <p className="mt-1 text-[11.5px] leading-relaxed text-[#574534]">
            A normalized 100-point rubric rewarding working functionality and verifiable development effort.
          </p>

          <div className="mt-3">
            <p className="mb-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#8a6539]">
              Rubric Index (100 Points Total)
            </p>
            <TocItem pageNum="P.01" title="Points Distribution Overview" meta="100 pts" onClick={() => jumpToPage(-1, 1)} />
            <TocItem pageNum="P.02" title="Working MVP & Functionality" meta="25 pts" onClick={() => jumpToPage(0, 2)} />
            <TocItem pageNum="P.03" title="Verified Development Effort" meta="25 pts" onClick={() => jumpToPage(0, 3)} />
            <TocItem pageNum="P.04" title="Technical Implementation" meta="15 pts" onClick={() => jumpToPage(1, 4)} />
            <TocItem pageNum="P.05" title="Individual / Team Contribution" meta="15 pts" onClick={() => jumpToPage(1, 5)} />
            <TocItem pageNum="P.06" title="Live Deployment" meta="10 pts" onClick={() => jumpToPage(2, 6)} />
            <TocItem pageNum="P.07" title="Documentation" meta="5 pts" onClick={() => jumpToPage(2, 7)} />
            <TocItem pageNum="P.08" title="Final Demonstration" meta="5 pts" onClick={() => jumpToPage(3, 8)} />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#e8decb] pt-2 font-mono text-[10px] text-[#6d5943]">
          <span>Solo &amp; Squad Fairly Normalized</span>
          <span className="font-semibold text-[#8a5d26]">100 Points</span>
        </div>
      </div>
    ),
    backCoverContent: <VolumeBackCover ctaHref="/prizes" ctaLabel="View Prize Pool" />,
    pages: [
      {
        pageNumber: 1,
        subtitle: 'Evaluation Total · 100 Points',
        title: 'Scoring Philosophy',
        content: (
          <div className="space-y-3">
            <div className="rounded-lg border border-[#e4d7c1] bg-[#faf5ea] p-3">
              <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-[#6d5943]">
                <span>100-Point Allocation</span>
                <span className="font-semibold text-[#8a5d26]">100% Normalized</span>
              </div>
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-[#e6dac4]">
                <div style={{ width: '25%' }} className="bg-[#9d6e34]" title="Working MVP (25 pts)" />
                <div style={{ width: '25%' }} className="bg-[#c89658]" title="Verified Effort (25 pts)" />
                <div style={{ width: '15%' }} className="bg-[#dfba88]" title="Technical (15 pts)" />
                <div style={{ width: '15%' }} className="bg-[#7e5829]" title="Contribution (15 pts)" />
                <div style={{ width: '10%' }} className="bg-[#5f411d]" title="Deployment (10 pts)" />
                <div style={{ width: '5%' }} className="bg-[#432d13]" title="Docs (5 pts)" />
                <div style={{ width: '5%' }} className="bg-[#2a1c0b]" title="Demo (5 pts)" />
              </div>
              <p className="mt-2 font-mono text-[10px] text-[#6d5943]">
                MVP 25 · Effort 25 · Tech 15 · Squad 15 · Deploy 10 · Docs 5 · Demo 5
              </p>
            </div>

            <div className="space-y-2 rounded-lg border border-[#e4d7c1] bg-white/80 p-3 text-[11.5px] leading-relaxed text-[#463628]">
              <p className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#8a6539]">
                How Judges Score
              </p>
              <p>• <strong>50% Core Weight:</strong> Working MVP (25 pts) + Verified 24h Effort (25 pts).</p>
              <p>• <strong>Fair Solo &amp; Squad Scaling:</strong> Solo builders are evaluated on individual ownership without team-size penalties.</p>
              <p>• <strong>Evidence-First:</strong> Judges test live URLs and inspect git diffs, commit cadence, and hourly logs.</p>
            </div>
          </div>
        ),
        backSubtitle: 'Criterion 01 · 25 Points',
        backTitle: 'Working MVP & Functionality',
        backContent: (
          <CriterionPageContent
            criterionIndex={0}
            extraNote="Half of your score comes from proving a real working product (25 pts) built through verifiable 24-hour effort (25 pts)."
          />
        ),
      },
      {
        pageNumber: 2,
        subtitle: 'Criterion 02 · 25 Points',
        title: 'Verified Development Effort',
        content: <CriterionPageContent criterionIndex={1} />,
        backSubtitle: 'Criterion 03 · 15 Points',
        backTitle: 'Technical Implementation',
        backContent: <CriterionPageContent criterionIndex={2} />,
      },
      {
        pageNumber: 3,
        subtitle: 'Criterion 04 · 15 Points',
        title: 'Individual / Team Contribution',
        content: <CriterionPageContent criterionIndex={3} />,
        backSubtitle: 'Criterion 05 · 10 Points',
        backTitle: 'Live Deployment',
        backContent: <CriterionPageContent criterionIndex={4} />,
      },
      {
        pageNumber: 4,
        subtitle: 'Criterion 06 · 5 Points',
        title: 'Documentation',
        content: <CriterionPageContent criterionIndex={5} />,
        backSubtitle: 'Criterion 07 · 5 Points',
        backTitle: 'Final Demonstration',
        backContent: <CriterionPageContent criterionIndex={6} />,
      },
    ],
  },

  rules: {
    id: 'rules',
    title: 'Rules & Guidelines',
    author: 'Fair Competition Charter',
    coverNode: (
      <CoverPlate
        vol="VOLUME IV"
        eyebrow="Fair Competition Standards"
        titleLine1="Rules &"
        titleLine2="Guidelines"
        footer="8 Policy Pillars · 100% IP Retained"
        bgClass="bg-gradient-to-br from-[#16241b] via-[#101a13] to-[#0a110d]"
        accentColor="#dfba88"
      />
    ),
    innerCoverContent: (jumpToPage) => (
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6539]">
            Fair Competition Standards · Vol IV
          </p>
          <h2 className="mt-1 font-serif text-3xl font-semibold text-[#1e150e]">
            Rules &amp; <span className="italic text-[#8a5d26]">Guidelines</span>
          </h2>
          <p className="mt-1 text-[11.5px] leading-relaxed text-[#574534]">
            Clear policies governing eligibility, AI assistance, repository integrity, and 100% builder IP ownership.
          </p>

          <div className="mt-3">
            <p className="mb-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#8a6539]">
              8 Policy Pillars (Click to Jump)
            </p>
            <TocItem pageNum="P.01" title="Eligibility & Open Innovation" meta="4 Rules" onClick={() => jumpToPage(-1, 1)} />
            <TocItem pageNum="P.02" title="AI Tools & Libraries" meta="3 Rules" onClick={() => jumpToPage(0, 2)} />
            <TocItem pageNum="P.03" title="Existing Code & Prep Boundaries" meta="3 Rules" onClick={() => jumpToPage(0, 3)} />
            <TocItem pageNum="P.04" title="Plagiarism & Misconduct" meta="3 Rules" onClick={() => jumpToPage(1, 4)} />
            <TocItem pageNum="P.05" title="Intellectual Property Ownership" meta="100% IP" onClick={() => jumpToPage(1, 5)} />
            <TocItem pageNum="P.06" title="Repository Requirements" meta="4 Rules" onClick={() => jumpToPage(2, 6)} />
            <TocItem pageNum="P.07" title="Security & Privacy" meta="2 Rules" onClick={() => jumpToPage(2, 7)} />
            <TocItem pageNum="P.08" title="Submission & Demonstration" meta="3 Rules" onClick={() => jumpToPage(3, 8)} />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#e8decb] pt-2">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#6d5943]">
            <ShieldAlert size={12} className="text-[#8a5d26]" /> Zero Plagiarism
          </span>
          <Link
            href="/rules"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8a5d26] hover:underline"
          >
            Full Document <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    ),
    backCoverContent: <VolumeBackCover ctaHref="/rules" ctaLabel="Full Rules Document" />,
    pages: [
      {
        pageNumber: 1,
        subtitle: 'Pillar 01 · Eligibility',
        title: rulesData[0].category,
        content: <RulePageContent groupIndex={0} />,
        backSubtitle: 'Pillar 02 · AI & Tooling',
        backTitle: rulesData[1].category,
        backContent: <RulePageContent groupIndex={1} />,
      },
      {
        pageNumber: 2,
        subtitle: 'Pillar 03 · Prior Assets',
        title: rulesData[2].category,
        content: <RulePageContent groupIndex={2} />,
        backSubtitle: 'Pillar 04 · Integrity',
        backTitle: rulesData[3].category,
        backContent: <RulePageContent groupIndex={3} />,
      },
      {
        pageNumber: 3,
        subtitle: 'Pillar 05 · Ownership',
        title: rulesData[4].category,
        content: <RulePageContent groupIndex={4} />,
        backSubtitle: 'Pillar 06 · Git Protocol',
        backTitle: rulesData[5].category,
        backContent: <RulePageContent groupIndex={5} />,
      },
      {
        pageNumber: 4,
        subtitle: 'Pillar 07 · Safety',
        title: rulesData[6].category,
        content: <RulePageContent groupIndex={6} />,
        backSubtitle: 'Pillar 08 · Freeze & Demo',
        backTitle: rulesData[7].category,
        backContent: <RulePageContent groupIndex={7} />,
      },
    ],
  },

  'github-submission': {
    id: 'github-submission',
    title: 'GitHub & Submission',
    author: '7-Step Inspection Protocol',
    coverNode: (
      <CoverPlate
        vol="VOLUME V"
        eyebrow="Repository Integrity"
        titleLine1="GitHub &"
        titleLine2="Submission"
        footer="Private Repo · Inspector · 10 PM Freeze"
        bgClass="bg-gradient-to-br from-[#191d26] via-[#12151c] to-[#0b0d12]"
        accentColor="#e0b885"
      />
    ),
    innerCoverContent: (jumpToPage) => (
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a6539]">
            Repository Integrity · Vol V
          </p>
          <h2 className="mt-1 font-serif text-3xl font-semibold text-[#1e150e]">
            GitHub &amp; <span className="italic text-[#8a5d26]">Submission</span>
          </h2>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#574534]">
            A transparent inspection process through private repositories. No third-party apps required.
          </p>

          <div className="mt-4">
            <p className="mb-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#8a6539]">
              Protocol Index (Click to Jump)
            </p>
            <TocItem pageNum="P.01" title="7-Step Protocol Overview" meta="Steps 1–7" onClick={() => jumpToPage(-1, 1)} />
            <TocItem pageNum="P.02" title="Steps 01–03 · Repo & Inspector" meta="Before 9 PM" onClick={() => jumpToPage(0, 2)} />
            <TocItem pageNum="P.03" title="Steps 04–05 · Baseline & Commits" meta="24h Window" onClick={() => jumpToPage(0, 3)} />
            <TocItem pageNum="P.04" title="Steps 06–07 · Reveal & Freeze" meta="8 & 10 PM" onClick={() => jumpToPage(1, 4)} />
            <TocItem pageNum="P.05" title="Collaborator Access Requirement" meta="Mandatory" onClick={() => jumpToPage(1, 5)} />
            <TocItem pageNum="P.06" title="Final Submission Checklist" meta="Artifacts" onClick={() => jumpToPage(2, 6)} />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#e8decb] pt-2.5">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#6d5943]">
            <GitBranch size={12} className="text-[#8a5d26]" /> Private → Public
          </span>
          <Link
            href="/rules"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8a5d26] hover:underline"
          >
            Repository Rules <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    ),
    backCoverContent: <VolumeBackCover ctaHref="/rules" ctaLabel="Repository Rules & Guidelines" />,
    pages: [
      {
        pageNumber: 1,
        subtitle: 'Repository Integrity',
        title: '7-Step Inspection Protocol',
        content: (
          <div className="space-y-1.5">
            {[
              { n: '01', t: 'Private Repo', d: '1 private GitHub repo created by leader before deadline.' },
              { n: '02', t: 'Inspector Access', d: 'Add organiser inspection account as collaborator.' },
              { n: '03', t: 'Access Confirmed', d: 'Accepted & verified before 9:00 PM IST on 26 Dec.' },
              { n: '04', t: 'Baseline Snapshot', d: 'Initial state captured at 10:00 PM IST kickoff.' },
              { n: '05', t: 'Continuous Commits', d: 'Push commits & diffs across 24h with checkpoints.' },
              { n: '06', t: 'Public Reveal', d: 'Switch repository to Public at 8:00 PM IST, 27 Dec.' },
              { n: '07', t: 'Final Freeze', d: 'Final snapshot freezes at 10:00 PM IST for grading.' },
            ].map((st) => (
              <div
                key={st.n}
                className="flex items-baseline gap-2.5 rounded-md border border-[#e4d7c1] bg-[#faf5ea]/80 px-2.5 py-1.5"
              >
                <span className="font-mono text-[10px] font-bold text-[#8a5d26] shrink-0">{st.n}</span>
                <div className="min-w-0">
                  <span className="font-serif text-[13.5px] font-semibold text-[#1e150e] mr-1.5">{st.t}:</span>
                  <span className="text-[11px] text-[#4f3e2e]">{st.d}</span>
                </div>
              </div>
            ))}
          </div>
        ),
        backSubtitle: 'Steps 01 – 03 · Pre-Kickoff',
        backTitle: 'Repo & Inspector Setup',
        backContent: (
          <div className="space-y-2.5">
            <MilestoneCard
              time="Step 01 · Before Deadline"
              badge="Leader"
              title="Private Repo"
              desc="Leader creates 1 private GitHub repo for the squad before the closing deadline."
            />
            <MilestoneCard
              time="Step 02 · Collaborator"
              badge="Invite"
              title="Inspector Access"
              desc="Add the official HyperLearningTech organiser inspection account as a collaborator."
            />
            <MilestoneCard
              time="Step 03 · Before 9:00 PM IST, 26 Dec"
              badge="Mandatory"
              title="Access Confirmed"
              desc="Invitation must be accepted and verified before 9:00 PM IST on 26 Dec."
              highlight
            />
          </div>
        ),
      },
      {
        pageNumber: 2,
        subtitle: 'Steps 04 – 05 · 24h Sprint',
        title: 'Baseline & Steady Commits',
        content: (
          <div className="space-y-3">
            <MilestoneCard
              time="Step 04 · 26 Dec · 10:00 PM IST"
              badge="Kickoff"
              title="Baseline Snapshot"
              desc="At 10:00 PM IST kickoff, organisers capture the initial baseline state of your repository."
              highlight
            />
            <MilestoneCard
              time="Step 05 · 26–27 Dec (24 Hours)"
              badge="Continuous"
              title="Continuous Commits"
              desc="Push commits & diffs steadily across the 24 hours alongside concise hourly checkpoints."
            />
            <div className="rounded-lg border border-[#e4d7c1] bg-[#faf5ea] p-2.5 text-[11px] text-[#534232]">
              <strong>No 3rd-Party Apps:</strong> Inspection happens directly via standard GitHub collaborator access.
            </div>
          </div>
        ),
        backSubtitle: 'Steps 06 – 07 · Final Hours',
        backTitle: 'Public Reveal & Freeze',
        backContent: (
          <div className="space-y-3">
            <MilestoneCard
              time="Step 06 · 27 Dec · 8:00 PM IST"
              badge="Public Audit"
              title="Public Reveal"
              desc="Team leader switches repository visibility from private to public at 8:00 PM IST for peer and judge audit."
            />
            <MilestoneCard
              time="Step 07 · 27 Dec · 10:00 PM IST"
              badge="Hard Freeze"
              title="Final Freeze"
              desc="At 10:00 PM IST, final repository snapshot freezes code for judging; later commits are excluded."
              highlight
            />
          </div>
        ),
      },
      {
        pageNumber: 3,
        subtitle: 'Critical Requirement',
        title: 'Collaborator & Security',
        content: (
          <div className="space-y-3">
            <div className="rounded-lg border border-[#cfa468] bg-[#f7ead3] p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle size={15} className="mt-0.5 shrink-0 text-[#9c631c]" />
                <div>
                  <h4 className="font-serif text-[14.5px] font-semibold text-[#1e150e]">
                    Collaborator Invitation Requirement
                  </h4>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#453423]">
                    Every team leader must invite the official HyperLearningTech GitHub inspection account and confirm access is active before <strong>9:00 PM IST on 26 December</strong>. Pending or unaccepted invites cannot be evaluated.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 rounded-lg border border-[#e4d7c1] bg-[#faf5ea] p-3 text-[11.5px] text-[#463628]">
              <p className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#8a6539]">
                Repository Safety
              </p>
              <p>• Never commit API keys, DB credentials, or tokens; use <code className="font-mono text-[10.5px]">.env.example</code>.</p>
              <p>• Organisers never ask for GitHub passwords, PATs, or 2FA codes.</p>
            </div>
          </div>
        ),
        backSubtitle: '10:00 PM IST · 27 Dec',
        backTitle: 'Submission Checklist',
        backContent: (
          <div className="space-y-2.5">
            <div className="space-y-1.5 rounded-lg border border-[#e4d7c1] bg-[#faf5ea] p-3 text-[11.5px] text-[#463628]">
              <p className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#8a6539]">
                Required Before 10:00 PM IST
              </p>
              <p>• Public GitHub repository URL &amp; live deployment link.</p>
              <p>• Project title, problem statement &amp; feature list.</p>
              <p>• README with setup steps &amp; architecture overview.</p>
              <p>• Squad contribution breakdown &amp; AI/asset disclosures.</p>
              <p>• <em>Optional:</em> 3–5 min presentation video (evaluated equally with live demo).</p>
            </div>

            <div className="pt-1" onClick={(e) => e.stopPropagation()}>
              <Link
                href="/rules"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8a5d26] hover:underline"
              >
                Repository Rules &amp; Guidelines <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ),
      },
    ],
  },
};
