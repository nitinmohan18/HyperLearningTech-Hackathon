import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Timer, Zap, CheckCircle2, Trophy, Globe, Flame } from "lucide-react";
import { event } from "@/data/event";
import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-sand-border/20 bg-cream">
      {/* Warm ambient radial background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_-10%,rgba(150,119,86,0.12),transparent_70%)]" />

      <div className="container-site relative grid min-h-[660px] items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sand-border/30 bg-[#140e0a]/60 px-3.5 py-1 text-xs text-[#c89f6d] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c89f6d] animate-pulse" />
            <span className="font-mono uppercase tracking-[0.22em] text-[11px]">
              1st Edition · Online · 24-Hour Build Challenge
            </span>
          </div>

          <h1 className="mt-5 font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight text-[#f0eae1]">
            HyperLearningTech <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#c89f6d]">
              Winter Hackathon ’26
            </span>
          </h1>

          <div className="mt-4 font-mono text-xs uppercase tracking-[0.28em] text-[#c89f6d] font-semibold">
            <span>{event.tagline}</span>
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#9e8e7c] sm:text-lg">
            A live 24-hour online engineering challenge to build a working, useful software project with provable repository history, transparent progress, and direct cash awards.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-[#9e8e7c]">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-[#c89f6d]" />
              <span className="text-[#f0eae1] font-medium">26–27 December 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock3 size={16} className="text-[#8e7a68]" />
              <span>10:00 PM IST – 10:00 PM IST (24h)</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-[#8e7a68]" />
              <span>Fully Online</span>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/register" className="btn-primary">
              Register Now →
            </Link>
            <a href="#overview" className="btn-secondary">
              Explore Event
            </a>
          </div>
        </div>

        {/* Countdown & Build Window Card */}
        <div className="rounded-2xl border border-sand-border/20 bg-[#120d09]/45 p-6 shadow-card backdrop-blur-xl sm:p-7">
          <div className="mb-5 flex items-center justify-between border-b border-sand-border/20 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
                <Timer size={16} />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#8e7a68]">
                  Competition starts in
                </p>
                <p className="font-mono text-xs font-semibold text-[#f0eae1]">
                  26 Dec 2026 · 10:00 PM IST
                </p>
              </div>
            </div>
            <span className="font-mono text-[11px] text-[#c89f6d]">
              IST UTC+5:30
            </span>
          </div>

          <Countdown />

          <div className="mt-6 space-y-3 border-t border-sand-border/20 pt-5 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#9e8e7c]">
                <Zap size={14} className="text-[#c89f6d]" /> Build Window:
              </span>
              <span className="font-mono text-[#f0eae1] font-medium">24 Hours Continuous</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#9e8e7c]">
                <CheckCircle2 size={14} className="text-[#8e7a68]" /> Submission Deadline:
              </span>
              <span className="font-mono text-[#f0eae1] font-medium">27 Dec · 10:00 PM IST</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#9e8e7c]">
                <Trophy size={14} className="text-[#c89f6d]" /> Results Declaration:
              </span>
              <span className="font-mono text-[#c89f6d] font-semibold">27 Dec · 11:00 PM IST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
