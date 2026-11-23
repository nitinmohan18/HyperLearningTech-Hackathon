import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-sand-border/15 bg-[#0d0a08]/80 backdrop-blur-xl">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-block transition-opacity hover:opacity-90">
            <Logo size="default" showSubtitle={false} />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#9e8e7c]">
            An independently organised, 24-hour online technology hackathon built for serious participation, inspectable code, and genuine execution.
          </p>
          <div className="mt-6 flex items-center gap-2 font-mono text-xs text-[#8e7a68]">
            <span className="text-[#c89f6d]">✦</span>
            <span>Winter Hackathon ’26 · 1st Edition</span>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-sand-muted">
            Event & Info
          </p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <Link href="/about" className="text-sand-muted transition-colors hover:text-espresso">
              About the Event
            </Link>
            <Link href="/prizes" className="text-sand-muted transition-colors hover:text-espresso">
              Prize Distribution
            </Link>
            <Link href="/schedule" className="text-sand-muted transition-colors hover:text-espresso">
              IST Schedule
            </Link>
            <Link href="/rules" className="text-sand-muted transition-colors hover:text-espresso">
              Rules & Guidelines
            </Link>
            <Link href="/certificates" className="text-sand-muted transition-colors hover:text-espresso">
              Certificate Verification
            </Link>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-sand-muted">
            Participation
          </p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <Link href="/register" className="text-sand-muted transition-colors hover:text-espresso">
              Register (Solo & Squad)
            </Link>
            <Link href="/login" className="text-sand-muted transition-colors hover:text-espresso">
              Participant Login
            </Link>
            <Link href="/dashboard" className="text-sand-muted transition-colors hover:text-espresso">
              Participant Dashboard
            </Link>
            <Link href="/leaderboard" className="text-sand-muted transition-colors hover:text-espresso">
              Live Leaderboard
            </Link>
            <Link href="/faq" className="text-sand-muted transition-colors hover:text-espresso">
              Frequently Asked Questions
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-sand-border/20 bg-[#0d0a08]/80">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 font-mono text-xs text-sand-muted sm:flex-row">
          <span>© 2026 HyperLearningTech. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            <span className="text-espresso-body">Official Portal: hackathon.hyperlearningtech.in</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
