import Link from "next/link";
import { Users, ArrowRight, ShieldCheck, Mail, Globe, Lock } from "lucide-react";
import { event } from "@/data/event";

export default function ContactCTASection() {
  return (
    <section id="contact" className="section-pad bg-cream text-center">
      <div className="container-site max-w-4xl">
        {/* Top Icon Badge */}
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-sand-border/25 bg-[#1c140d]/70 text-[#c89f6d] shadow-sm">
          <Users size={24} />
        </div>

        {/* Invitation Heading */}
        <h2 className="mt-8 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] text-[#f0eae1]">
          Bring the idea. <br />
          <span className="font-serif italic text-[#c89f6d]">Build the proof.</span>
        </h2>

        <p className="mt-6 text-base leading-relaxed text-[#9e8e7c] sm:text-lg max-w-2xl mx-auto">
          Registrations close on 25 December 2026. Join as a solo builder for {event.soloFee} or bring a squad of 2–4 for {event.squadFee} flat. 24 hours of focused engineering, verified repository progress, and ₹8,789 in direct cash awards.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/register" className="btn-primary h-12 px-8 text-sm font-semibold">
            Register for Winter Hackathon ’26 →
          </Link>
          <Link href="/login" className="btn-secondary h-12 px-7 text-sm">
            Participant Login
          </Link>
        </div>

        {/* Official Organizer & Verification Footer Box */}
        <div className="mt-16 rounded-2xl border border-sand-border/20 bg-[#120d09]/45 p-6 sm:p-8 text-left backdrop-blur-xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c89f6d]">
                Organised By
              </p>
              <h3 className="mt-1 font-serif text-2xl font-normal text-[#f0eae1]">
                {event.organiser}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#9e8e7c]">
                Winter Hackathon ’26 is an independently organised online build challenge committed to genuine engineering progress and verifiable execution.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[#8e7a68]">
                <a
                  href={`https://${event.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#f0eae1] transition-colors"
                >
                  <Globe size={13} className="text-[#c89f6d]" />
                  <span>{event.website}</span>
                </a>
                <span>·</span>
                <span className="text-[#f0eae1]">{event.tagline}</span>
              </div>
            </div>

            <div className="border-t border-sand-border/15 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c89f6d]">
                Participant Privacy & Terms
              </p>
              <div className="mt-2 space-y-2 text-xs text-[#9e8e7c]">
                <div className="flex items-start gap-2">
                  <Lock size={14} className="mt-0.5 shrink-0 text-[#8e7a68]" />
                  <span>
                    Payment & UPI details are restricted to authorized organizers and will never be published publicly.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[#8e7a68]" />
                  <span>
                    Participants retain 100% intellectual property ownership of all code and inventions.
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-3 text-xs font-mono">
                <Link href="/rules" className="text-[#c89f6d] hover:text-[#f0eae1] transition-colors underline">
                  Event Rules
                </Link>
                <span className="text-sand-border">·</span>
                <Link href="/faq" className="text-[#c89f6d] hover:text-[#f0eae1] transition-colors underline">
                  FAQ
                </Link>
                <span className="text-sand-border">·</span>
                <Link href="/certificates" className="text-[#c89f6d] hover:text-[#f0eae1] transition-colors underline">
                  Certificate Verification
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
