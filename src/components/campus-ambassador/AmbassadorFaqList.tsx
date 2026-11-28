"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { AmbassadorFaq } from "@/data/campus-ambassador";
import { cn } from "@/lib/utils";

export function AmbassadorFaqList({ faqs }: { faqs: readonly AmbassadorFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={faq.question} className="py-4 sm:py-5">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 text-left focus:outline-none group"
            >
              <span
                className={cn(
                  "font-serif text-lg sm:text-xl font-normal transition-colors",
                  isOpen ? "text-[#ffd89b]" : "text-white group-hover:text-[#ffd89b]"
                )}
              >
                {faq.question}
              </span>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-[#e0b885] transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <p className="mt-2.5 pr-6 text-sm leading-relaxed text-[#cfc6ba]">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
