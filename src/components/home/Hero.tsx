import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Zap, CheckCircle2, Trophy, Globe } from "lucide-react";
import { event } from "@/data/event";
import Clock from "./Clock";

export default function Hero() {
  return (
    <section id="hero" className="relative border-b border-sand-border/20 bg-cream">
      <div className="container-site relative grid items-center gap-8 py-10 sm:gap-12 sm:py-20 lg:min-h-[640px] lg:grid-cols-[1.25fr_0.75fr] lg:py-24">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d6ad6a]/40 bg-[#16100c]/80 backdrop-blur-md px-3 py-1 text-xs text-[#f5dfb8] shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f3c27e] animate-pulse" />
            <span className="font-mono uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[9.5px] sm:text-[11px] font-semibold text-[#f7e2c0]">
              1st Edition · Online · 24-Hour Build Challenge
            </span>
          </div>

          <h1 className="mt-4 sm:mt-5 font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#ffffff] drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
            HyperLearningTech <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#ffd89b] drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
              Winter Hackathon ’26
            </span>
          </h1>

          <div className="mt-3 sm:mt-4 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.28em] text-[#f4cb89] font-bold drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
            <span>{event.tagline}</span>
          </div>

          <p className="mt-4 sm:mt-6 max-w-xl text-sm leading-relaxed text-[#f3ece0] sm:text-base lg:text-lg font-normal drop-shadow-[0_1px_12px_rgba(0,0,0,0.85)]">
            A live 24-hour online engineering challenge to build a working, useful software project with provable repository history, transparent progress, and direct cash awards.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs sm:text-sm text-[#f0e8dc] drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-[#f5cb87] shrink-0" />
              <span className="text-white font-semibold">26–27 December 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock3 size={15} className="text-[#d8c8b4] shrink-0" />
              <span className="text-[#f5efe5]">10:00 PM IST – 10:00 PM IST (24h)</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={15} className="text-[#d8c8b4] shrink-0" />
              <span className="text-[#f5efe5]">Fully Online</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/register" className="btn-primary w-full sm:w-auto text-center justify-center">
              Register Now →
            </Link>
            <a href="#overview" className="btn-secondary w-full sm:w-auto text-center justify-center">
              Explore Event
            </a>
          </div>
        </div>

        {/* Free-standing 3D Countdown Clock & Build Window Info */}
        <div className="flex flex-col items-center justify-center">
          <Clock />

          <div className="mt-4 sm:mt-5 w-full max-w-[340px] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#d6cec2]">
                <Zap size={13} className="text-[#e0b885] shrink-0" /> Build Window:
              </span>
              <span className="font-mono text-white font-medium">24 Hours Continuous</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#d6cec2]">
                <CheckCircle2 size={13} className="text-[#b8ada0] shrink-0" /> Submission Deadline:
              </span>
              <span className="font-mono text-white font-medium">27 Dec · 10:00 PM IST</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#d6cec2]">
                <Trophy size={13} className="text-[#e0b885] shrink-0" /> Results Declaration:
              </span>
              <span className="font-mono text-[#e0b885] font-semibold">27 Dec · 11:00 PM IST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
