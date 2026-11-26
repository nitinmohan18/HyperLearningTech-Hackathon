import Link from "next/link";
import { ArrowRight, Code, ShieldCheck, Terminal, Users } from "lucide-react";
import { event } from "@/data/event";

export default function AboutPage() {
  const pillars = [
    {
      title: "What you will build",
      icon: Code,
      copy: "Choose a meaningful problem and deliver a functional project with a clear user journey, working features, and inspectable source code.",
    },
    {
      title: "What makes it different",
      icon: ShieldCheck,
      copy: "Repository snapshots, hourly checkpoints, and collaborator inspection are used to keep development effort visible, credible, and fair.",
    },
    {
      title: "Genuine development effort",
      icon: Terminal,
      copy: "Participants must document genuine contributions, disclose AI and existing-code assistance honestly, and build the core solution during the competition.",
    },
    {
      title: "Unified Squad format",
      icon: Users,
      copy: `All entries run under the Squad format (1–4 members) at a flat ${event.squadFee} fee per entry—whether participating alone or as a team for one unified project submission.`,
    },
  ];

  return (
    <div className="bg-cream">
      <div className="container-site section-pad">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
            About the Event
          </p>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#f0eae1]">
            A 24-hour test of <br />
            <span className="font-serif italic font-normal text-[#c89f6d]">
              ideas, execution & proof.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9e8e7c] sm:text-lg">
            HyperLearningTech – Winter Hackathon ’26 is the inaugural edition of an independently organised online competition designed for serious individual builders and collaborative squads.
          </p>
        </div>

        {/* Pillars Grid - Clean open layout */}
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
                Guiding Principle
              </span>
              <h3 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#f0eae1] sm:text-4xl">
                {event.tagline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#9e8e7c]">
                We believe in verifiable progress over exaggerated pitches. Every team will maintain an inspectable git commit log from kickoff to the final reveal.
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
