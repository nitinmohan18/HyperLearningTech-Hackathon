import Link from "next/link";
import { ArrowRight, ShieldAlert, Users, Terminal, GitBranch, Scale } from "lucide-react";

export default function RulesPage() {
  const ruleGroups = [
    {
      group: "Eligibility & Squad Structure",
      icon: Users,
      description: "Requirements for participating as a solo builder or collaborative squad.",
      rules: [
        {
          num: "01",
          title: "Eligibility",
          copy: "Open to eligible students, professional developers, and independent builders. Registration details provided must be accurate and verifiable.",
        },
        {
          num: "02",
          title: "Registration Deadline",
          copy: "Registration closes strictly on 25 December 2026. Every entry must include the completed participation form, declarations, and project proposal.",
        },
        {
          num: "03",
          title: "Solo & Squad Structure",
          copy: "Solo participation fee is ₹99. A squad costs ₹200 flat and consists of 2–4 members. Only one project submission is allowed per registered entry.",
        },
      ],
    },
    {
      group: "Development Standards & AI Integrity",
      icon: Terminal,
      description: "Guidelines regarding originality, AI assistance, and third-party libraries.",
      rules: [
        {
          num: "04",
          title: "Originality of Work",
          copy: "The project must represent original participant work created during the event. Any previously built code, templates, or assets must be explicitly disclosed.",
        },
        {
          num: "05",
          title: "AI Tool Disclosure",
          copy: "AI assistance (Copilot, ChatGPT, Claude, etc.) is permitted, provided that all tools and the nature of their usage are disclosed in both proposal and final submission.",
        },
        {
          num: "06",
          title: "Existing Code & Boilerplates",
          copy: "Third-party libraries, starter templates, and open-source packages must be declared upfront. They cannot substitute for the core 24-hour hackathon build.",
        },
      ],
    },
    {
      group: "Build Sprint & Git Verification",
      icon: GitBranch,
      description: "Repository snapshot protocol, checkpoint logging, and collaborator access.",
      rules: [
        {
          num: "07",
          title: "Official Development Window",
          copy: "Core development takes place from 10:00 PM IST on 26 December through 10:00 PM IST on 27 December 2026. No pre-event commits are allowed in the build branch.",
        },
        {
          num: "08",
          title: "Hourly Progress Checkpoints",
          copy: "Teams are expected to submit periodic hourly checkpoint notes and commit references throughout the build window to verify active progress.",
        },
        {
          num: "09",
          title: "Private GitHub Repository",
          copy: "Each entry must maintain a private GitHub repository owned by the team leader from kickoff until the scheduled public reveal.",
        },
        {
          num: "10",
          title: "Collaborator Inspection",
          copy: "You must invite [OFFICIAL HYPERLEARNINGTECH GITHUB ACCOUNT] as a collaborator before 10:00 PM on 26 December and ensure access is verified.",
        },
        {
          num: "11",
          title: "Repository Public Reveal",
          copy: "All participating repositories will be made public synchronously at 8:00 PM IST on 27 December for transparent peer and judge inspection.",
        },
      ],
    },
    {
      group: "Evaluation, Judging & Ownership",
      icon: Scale,
      description: "Submission criteria, evaluation rubric, and intellectual property rights.",
      rules: [
        {
          num: "12",
          title: "Final Submission Requirements",
          copy: "Submit your final repository URL, live deployment link, documentation, feature list, and signed disclosures before 10:00 PM IST on 27 December.",
        },
        {
          num: "13",
          title: "100-Point Judging Rubric",
          copy: "Submissions are evaluated on a normalised 100-point rubric: Working MVP & Functionality (25 pts), Verified Development Effort (25 pts), Technical Implementation (15 pts), Individual/Team Contribution (15 pts), Live Deployment (10 pts), Documentation (5 pts), and Final Demonstration (5 pts).",
        },
        {
          num: "14",
          title: "Disqualification Policy",
          copy: "Plagiarism, undisclosed pre-existing codebases, fake commit timestamps, or misrepresenting squad members will result in immediate disqualification.",
        },
        {
          num: "15",
          title: "Intellectual Property & Privacy",
          copy: "Participants retain 100% intellectual property ownership of their projects. Organisers are granted only event evaluation and showcase rights.",
        },
      ],
    },
  ];

  return (
    <div className="bg-cream">
      <div className="container-site section-pad">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
            Official Guidelines
          </p>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#f0eae1]">
            Build honestly. <br />
            <span className="font-serif italic font-normal text-[#c89f6d]">
              Document clearly.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9e8e7c] sm:text-lg">
            Winter Hackathon ’26 rules are designed to ensure fair play, transparent git verification, and meaningful peer competition across four foundational pillars.
          </p>
        </div>

        {/* Grouped Rules Layout */}
        <div className="mt-14 space-y-8">
          {ruleGroups.map(({ group, icon: Icon, description, rules }) => (
            <section
              key={group}
              className="rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-6 backdrop-blur-xl sm:p-8"
            >
              {/* Group Header */}
              <div className="flex flex-col gap-3 pb-6 border-b border-sand-border/15 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d] shadow-sm">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-normal text-[#f0eae1]">
                      {group}
                    </h2>
                    <p className="text-xs text-[#9e8e7c]">
                      {description}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#8e7a68]">
                  {rules.length} Guidelines
                </span>
              </div>

              {/* Group Rules List */}
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rules.map((rule) => (
                  <div
                    key={rule.num}
                    className="flex flex-col justify-between rounded-xl border border-sand-border/10 bg-[#140e0a]/40 p-5 transition-colors hover:border-sand-border/25"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-[#c89f6d]">
                          RULE {rule.num}
                        </span>
                      </div>
                      <h3 className="mt-3 font-serif text-lg font-normal text-[#f0eae1]">
                        {rule.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#9e8e7c]">
                        {rule.copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Verification Warning Box */}
        <div className="mt-12 rounded-2xl border border-sand-border/20 bg-[#16100c]/40 p-7 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
                <ShieldAlert size={18} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-normal text-[#f0eae1]">
                  Strict Repository Inspection
                </h3>
                <p className="mt-1 text-sm text-[#9e8e7c]">
                  Organisers review commit timestamps, commit history cadence, and checkpoint logs. Questions? Read our FAQ.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link href="/faq" className="btn-secondary">
                View FAQ
              </Link>
              <Link href="/register" className="btn-primary">
                Accept & Register <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
