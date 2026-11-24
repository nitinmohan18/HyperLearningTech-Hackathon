"use client";

import { useState } from "react";
import { HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { faqs } from "@/data/faq";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogContainer,
} from "@/components/core/morphing-dialog";

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Participation", "Development", "GitHub", "Evaluation", "Prizes"];

  const filteredFaqs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  return (
    <section id="faq" className="section-pad border-b border-white/[0.08] bg-cream-alt">
      <div className="container-site">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Clear Answers</p>
          <h2 className="section-title">
            Frequently Asked <span className="font-serif italic text-[#e0b885]">Questions</span>
          </h2>
          <p className="section-copy mx-auto">
            Everything you need to know about format, timeline, repository inspection, scoring, and awards before you build. Tap any question to view the full specification.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1 text-[11px] sm:px-4 sm:py-1.5 sm:text-xs font-mono transition-colors ${
                selectedCategory === cat
                  ? "bg-white/[0.15] text-white font-medium border border-white/20"
                  : "text-[#b8ada0] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Morphing Dialog FAQ List */}
        <div className="mt-10 max-w-3xl mx-auto divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {filteredFaqs.map((faq, idx) => {
            return (
              <MorphingDialog
                key={`${selectedCategory}-${idx}`}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 24,
                }}
              >
                <MorphingDialogTrigger
                  className="group flex w-full items-center justify-between py-5 text-left transition-all duration-200 hover:bg-white/[0.02] cursor-pointer"
                >
                  <div className="flex flex-col pr-4">
                    <MorphingDialogSubtitle className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#e0b885] mb-1">
                      {faq.category} · Specification
                    </MorphingDialogSubtitle>
                    <MorphingDialogTitle className="font-serif text-lg sm:text-xl font-normal text-white group-hover:text-[#ffd89b] transition-colors">
                      {faq.question}
                    </MorphingDialogTitle>
                  </div>
                  <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full border border-white/[0.12] bg-[#140e09]/50 text-[#cfc1af] group-hover:border-[#e0b885]/40 group-hover:text-white transition-all">
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </MorphingDialogTrigger>

                <MorphingDialogContainer>
                  <MorphingDialogContent
                    className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#120c08] p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_0_1px_rgba(224,184,133,0.15)]"
                  >
                    <MorphingDialogClose />

                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e0b885]/15 border border-[#e0b885]/30 text-[10.5px] font-mono tracking-wider text-[#ffd89b] uppercase">
                        <Sparkles size={11} /> {faq.category}
                      </span>
                    </div>

                    <MorphingDialogTitle className="font-serif text-2xl sm:text-3xl font-normal text-white leading-tight">
                      {faq.question}
                    </MorphingDialogTitle>

                    <div className="my-5 h-[1px] w-full bg-gradient-to-r from-white/[0.15] via-white/[0.05] to-transparent" />

                    <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed text-[#d6cec2]">
                      <p>{faq.answer}</p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#b8ada0] font-mono">
                      <span>HyperLearningTech Hackathon ’26</span>
                      <span className="text-[#e0b885]">Official Guideline</span>
                    </div>
                  </MorphingDialogContent>
                </MorphingDialogContainer>
              </MorphingDialog>
            );
          })}
        </div>

        {/* Bottom Support Link */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#b8ada0]">
            Still have questions? Check the{" "}
            <Link href="/rules" className="text-[#e0b885] underline hover:text-white">
              official rules
            </Link>{" "}
            or register early to receive pre-event briefings.
          </p>
        </div>
      </div>
    </section>
  );
}
