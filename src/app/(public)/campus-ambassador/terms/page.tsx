import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { campusAmbassadorData } from "@/data/campus-ambassador";

export const metadata: Metadata = {
  title: "Campus Ambassador Terms & Privacy",
  description:
    "Program conduct, eligibility, referral attribution rules, and privacy notice for the HyperLearningTech Campus Ambassador Program.",
};

export default function CampusAmbassadorTermsPage() {
  return (
    <div className="bg-[#0d0a08] min-h-screen">
      <div className="container-site section-pad max-w-3xl">
        <Link
          href="/campus-ambassador"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#e0b885] hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Campus Ambassador</span>
        </Link>

        <div className="mt-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#e0b885]">
            Program Conduct & Privacy
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
            Ambassador <span className="italic text-[#ffd89b]">Terms & Notice</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#cfc6ba]">
            Guidelines governing eligibility, ethical promotion, Unstop referral attribution, and participant data protection for Winter Hackathon ’26.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {campusAmbassadorData.termsSections.map((section) => (
            <section key={section.id} className="glass p-6 sm:p-8">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#ffd89b]">
                {section.title}
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#d6cec2]">
                {section.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e0b885]"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-10 glass glass-gold p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#e0b885]" />
            <div className="text-xs sm:text-sm text-[#e2d8ca]">
              Questions or data correction/deletion requests? Email{" "}
              <a
                href="mailto:admin@hyperlearningtech.in"
                className="text-[#ffd89b] underline underline-offset-4 hover:text-white"
              >
                admin@hyperlearningtech.in
              </a>
              .
            </div>
          </div>
          <Link href="/campus-ambassador/apply" className="btn-primary shrink-0">
            <span>Apply Now</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
