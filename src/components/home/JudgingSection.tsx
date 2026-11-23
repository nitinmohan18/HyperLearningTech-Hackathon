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
              Judging & <span className="font-serif italic text-[#e0b885]">Scoring</span>
            </h2>
            <p className="section-copy">
              A normalised 100-point rubric designed to reward working functionality and verifiable development effort over superficial presentations or commit spam.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#b8ada0]">
                Evaluation Total
              </p>
              <p className="font-serif text-3xl sm:text-4xl font-normal text-[#e0b885]">
                100 Points
              </p>
            </div>
          </div>
        </div>

        {/* Visual Points Allocation Bar - Clean, open container */}
        <div className="mt-12 border-t border-white/[0.08] pt-8">
          <div className="flex items-center justify-between font-mono text-xs text-[#b8ada0] mb-3">
            <span>Point Allocation Summary</span>
            <span className="text-white">100% Normalized</span>
          </div>

          <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div style={{ width: "25%" }} className="bg-[#e0b885]" title="Working MVP (25pts)" />
            <div style={{ width: "25%" }} className="bg-[#edd2b1]" title="Verified Effort (25pts)" />
            <div style={{ width: "15%" }} className="bg-[#c49a65]" title="Technical Implementation (15pts)" />
            <div style={{ width: "15%" }} className="bg-[#af8654]" title="Team Contribution (15pts)" />
            <div style={{ width: "10%" }} className="bg-[#8d693d]" title="Deployment (10pts)" />
            <div style={{ width: "5%" }} className="bg-[#71522d]" title="Documentation (5pts)" />
            <div style={{ width: "5%" }} className="bg-[#563c1f]" title="Demonstration (5pts)" />
          </div>

          <div className="mt-4 flex flex-wrap gap-4 font-mono text-[11px] text-[#d6cec2]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#e0b885]" /> MVP: 25 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#edd2b1]" /> Verified Effort: 25 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#c49a65]" /> Tech Stack: 15 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#af8654]" /> Contribution: 15 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#8d693d]" /> Deployment: 10 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#71522d]" /> Docs: 5 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#563c1f]" /> Demo: 5 pts
            </span>
          </div>
        </div>

        {/* Expandable Criteria Rows - Clean accordion rows without heavy box containers */}
        <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {judgingCriteria.map((c) => {
            const isExpanded = expandedId === c.id;

            return (
              <div
                key={c.id}
                className="transition-colors hover:bg-white/[0.01]"
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(c.id)}
                  className="flex w-full items-center justify-between py-5 text-left transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[#e0b885]">{getIcon(c.id)}</span>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                          {c.name}
                        </h3>
                      </div>
                      <p className="mt-0.5 text-xs text-[#d6cec2] line-clamp-1">
                        {c.evaluates}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="font-serif text-2xl font-normal text-[#e0b885]">
                        {c.points}
                      </span>
                      <span className="font-mono text-xs text-[#b8ada0] ml-1">pts</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-[#b8ada0] transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-[#e0b885]" : ""
                      }`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="pb-6 pt-2 text-xs">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#b8ada0] mb-3">
                      Evaluation Criteria:
                    </p>
                    <ul className="space-y-2 text-[#d6cec2]">
                      {c.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#e0b885]" />
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Sub-breakdown if present - Clean open layout, zero card-in-card */}
                    {c.subBreakdown && (
                      <div className="mt-6 border-t border-white/[0.08] pt-4">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#e0b885] mb-3">
                          Verified Development Effort Breakdown (25 Points)
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {c.subBreakdown.map((sub) => (
                            <div
                              key={sub.item}
                              className="border-l border-white/[0.1] pl-3 py-1"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-white">{sub.item}</span>
                                <span className="font-mono font-semibold text-[#e0b885]">
                                  {sub.points} pts
                                </span>
                              </div>
                              <p className="mt-0.5 text-[11px] text-[#b8ada0]">{sub.note}</p>
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
        <div className="mt-10 border-l-2 border-[#e0b885] bg-white/[0.02] p-4 text-xs leading-relaxed text-[#d6cec2]">
          <strong className="text-white font-medium">Scoring Fairness Principle: Genuine Engineering over Raw Volume. </strong>
          Meaningful engineering progress, genuine individual/team contribution, and working functionality matter far more than raw commit counts, trivial formatting changes, or sheer lines of code. The same normalised 100-point rubric is applied fairly to Solo and Squad entries, without arbitrary multipliers.
        </div>
      </div>
    </section>
  );
}
