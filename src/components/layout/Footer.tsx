import Link from "next/link";
import Logo from "./Logo";
import { Mail, Phone } from "lucide-react";
import { event } from "@/data/event";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#0c0806]">
      {/* Authentic Handshake Studio Photography Background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/animated-footer/handshake-clasped.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-30 sm:opacity-40 mix-blend-screen filter contrast-105 saturate-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0806]/85 via-[#0c0806]/45 to-[#0c0806]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0806]/80 via-transparent to-[#0c0806]/75" />
      </div>

      <div className="container-site relative z-10 py-8 sm:py-16">
        <div className="grid gap-7 sm:gap-10 md:grid-cols-12 md:gap-8 items-start">
          {/* Brand Column: Clean, minimal editorial typography without clutter */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Logo size="default" showSubtitle={false} />
            </Link>
            <p className="mt-2 sm:mt-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#e0b885]">
              Winter Hackathon ’26 · 1st Edition
            </p>
            <div className="mt-2.5 sm:mt-4 flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1 text-[11.5px] sm:text-xs font-mono text-[#a89d90]">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>24-Hour Online</span>
              </span>
              <span>·</span>
              <span>26–27 Dec 2026</span>
            </div>
            <div className="mt-3 sm:mt-3.5 space-y-1.5 sm:space-y-2 text-[11.5px] sm:text-xs font-mono">
              <a
                href="mailto:admin@hyperlearningtech.in"
                className="flex items-center gap-2 text-[#d6cec2] hover:text-white transition-colors"
              >
                <Mail size={13} className="text-[#e0b885] shrink-0" />
                <span>admin@hyperlearningtech.in</span>
              </a>
              <a
                href="mailto:hyperlearningtech@gmail.com"
                className="flex items-center gap-2 text-[#d6cec2] hover:text-white transition-colors"
              >
                <Mail size={13} className="text-[#e0b885] shrink-0" />
                <span>hyperlearningtech@gmail.com</span>
              </a>
              <a
                href="tel:+919685617251"
                className="flex items-center gap-2 text-[#d6cec2] hover:text-white transition-colors"
              >
                <Phone size={13} className="text-[#e0b885] shrink-0" />
                <span>+91 9685617251</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-x-3 sm:gap-8">
            <div>
              <p className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.14em] sm:tracking-[0.22em] text-[#8e8275] font-semibold">
                Event
              </p>
              <ul className="mt-2.5 sm:mt-3.5 space-y-2 text-[11px] sm:text-xs">
                <li>
                  <Link href="#overview" className="text-[#d6cec2] transition-colors hover:text-white">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href="#prizes" className="text-[#d6cec2] transition-colors hover:text-white">
                    Prizes & Grants
                  </Link>
                </li>
                <li>
                  <Link href="#schedule" className="text-[#d6cec2] transition-colors hover:text-white">
                    Schedule (IST)
                  </Link>
                </li>
                <li>
                  <Link href="#judging" className="text-[#d6cec2] transition-colors hover:text-white">
                    Judging Criteria
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.14em] sm:tracking-[0.22em] text-[#8e8275] font-semibold">
                Participation
              </p>
              <ul className="mt-2.5 sm:mt-3.5 space-y-2 text-[11px] sm:text-xs">
                <li>
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d6cec2] transition-colors hover:text-white"
                  >
                    Register (Squad)
                  </a>
                </li>
                <li>
                  <Link href="/rules" className="text-[#d6cec2] transition-colors hover:text-white">
                    Official Rules
                  </Link>
                </li>
                <li>
                  <Link href="#schedule" className="text-[#d6cec2] transition-colors hover:text-white">
                    Event Schedule
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-[#d6cec2] transition-colors hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.14em] sm:tracking-[0.22em] text-[#8e8275] font-semibold">
                Governance
              </p>
              <ul className="mt-2.5 sm:mt-3.5 space-y-2 text-[11px] sm:text-xs">
                <li>
                  <Link href="/rules" className="text-[#d6cec2] transition-colors hover:text-white">
                    Official Rules
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@hyperlearningtech.in"
                    className="text-[#d6cec2] transition-colors hover:text-white"
                  >
                    Direct Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="mt-7 sm:mt-12 pt-4 sm:pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-center sm:text-left text-[11px] font-mono text-[#8a7f72]">
          <span>© 2026 HyperLearningTech. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e0b885]" />
            <span className="text-[#b8ada0]">hackathon.hyperlearningtech.in</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
