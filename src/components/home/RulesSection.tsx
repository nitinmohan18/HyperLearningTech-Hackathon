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
              Rules & <span className="font-serif italic text-[#e0b885]">Guidelines</span>
            </h2>
            <p className="section-copy">
              Clear, transparent operational policies governing eligibility, AI assistance, repository integrity, and intellectual property.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/rules"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#e0b885] hover:text-white transition-colors"
            >
              Full Rules Document <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* 8 Expandable Accordion Groups - Clean rows */}
        <div className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {rulesData.map((group) => {
            const isOpen = openGroup === group.id;

            return (
              <div
                key={group.id}
                className="transition-colors hover:bg-white/[0.01]"
              >
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className="flex w-full items-center justify-between py-5 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 pr-4">
                    <Shield size={18} className="text-[#e0b885] shrink-0" />
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                        {group.category}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#d6cec2]">
                        {group.summary}
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-[#b8ada0] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#e0b885]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pb-6 pt-1 space-y-4">
                    {group.rules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="border-l border-white/[0.12] pl-4 py-1"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-serif text-base font-normal text-white">
                            {rule.title}
                          </h4>
                          {rule.tag && (
                            <span className="font-mono text-[10px] text-[#e0b885]">
                              {rule.tag}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-[#d6cec2]">
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
