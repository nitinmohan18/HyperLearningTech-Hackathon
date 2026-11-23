"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import { faqs } from "@/data/faq";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-cream">
      <div className="container-site section-pad">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
            Support & Details
          </p>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#f0eae1]">
            Frequently asked <br />
            <span className="font-serif italic font-normal text-[#c89f6d]">
              questions.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9e8e7c] sm:text-lg">
            Everything you need to know about squad formats, GitHub collaboration, checkpoints, judging, and prize distribution.
          </p>
        </div>

        {/* Clean Accordion Rows */}
        <div className="mt-14 max-w-3xl divide-y divide-sand-border/15 border-y border-sand-border/15">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question} className="transition-colors hover:bg-white/[0.01]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-5 text-left transition-colors"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="pr-4 font-serif text-xl font-normal text-[#f0eae1] sm:text-2xl">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#8e7a68] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#c89f6d]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pb-5 pt-1 pr-6">
                    <p className="text-sm leading-relaxed text-[#9e8e7c]">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Callout */}
        <div className="mt-12 max-w-3xl border-l-2 border-[#c89f6d] bg-white/[0.02] p-5 text-sm sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle size={18} className="text-[#c89f6d] shrink-0" />
            <div>
              <h3 className="font-serif text-lg font-normal text-[#f0eae1]">
                Have a question not listed here?
              </h3>
              <p className="text-xs text-[#9e8e7c]">
                Reach out to our organizing team or check the competition rules.
              </p>
            </div>
          </div>
          <Link href="/rules" className="btn-secondary mt-3 shrink-0 sm:mt-0">
            View Rules <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
