import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { campusAmbassadorData } from "@/data/campus-ambassador";
import { AmbassadorFaqList } from "@/components/campus-ambassador/AmbassadorFaqList";

export const metadata: Metadata = {
  title: "Campus Ambassador Program",
  description:
    "Bring Winter Hackathon '26 to your campus. Refer student teams on Unstop and earn cash prizes and official recognition.",
};

export default function CampusAmbassadorPage() {
  return (
    <div className="bg-[#0d0a08] min-h-screen">
      <div className="container-site section-pad max-w-4xl">
        {/* Hero */}
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#e0b885]">
            {campusAmbassadorData.eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-white">
            {campusAmbassadorData.title} <br />
            <span className="italic text-[#ffd89b]">
              {campusAmbassadorData.titleAccent}
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#cfc6ba]">
            {campusAmbassadorData.heroCopy}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
            <Link
              href="/campus-ambassador/apply"
              className="btn-primary w-full sm:w-auto justify-center"
            >
              <span>Apply Now</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/campus-ambassador/submit-referral"
              className="btn-secondary w-full sm:w-auto justify-center"
            >
              <span>Submit Referral</span>
            </Link>
          </div>
        </header>

        {/* How It Works — Clean 4-Step Linear Flow */}
        <section className="mt-12 border-t border-white/[0.08] pt-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
            How it works
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {campusAmbassadorData.workflowSteps.map((item) => (
              <div
                key={item.step}
                className="border-t border-white/[0.12] pt-4"
              >
                <span className="font-mono text-xs text-[#e0b885]">
                  {item.step}
                </span>
                <h3 className="mt-1.5 font-serif text-lg text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#b8ada0]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Consistent 2-Column Editorial Rows */}
        <div className="mt-14 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {/* Who Can Apply */}
          <section className="py-8 sm:py-10 grid gap-4 md:grid-cols-[220px_1fr] md:gap-10">
            <div>
              <h2 className="font-serif text-2xl font-normal text-white">
                Who can apply
              </h2>
              <p className="mt-1 text-xs text-[#8e8275]">Open to everyone</p>
            </div>
            <ul className="space-y-2.5 text-sm leading-relaxed text-[#d6cec2]">
              {campusAmbassadorData.eligibility.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check size={15} className="mt-1 shrink-0 text-[#e0b885]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What You Do */}
          <section className="py-8 sm:py-10 grid gap-4 md:grid-cols-[220px_1fr] md:gap-10">
            <div>
              <h2 className="font-serif text-2xl font-normal text-white">
                What you do
              </h2>
              <p className="mt-1 text-xs text-[#8e8275]">Remote &amp; flexible</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {campusAmbassadorData.responsibilities.map((item) => (
                <div key={item.title}>
                  <h3 className="text-sm font-medium text-white">{item.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#b8ada0]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* What You Get */}
          <section className="py-8 sm:py-10 grid gap-4 md:grid-cols-[220px_1fr] md:gap-10">
            <div>
              <h2 className="font-serif text-2xl font-normal text-white">
                What you get
              </h2>
              <p className="mt-1 text-xs text-[#8e8275]">Verified rewards</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {campusAmbassadorData.benefits.map((item) => (
                <div key={item.title}>
                  <h3 className="text-sm font-medium text-[#ffd89b]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#b8ada0]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* FAQs */}
        <section className="mt-12 max-w-3xl">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
            Frequently asked questions
          </h2>
          <div className="mt-5">
            <AmbassadorFaqList faqs={campusAmbassadorData.faqs} />
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-12 pt-8 border-t border-white/[0.1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl text-white">Ready to apply?</h2>
            <p className="mt-1 text-xs sm:text-sm text-[#b8ada0]">
              Free to apply ·{" "}
              <Link
                href="/campus-ambassador/terms"
                className="text-[#e0b885] underline underline-offset-4 hover:text-white"
              >
                Read Program Terms
              </Link>
            </p>
          </div>
          <Link
            href="/campus-ambassador/apply"
            className="btn-primary w-full sm:w-auto justify-center shrink-0"
          >
            <span>Apply Now</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
