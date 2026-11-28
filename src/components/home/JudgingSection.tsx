"use client";

import { useState } from "react";
import {
  Scale,
  ChevronDown,
  CheckCircle2,
  Code,
  Sparkles,
  FileText,
  Target,
  Globe,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { judgingCriteria } from "@/data/judging";

export default function JudgingSection() {
  const [expandedId, setExpandedId] = useState<string | null>("technical");

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "problem":
        return <Target size={16} className="text-[#e0b885]" />;
      case "originality":
        return <Sparkles size={16} className="text-[#e0b885]" />;
      case "technical":
        return <Code size={16} className="text-[#e0b885]" />;
      case "functionality":
        return <CheckCircle2 size={16} className="text-[#e0b885]" />;
      case "engineering":
        return <FileText size={16} className="text-[#e0b885]" />;
      case "impact":
        return <Globe size={16} className="text-[#e0b885]" />;
      case "learning":
        return <BookOpen size={16} className="text-[#e0b885]" />;
      case "communication":
        return <MessageSquare size={16} className="text-[#e0b885]" />;
      default:
        return <Scale size={16} className="text-[#e0b885]" />;
    }
  };

  return (
    <section id="judging" className="section-pad border-b border-white/[0.08] bg-cream">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Official 100-Point Rubric</p>
            <h2 className="section-title">
              Judging & <span className="font-serif italic text-[#e0b885]">Scoring</span>
            </h2>
            <p className="section-copy">
              An objective 100-point rubric evaluating demonstrated technical depth, functionality, and genuine understanding.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="text-left md:text-right">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#b8ada0]">
                Evaluation Total
              </p>
              <p className="font-serif text-3xl sm:text-4xl font-normal text-[#e0b885]">
                100 Points
              </p>
            </div>
          </div>
        </div>

        {/* Visual Points Allocation Bar */}
        <div className="mt-12 border-t border-white/[0.08] pt-8">
          <div className="flex items-center justify-between font-mono text-xs text-[#b8ada0] mb-3">
            <span>Points Distribution</span>
            <span className="text-white">100% Normalized</span>
          </div>

          <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div style={{ width: "15%" }} className="bg-[#e0b885]" title="Problem Understanding (15pts)" />
            <div style={{ width: "15%" }} className="bg-[#edd2b1]" title="Originality & Innovation (15pts)" />
            <div style={{ width: "20%" }} className="bg-[#d4a366]" title="Technical Implementation (20pts)" />
            <div style={{ width: "15%" }} className="bg-[#ba874a]" title="Functionality & Usability (15pts)" />
            <div style={{ width: "10%" }} className="bg-[#9c6f37]" title="Engineering & Documentation (10pts)" />
            <div style={{ width: "10%" }} className="bg-[#835c2b]" title="Impact & Feasibility (10pts)" />
            <div style={{ width: "10%" }} className="bg-[#6b4a20]" title="Learning & Understanding (10pts)" />
            <div style={{ width: "5%" }} className="bg-[#513615]" title="Communication (5pts)" />
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-[#d6cec2]">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e0b885]" /> Problem: 15 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#edd2b1]" /> Innovation: 15 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4a366]" /> Tech: 20 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ba874a]" /> Function: 15 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9c6f37]" /> Engineering: 10 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#835c2b]" /> Impact: 10 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6b4a20]" /> Learning: 10 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#513615]" /> Comm: 5 pts
            </span>
          </div>
        </div>

        {/* Expandable Criteria Rows */}
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
                  className="flex w-full items-center justify-between py-4 text-left transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#e0b885]">{getIcon(c.id)}</span>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                        {c.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#d6cec2] line-clamp-1">
                        {c.evaluates}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="font-serif text-xl sm:text-2xl font-normal text-[#e0b885]">
                        {c.points}
                      </span>
                      <span className="font-mono text-xs text-[#b8ada0] ml-1">pts</span>
                    </div>
                    <ChevronDown
                      size={15}
                      className={`text-[#b8ada0] transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-[#e0b885]" : ""
                      }`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="pb-5 pt-1 pl-7">
                    <p className="text-xs leading-relaxed text-[#d6cec2]">
                      {c.evaluates}
                    </p>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-[#d6cec2]">
                      {c.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#e0b885] mt-1 shrink-0">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
