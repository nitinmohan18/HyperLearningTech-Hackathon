import Link from "next/link";
import Logo from "./Logo";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#0c0806]/95 md:backdrop-blur-2xl">
      <div className="container-site py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8 items-start">
          {/* Brand Column: Clean, minimal editorial typography without clutter */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Logo size="default" showSubtitle={false} />
            </Link>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#e0b885]">
              Winter Hackathon ’26 · 1st Edition
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs font-mono text-[#a89d90]">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>24-Hour Online</span>
              </span>
              <span>·</span>
              <span>26–27 Dec 2026</span>
            </div>
            <div className="mt-3.5 space-y-1.5 text-xs font-mono">
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
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#8e8275] font-semibold">
                Event
              </p>
              <ul className="mt-3.5 space-y-2 text-xs">
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
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#8e8275] font-semibold">
                Participation
              </p>
              <ul className="mt-3.5 space-y-2 text-xs">
                <li>
                  <Link href="/register" className="text-[#d6cec2] transition-colors hover:text-white">
                    Register (Solo / Squad)
                  </Link>
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

            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#8e8275] font-semibold">
                Governance
              </p>
              <ul className="mt-3.5 space-y-2 text-xs">
                <li>
                  <Link href="/rules" className="text-[#d6cec2] transition-colors hover:text-white">
                    Official Rules
                  </Link>
                </li>
                <li>
                  <Link href="/certificates" className="text-[#d6cec2] transition-colors hover:text-white">
                    Certificate Verification
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
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#8a7f72]">
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
