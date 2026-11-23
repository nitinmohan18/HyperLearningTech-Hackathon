"use client";

import { useState } from "react";
import {
  Scale,
  ChevronDown,
  CheckCircle2,
  Code,
  Flame,
  Users,
  Globe,
  FileText,
  Video,
  Info,
} from "lucide-react";
import { judgingCriteria } from "@/data/judging";

export default function JudgingSection() {
  const [expandedId, setExpandedId] = useState<string | null>("effort");

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "mvp":
        return <Code size={18} className="text-[#c89f6d]" />;
      case "effort":
        return <Flame size={18} className="text-[#c89f6d]" />;
      case "tech":
        return <Scale size={18} className="text-[#c89f6d]" />;
      case "contribution":
        return <Users size={18} className="text-[#c89f6d]" />;
      case "deployment":
        return <Globe size={18} className="text-[#c89f6d]" />;
      case "docs":
        return <FileText size={18} className="text-[#c89f6d]" />;
      case "demo":
        return <Video size={18} className="text-[#c89f6d]" />;
      default:
        return <CheckCircle2 size={18} className="text-[#c89f6d]" />;
    }
  };

  return (
    <section id="judging" className="section-pad border-b border-sand-border/20 bg-cream">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Transparent Evaluation</p>
            <h2 className="section-title">
              Judging & <span className="font-serif italic text-[#c89f6d]">Scoring</span>
            </h2>
            <p className="section-copy">
              A normalised 100-point rubric designed to reward working functionality and verifiable development effort over superficial presentations or commit spam.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="rounded-2xl border border-[#c89f6d]/35 bg-[#18110b]/70 px-5 py-3 text-right backdrop-blur-xl">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#8e7a68]">
                Evaluation Total
              </p>
              <p className="font-serif text-3xl font-semibold text-[#c89f6d]">
                100 Points
              </p>
            </div>
          </div>
        </div>

        {/* Visual Points Allocation Bar */}
        <div className="mt-10 rounded-2xl border border-sand-border/20 bg-[#120d09]/45 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between font-mono text-xs text-[#8e7a68] mb-3">
            <span>Point Allocation Summary</span>
            <span className="text-[#f0eae1]">100% Normalized</span>
          </div>

          <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#1e1712]">
            <div style={{ width: "25%" }} className="bg-[#c89f6d] title='Working MVP (25pts)'" />
            <div style={{ width: "25%" }} className="bg-[#e4be8c] title='Verified Effort (25pts)'" />
            <div style={{ width: "15%" }} className="bg-[#9e7f59] title='Technical Implementation (15pts)'" />
            <div style={{ width: "15%" }} className="bg-[#b39169] title='Team Contribution (15pts)'" />
            <div style={{ width: "10%" }} className="bg-[#6b553c] title='Deployment (10pts)'" />
            <div style={{ width: "5%" }} className="bg-[#523e2a] title='Documentation (5pts)'" />
            <div style={{ width: "5%" }} className="bg-[#382a1d] title='Demonstration (5pts)'" />
          </div>

          <div className="mt-4 flex flex-wrap gap-4 font-mono text-[11px] text-[#9e8e7c]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#c89f6d]" /> MVP: 25 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#e4be8c]" /> Verified Effort: 25 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#9e7f59]" /> Tech Stack: 15 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#b39169]" /> Contribution: 15 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#6b553c]" /> Deployment: 10 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#523e2a]" /> Docs: 5 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#382a1d]" /> Demo: 5 pts
            </span>
          </div>
        </div>

        {/* Expandable Criteria Cards */}
        <div className="mt-8 space-y-3">
          {judgingCriteria.map((c) => {
            const isExpanded = expandedId === c.id;

            return (
              <div
                key={c.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isExpanded
                    ? "border-[#c89f6d]/45 bg-[#16100c]/70 shadow-md"
                    : "border-sand-border/15 bg-[#120d09]/40 hover:border-sand-border/35"
                } backdrop-blur-xl`}
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(c.id)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60">
                      {getIcon(c.id)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#f0eae1]">
                          {c.name}
                        </h3>
                      </div>
                      <p className="mt-0.5 text-xs text-[#9e8e7c] line-clamp-1">
                        {c.evaluates}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="font-serif text-2xl font-semibold text-[#c89f6d]">
                        {c.points}
                      </span>
                      <span className="font-mono text-xs text-[#8e7a68] ml-1">pts</span>
                    </div>
                    <div
                      className={`grid h-8 w-8 place-items-center rounded-lg border border-sand-border/20 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-[#c89f6d]" : "text-[#8e7a68]"
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-sand-border/15 p-5 pt-4 text-xs">
                    <p className="text-sm font-medium text-[#f0eae1] mb-3">
                      What judges evaluate:
                    </p>
                    <ul className="space-y-2 text-[#9e8e7c]">
                      {c.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#c89f6d]" />
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Sub-breakdown if present (e.g. Verified Effort) */}
                    {c.subBreakdown && (
                      <div className="mt-5 rounded-xl border border-sand-border/20 bg-[#120d09]/60 p-4">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#c89f6d] mb-3">
                          Verified Development Effort Breakdown (25 Points)
                        </p>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {c.subBreakdown.map((sub) => (
                            <div
                              key={sub.item}
                              className="rounded-lg border border-sand-border/15 bg-[#18110b]/50 p-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-[#f0eae1]">{sub.item}</span>
                                <span className="font-mono font-semibold text-[#c89f6d]">
                                  {sub.points} pts
                                </span>
                              </div>
                              <p className="mt-1 text-[11px] text-[#9e8e7c]">{sub.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Scoring Fairness Principles Callout */}
        <div className="mt-8 rounded-2xl border border-sand-border/20 bg-[#16100c]/60 p-6 backdrop-blur-xl">
          <div className="flex items-start gap-3.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#c89f6d]/30 bg-[#c89f6d]/10 text-[#c89f6d]">
              <Info size={18} />
            </div>
            <div>
              <h4 className="font-serif text-lg font-normal text-[#f0eae1]">
                Scoring Fairness Principle: Genuine Engineering over Raw Volume
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-[#9e8e7c]">
                Meaningful engineering progress, genuine individual/team contribution, and working functionality matter far more than raw commit counts, trivial formatting changes, or sheer lines of code. The same normalised 100-point rubric is applied fairly to Solo and Squad entries, without arbitrary multipliers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
