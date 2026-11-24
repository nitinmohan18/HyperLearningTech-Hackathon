"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Zap, CheckCircle2, Trophy, Globe } from "lucide-react";
import { event } from "@/data/event";
import Clock from "./Clock";
import { TextRoll } from "@/components/core/text-roll";
import { CreepyButton } from "@/components/core/creepy-button";
import LuxuryBackground from "@/components/common/LuxuryBackground";

export default function Hero() {
  return (
    <section id="hero" className="relative border-b border-sand-border/20">
      <div className="container-site relative z-10 grid items-center gap-8 py-10 sm:gap-12 sm:py-20 lg:min-h-[640px] lg:grid-cols-[1.25fr_0.75fr] lg:py-24">
        <div className="relative z-10 flex flex-col justify-center">
          {/* Main Title Hierarchy */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-normal leading-[1.04] tracking-tight text-[#ffffff] drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
            HyperLearningTech <br />
            <span className="font-serif italic font-normal text-[#ffd89b] drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
              Winter Hackathon ’26
            </span>
          </h1>

          {/* Tagline: pure typography without pill container */}
          <div className="mt-4 sm:mt-5">
            <span className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.3em] text-[#fff6e5] [text-shadow:_0_1px_3px_rgba(0,0,0,1),_0_2px_12px_rgba(0,0,0,0.95),_0_4px_24px_rgba(0,0,0,0.9)]">
              {event.tagline}
            </span>
          </div>

          {/* Description Paragraph with high-contrast text and crisp legibility */}
          <p className="mt-4 sm:mt-6 max-w-xl text-sm leading-relaxed text-[#f7f2ea] sm:text-base lg:text-lg font-normal drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            A live 24-hour online engineering challenge to build a working, useful software project with provable repository history, transparent progress, and direct cash awards.
          </p>

          {/* Event metadata line */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs sm:text-sm text-[#f5efe5] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-[#e0b885] shrink-0" />
              <span className="text-white font-semibold">26–27 December 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock3 size={15} className="text-[#cfc1af] shrink-0" />
              <span className="text-[#f7f3ec]">10:00 PM IST – 10:00 PM IST (24h)</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={15} className="text-[#cfc1af] shrink-0" />
              <span className="text-[#f7f3ec]">Fully Online</span>
            </div>
          </div>

          {/* Action Buttons with Creepy Peek-Eye Effect */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/register" className="w-full sm:w-auto">
              <CreepyButton
                className="w-full sm:w-auto min-h-[48px]"
                coverClassName="bg-gradient-to-b from-[#fbf8f3] to-[#e8decb] text-[#18110b] font-semibold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.9)]"
              >
                <span className="flex items-center gap-2">
                  <span>Register Now</span>
                  <ArrowRight size={15} />
                </span>
              </CreepyButton>
            </Link>

            <a href="#overview" className="w-full sm:w-auto">
              <CreepyButton
                className="w-full sm:w-auto min-h-[48px]"
                coverClassName="border border-white/[0.14] bg-[#221810] text-[#f5efe5] font-medium text-sm backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
              >
                <span>Explore Event</span>
              </CreepyButton>
            </a>
          </div>
        </div>

        {/* Free-standing 3D Countdown Clock & Build Window Info */}
        <div className="flex flex-col items-center justify-center">
          <Clock />

          {/* Bespoke Editorial Metadata Strip under Clock */}
          <div className="mt-5 sm:mt-6 w-full max-w-[360px] divide-y divide-white/[0.08] border-y border-white/[0.1] py-1">
            <div className="flex items-center justify-between py-2 text-xs">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#b8ada0]">
                <TextRoll className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#b8ada0]">
                  BUILD WINDOW
                </TextRoll>
              </span>
              <span className="font-mono text-xs font-medium text-[#f5efe5]">
                <TextRoll className="font-mono text-xs font-medium text-[#f5efe5]">
                  24 Hours Continuous
                </TextRoll>
              </span>
            </div>
            <div className="flex items-center justify-between py-2 text-xs">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#b8ada0]">
                <TextRoll className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#b8ada0]">
                  SUBMISSION FREEZE
                </TextRoll>
              </span>
              <span className="font-mono text-xs font-medium text-white">
                <TextRoll className="font-mono text-xs font-medium text-white">
                  27 Dec · 10:00 PM IST
                </TextRoll>
              </span>
            </div>
            <div className="flex items-center justify-between py-2 text-xs">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#b8ada0]">
                <TextRoll className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#b8ada0]">
                  WINNER DECLARATION
                </TextRoll>
              </span>
              <span className="font-mono text-xs font-semibold text-[#e0b885]">
                <TextRoll className="font-mono text-xs font-semibold text-[#e0b885]">
                  27 Dec · 11:00 PM IST
                </TextRoll>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
