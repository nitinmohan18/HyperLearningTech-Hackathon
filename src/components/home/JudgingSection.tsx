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
        return <Code size={16} className="text-[#e0b885]" />;
      case "effort":
        return <Flame size={16} className="text-[#e0b885]" />;
      case "tech":
        return <Scale size={16} className="text-[#e0b885]" />;
      case "contribution":
        return <Users size={16} className="text-[#e0b885]" />;
      case "deployment":
        return <Globe size={16} className="text-[#e0b885]" />;
      case "docs":
        return <FileText size={16} className="text-[#e0b885]" />;
      case "demo":
        return <Video size={16} className="text-[#e0b885]" />;
      default:
        return <CheckCircle2 size={16} className="text-[#e0b885]" />;
    }
  };

  return (
    <section id="judging" className="section-pad border-b border-white/[0.08] bg-cream">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Transparent Evaluation</p>
            <h2 className="section-title">
              Judging & <span className="font-serif italic text-[#e0b885]">Scoring</span>
            </h2>
            <p className="section-copy">
              A normalized 100-point rubric rewarding working functionality and verifiable development effort.
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
            <div style={{ width: "25%" }} className="bg-[#e0b885]" title="Working MVP (25pts)" />
            <div style={{ width: "25%" }} className="bg-[#edd2b1]" title="Verified Effort (25pts)" />
            <div style={{ width: "15%" }} className="bg-[#c49a65]" title="Technical Implementation (15pts)" />
            <div style={{ width: "15%" }} className="bg-[#af8654]" title="Team Contribution (15pts)" />
            <div style={{ width: "10%" }} className="bg-[#8d693d]" title="Deployment (10pts)" />
            <div style={{ width: "5%" }} className="bg-[#71522d]" title="Documentation (5pts)" />
            <div style={{ width: "5%" }} className="bg-[#563c1f]" title="Demonstration (5pts)" />
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-[#d6cec2]">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e0b885]" /> MVP: 25 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#edd2b1]" /> Verified: 25 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c49a65]" /> Tech: 15 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#af8654]" /> Squad: 15 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8d693d]" /> Deploy: 10 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#71522d]" /> Docs: 5 pts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#563c1f]" /> Demo: 5 pts
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
