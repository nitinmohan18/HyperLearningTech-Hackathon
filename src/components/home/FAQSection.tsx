"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { faqs } from "@/data/faq";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Participation", "Development", "GitHub", "Evaluation", "Prizes"];

  const filteredFaqs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  return (
    <section id="faq" className="section-pad border-b border-sand-border/20 bg-cream-alt backdrop-blur-md">
      <div className="container-site">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Clear Answers</p>
          <h2 className="section-title">
            Frequently Asked <span className="font-serif italic text-[#c89f6d]">Questions</span>
          </h2>
          <p className="section-copy mx-auto">
            Everything you need to know about format, timeline, repository inspection, scoring, and awards before you build.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(null);
              }}
              className={`rounded-full px-4 py-1.5 font-mono text-xs transition-all ${
                selectedCategory === cat
                  ? "bg-[#f0eae1] text-[#120d09] font-semibold shadow-sm"
                  : "border border-sand-border/25 bg-[#120d09]/40 text-[#8e7a68] hover:text-[#f0eae1]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="mt-8 max-w-3xl mx-auto rounded-2xl border border-sand-border/15 bg-[#120d09]/45 p-3 sm:p-5 backdrop-blur-xl">
          <div className="divide-y divide-sand-border/15">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={idx} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition-colors hover:text-[#f0eae1]"
                    aria-expanded={isOpen}
                  >
                    <span className="pr-4 font-serif text-lg sm:text-xl font-normal text-[#f0eae1]">
                      {faq.question}
                    </span>
                    <div
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl border transition-all ${
                        isOpen
                          ? "border-[#c89f6d]/50 bg-[#c89f6d]/15 text-[#c89f6d]"
                          : "border-sand-border/20 bg-[#16100c]/60 text-[#8e7a68]"
                      }`}
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 pt-1 sm:px-5">
                      <p className="text-xs sm:text-sm leading-relaxed text-[#9e8e7c]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Support Link */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#8e7a68]">
            Still have questions? Check the{" "}
            <Link href="/rules" className="text-[#c89f6d] underline hover:text-[#f0eae1]">
              official rules
            </Link>{" "}
            or register early to receive pre-event briefings.
          </p>
        </div>
      </div>
    </section>
  );
}
