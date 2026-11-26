"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
import { VerticalElasticStack } from "@/components/ui/ElasticStack";

const DIALOG_TRANSITION = {
  type: "spring" as const,
  stiffness: 260,
  damping: 26,
};

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
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">
            Before You <span className="font-serif italic text-[#e0b885]">Build</span>
          </h2>
          <p className="section-copy mx-auto">
            Quick answers on format, rules, and judging.
          </p>
        </div>

        {/* Clean Editorial Category Tabs (Single Scrollable Row on Mobile, Centered on Desktop) */}
        <div className="mt-7 sm:mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="FAQ categories"
            className="flex w-full sm:w-auto sm:inline-flex items-center justify-start sm:justify-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-x-5 sm:gap-x-8 border-b border-white/[0.08] px-1"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative shrink-0 whitespace-nowrap pb-2.5 sm:pb-3 text-[10.5px] sm:text-xs font-mono uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-colors duration-200 ${
                    isActive
                      ? "text-[#fff5e4] font-semibold"
                      : "text-[#8e8070] hover:text-[#ebe2d5]"
                  }`}
                >
                  <span>{cat}</span>
                  {isActive && (
                    <motion.span
                      layoutId="faq-active-tab"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-gradient-to-r from-[#c89f6d]/70 via-[#ffd89b] to-[#c89f6d]/70"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* GPU-Smooth Vertical Elastic Stack FAQ List */}
        <VerticalElasticStack
          className="mt-6 sm:mt-8 max-w-3xl mx-auto"
          items={filteredFaqs}
          overlap={10}
          pushForce={10}
          hoverScale={1.016}
          getKey={(faq, idx) => `${selectedCategory}-${faq.question}-${idx}`}
          renderItem={(faq) => (
            <MorphingDialog transition={DIALOG_TRANSITION}>
              <MorphingDialogTrigger
                className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#231811] via-[#17100b] to-[#110c08] px-4 sm:px-6 pt-4 pb-6 sm:pt-5 sm:pb-6 text-left shadow-[0_8px_24px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,235,205,0.08)] cursor-pointer"
              >
                {/* Hover border + top specular rim via GPU opacity only (zero shadow repaint) */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-[#e0b885]/45 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <div className="pointer-events-none absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#f5deb3]/55 to-transparent opacity-25 transition-opacity duration-200 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-col pr-4 sm:pr-6">
                  <MorphingDialogSubtitle className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#c89f6d] mb-1 sm:mb-1.5">
                    {faq.category} · Specification
                  </MorphingDialogSubtitle>
                  <MorphingDialogTitle className="font-serif text-base sm:text-xl font-normal leading-snug text-white group-hover:text-[#ffe4bd] transition-colors duration-200">
                    {faq.question}
                  </MorphingDialogTitle>
                </div>
                <ArrowRight
                  size={15}
                  className="relative z-10 shrink-0 text-[#8e7a68] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#e0b885]"
                />
              </MorphingDialogTrigger>

              <MorphingDialogContainer>
                <MorphingDialogContent
                  className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[#e0b885]/20 bg-gradient-to-b from-[#231811] via-[#17100b] to-[#110c08] p-5 sm:p-9 shadow-[0_32px_80px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,235,205,0.2)]"
                >
                  {/* Top hairline specular highlight */}
                  <div className="pointer-events-none absolute top-0 inset-x-10 h-[1px] bg-gradient-to-r from-transparent via-[#f5deb3]/45 to-transparent" />

                  <MorphingDialogClose />

                  <MorphingDialogSubtitle className="font-mono text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#e0b885] mb-2 sm:mb-2.5">
                    {faq.category} · Specification
                  </MorphingDialogSubtitle>

                  <MorphingDialogTitle className="font-serif text-xl sm:text-[32px] font-normal text-[#faf5ee] leading-[1.22] sm:leading-[1.18] pr-8">
                    {faq.question}
                  </MorphingDialogTitle>

                  <div className="my-4 sm:my-5 h-[1px] w-full bg-white/[0.08]" />

                  <p className="text-sm sm:text-base leading-[1.7] text-[#dfd7cb]">
                    {faq.answer}
                  </p>

                  <div className="mt-6 sm:mt-8 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-[10.5px] sm:text-[11px] font-mono">
                    <span className="text-[#8e7a68]">
                      Official Guideline · Winter Hackathon ’26
                    </span>
                    <Link
                      href="/rules"
                      className="text-[#e0b885] hover:text-white transition-colors"
                    >
                      View Rules →
                    </Link>
                  </div>
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
          )}
        />

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
