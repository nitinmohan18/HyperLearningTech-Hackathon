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

        {/* Grouped Accordion Container */}
        <div className="mt-14 max-w-3xl rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-2 backdrop-blur-xl sm:p-4">
          <div className="divide-y divide-sand-border/15">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.question} className="transition-colors">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between p-5 text-left transition-colors hover:text-[#f0eae1]"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="pr-4 font-serif text-xl font-normal text-[#f0eae1] sm:text-2xl">
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
                    <div className="px-5 pb-5 pt-1">
                      <p className="text-sm leading-relaxed text-[#9e8e7c]">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Help Card */}
        <div className="mt-12 max-w-3xl rounded-2xl border border-sand-border/20 bg-[#16100c]/40 p-7 sm:flex sm:items-center sm:justify-between backdrop-blur-xl">
          <div className="flex items-center gap-3.5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
              <HelpCircle size={18} />
            </div>
            <div>
              <p className="font-serif text-lg font-normal text-[#f0eae1]">
                Have a question not listed here?
              </p>
              <p className="text-xs text-[#9e8e7c]">
                Read our complete competition rules or register to receive pre-event briefings.
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-3 sm:mt-0">
            <Link href="/rules" className="btn-secondary">
              Rules
            </Link>
            <Link href="/register" className="btn-primary">
              Register <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
