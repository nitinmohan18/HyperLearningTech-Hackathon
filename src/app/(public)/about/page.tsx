import Link from "next/link";
import { ArrowRight, Code, ShieldCheck, Terminal, Users } from "lucide-react";
import { event } from "@/data/event";

export default function AboutPage() {
  const pillars = [
    {
      title: "Open Innovation Freedom",
      icon: Code,
      copy: "Identify any meaningful problem across AI, Sustainability, EdTech, Healthcare, or Developer Tools and build a software solution using your preferred technology stack.",
    },
    {
      title: "Two Mandatory Requirements",
      icon: ShieldCheck,
      copy: "Only two technical requirements: verified organiser access to your dedicated GitHub repository (public or private), and documentation-first development with initial README committed before coding.",
    },
    {
      title: "Genuine Learning & AI Freedom",
      icon: Terminal,
      copy: "Free and premium AI tools, coding assistants, and open-source libraries are permitted without penalty. Understand your work, compete with integrity, and disclose AI contributions transparently.",
    },
    {
      title: "Unified Squad & 100% IP",
      icon: Users,
      copy: `All entries participate under the unified Squad format (1–4 members) at a flat ${event.squadFee} entry fee, retaining 100% intellectual property and copyright over everything built.`,
    },
  ];

  return (
    <div className="bg-cream">
      <div className="container-site section-pad">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
            Event Philosophy
          </p>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#f0eae1]">
            Build with purpose. <br />
            <span className="font-serif italic font-normal text-[#c89f6d]">
              Compete with integrity.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9e8e7c] sm:text-lg">
            HyperLearningTech Winter Hackathon 2026 is a 24-hour open innovation competition designed to encourage practical learning, meaningful problem-solving, creativity, collaboration, and responsible technological development.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="mt-16 grid gap-10 md:grid-cols-2 divide-y md:divide-y-0 md:gap-x-12 border-t border-sand-border/15 pt-10">
          {pillars.map(({ title, icon: Icon, copy }) => (
            <article
              key={title}
              className="pt-6 md:pt-0"
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-[#c89f6d]" />
                <h2 className="font-serif text-2xl font-normal text-[#f0eae1] tracking-tight">
                  {title}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#9e8e7c]">
                {copy}
              </p>
            </article>
          ))}
        </div>

        {/* Highlight Callout */}
        <div className="mt-16 border-t border-sand-border/15 pt-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c89f6d]">
                Core Philosophy
              </span>
              <h3 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#f0eae1] sm:text-4xl">
                Practical Learning Over Pre-Built Complexity
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#9e8e7c]">
                Participants are encouraged to explore unfamiliar technologies, experiment with ideas, and build solutions they genuinely understand. An honest prototype with meaningful original work is more valuable than an impressive pre-built application submitted without genuine comprehension.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-4">
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Register for Hackathon →
              </a>
              <Link href="/rules" className="btn-secondary">
                Read Competition Rules
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
