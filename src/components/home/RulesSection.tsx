"use client";

import { useState } from "react";
import { ChevronDown, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { rulesData } from "@/data/rules";

export default function RulesSection() {
  const [openGroup, setOpenGroup] = useState<string | null>("eligibility");

  const toggleGroup = (id: string) => {
    setOpenGroup((prev) => (prev === id ? null : id));
  };

  return (
    <section id="rules" className="section-pad border-b border-sand-border/20 bg-cream">
      <div className="container-site">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Fair Competition Standards</p>
            <h2 className="section-title">
              Rules & <span className="font-serif italic text-[#c89f6d]">Guidelines</span>
            </h2>
            <p className="section-copy">
              Clear, transparent operational policies governing eligibility, AI assistance, repository integrity, and intellectual property.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/rules"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#c89f6d] hover:text-[#f0eae1] transition-colors"
            >
              Full Rules Document <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* 8 Expandable Accordion Groups */}
        <div className="mt-12 space-y-3">
          {rulesData.map((group) => {
            const isOpen = openGroup === group.id;

            return (
              <div
                key={group.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "border-[#c89f6d]/45 bg-[#16100c]/70 shadow-md"
                    : "border-sand-border/15 bg-[#120d09]/40 hover:border-sand-border/30"
                } backdrop-blur-xl`}
              >
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
                      <Shield size={16} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#f0eae1]">
                        {group.category}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#9e8e7c]">
                        {group.summary}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-sand-border/20 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#c89f6d]" : "text-[#8e7a68]"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-sand-border/15 p-5 sm:p-6 pt-4 space-y-4">
                    {group.rules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-sand-border/10 bg-[#120d09]/50 p-4 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-serif text-base font-normal text-[#f0eae1]">
                            {rule.title}
                          </h4>
                          {rule.tag && (
                            <span className="rounded-full border border-sand-border/25 bg-[#1e1712]/50 px-2.5 py-0.5 font-mono text-[10px] text-[#c89f6d]">
                              {rule.tag}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#9e8e7c]">
                          {rule.description}
                        </p>
                      </div>
                    ))}
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
