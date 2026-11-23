import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0d0a08]/80 backdrop-blur-xl">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-block transition-opacity hover:opacity-90">
            <Logo size="default" showSubtitle={false} />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#d6cec2]">
            An independently organised, 24-hour online technology hackathon built for serious participation, inspectable code, and genuine execution.
          </p>
          <div className="mt-6 flex items-center gap-2 font-mono text-xs text-[#b8ada0]">
            <span className="text-[#e0b885]">✦</span>
            <span>Winter Hackathon ’26 · 1st Edition</span>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#b8ada0]">
            Event & Info
          </p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <Link href="/about" className="text-[#d6cec2] transition-colors hover:text-white">
              About the Event
            </Link>
            <Link href="/prizes" className="text-[#d6cec2] transition-colors hover:text-white">
              Prize Distribution
            </Link>
            <Link href="/schedule" className="text-[#d6cec2] transition-colors hover:text-white">
              IST Schedule
            </Link>
            <Link href="/rules" className="text-[#d6cec2] transition-colors hover:text-white">
              Rules & Guidelines
            </Link>
            <Link href="/certificates" className="text-[#d6cec2] transition-colors hover:text-white">
              Certificate Verification
            </Link>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#b8ada0]">
            Participation
          </p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <Link href="/register" className="text-[#d6cec2] transition-colors hover:text-white">
              Register (Solo & Squad)
            </Link>
            <Link href="/login" className="text-[#d6cec2] transition-colors hover:text-white">
              Participant Login
            </Link>
            <Link href="/dashboard" className="text-[#d6cec2] transition-colors hover:text-white">
              Participant Dashboard
            </Link>
            <Link href="/leaderboard" className="text-[#d6cec2] transition-colors hover:text-white">
              Live Leaderboard
            </Link>
            <Link href="/faq" className="text-[#d6cec2] transition-colors hover:text-white">
              Frequently Asked Questions
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08] bg-[#0d0a08]/80">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 font-mono text-xs text-[#b8ada0] sm:flex-row">
          <span>© 2026 HyperLearningTech. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e0b885]" />
            <span className="text-[#d6cec2]">Official Portal: hackathon.hyperlearningtech.in</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
