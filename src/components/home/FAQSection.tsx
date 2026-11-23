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
    <section id="faq" className="section-pad border-b border-white/[0.08] bg-cream-alt">
      <div className="container-site">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Clear Answers</p>
          <h2 className="section-title">
            Frequently Asked <span className="font-serif italic text-[#e0b885]">Questions</span>
          </h2>
          <p className="section-copy mx-auto">
            Everything you need to know about format, timeline, repository inspection, scoring, and awards before you build.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(null);
              }}
              className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${
                selectedCategory === cat
                  ? "bg-white/[0.15] text-white font-medium border border-white/20"
                  : "text-[#b8ada0] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List - Clean open rows */}
        <div className="mt-10 max-w-3xl mx-auto divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="transition-colors hover:bg-white/[0.01]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between py-5 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 font-serif text-lg sm:text-xl font-normal text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#b8ada0] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#e0b885]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pb-5 pt-1 pr-6">
                    <p className="text-xs sm:text-sm leading-relaxed text-[#d6cec2]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
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
