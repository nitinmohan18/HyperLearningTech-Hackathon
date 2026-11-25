import Link from "next/link";
import { ShieldCheck, Globe, Lock } from "lucide-react";
import { event } from "@/data/event";

export default function ContactCTASection() {
  return (
    <section id="contact" className="section-pad bg-cream text-center">
      <div className="container-site max-w-4xl">
        {/* Official Organizer & Verification Footer Box - Clean open boundary */}
        <div className="border-t border-white/[0.08] pt-12 text-left">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0b885]">
                Organised By
              </p>
              <h3 className="mt-1 font-serif text-2xl font-normal text-white">
                {event.organiser}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#d6cec2]">
                Winter Hackathon ’26 is an independently organised online build challenge committed to genuine engineering progress and verifiable execution.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[#b8ada0]">
                <a
                  href={`https://${event.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Globe size={13} className="text-[#e0b885]" />
                  <span>{event.website}</span>
                </a>
                <span>·</span>
                <span className="text-white">{event.tagline}</span>
              </div>
            </div>

            <div className="border-t border-white/[0.08] pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0b885]">
                Participant Privacy & Terms
              </p>
              <div className="mt-3 space-y-2.5 text-xs text-[#d6cec2]">
                <div className="flex items-start gap-2.5">
                  <Lock size={14} className="mt-0.5 shrink-0 text-[#b8ada0]" />
                  <span>
                    Payment & UPI details are restricted to authorized organizers and will never be published publicly.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[#b8ada0]" />
                  <span>
                    Participants retain 100% intellectual property ownership of all code and inventions.
                  </span>
                </div>
              </div>

              <div className="mt-5 flex gap-3 text-xs font-mono">
                <Link href="/rules" className="text-[#e0b885] hover:text-white transition-colors underline">
                  Event Rules
                </Link>
                <span className="text-white/20">·</span>
                <Link href="/faq" className="text-[#e0b885] hover:text-white transition-colors underline">
                  FAQ
                </Link>
                <span className="text-white/20">·</span>
                <Link href="/certificates" className="text-[#e0b885] hover:text-white transition-colors underline">
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
