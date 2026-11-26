import Link from "next/link";
import { event } from "@/data/event";
import {
  ArrowRight,
  ShieldAlert,
  Users,
  Terminal,
  GitBranch,
  Scale,
  FileCode2,
  Lock,
  Send,
  type LucideIcon,
} from "lucide-react";
import { rulesData } from "@/data/rules";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  eligibility: Users,
  "ai-libraries": Terminal,
  "existing-code": FileCode2,
  plagiarism: ShieldAlert,
  "ip-ownership": Scale,
  "repo-requirements": GitBranch,
  "security-privacy": Lock,
  "submission-demo": Send,
};

export default function RulesPage() {
  let ruleCounter = 0;

  return (
    <div className="bg-[#0d0a08] min-h-screen">
      <div className="container-site section-pad">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[#e0b885]">
            Official Guidelines
          </p>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#ffffff]">
            Build honestly. <br />
            <span className="font-serif italic font-normal text-[#ffd89b]">
              Document clearly.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#e2d8ca] sm:text-lg">
            Winter Hackathon ’26 rules ensure fair play, verified 9:00 PM repository access, transparent AI disclosure, and 100% builder IP ownership across all 8 official pillars.
          </p>
        </div>

        {/* Unified Rules Sections (Single Source of Truth from rulesData) */}
        <div className="mt-14 space-y-12">
          {rulesData.map((group) => {
            const Icon = CATEGORY_ICONS[group.id] || Scale;
            return (
              <section
                key={group.id}
                className="border-t border-white/[0.08] pt-8"
              >
                {/* Group Header */}
                <div className="flex flex-col gap-2 pb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-[#e0b885] shrink-0" />
                    <div>
                      <h2 className="font-serif text-2xl font-normal text-[#faf5ee]">
                        {group.category}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#bfb2a2] mt-0.5">
                        {group.summary}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#e0b885]/80">
                    {group.rules.length} {group.rules.length === 1 ? "Guideline" : "Guidelines"}
                  </span>
                </div>

                {/* Group Rules List */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 divide-y divide-white/[0.06] sm:divide-y-0">
                  {group.rules.map((rule) => {
                    ruleCounter += 1;
                    const ruleNum = String(ruleCounter).padStart(2, "0");
                    return (
                      <div key={rule.title} className="pt-4 sm:pt-0">
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className="font-semibold text-[#e0b885]">
                            RULE {ruleNum}
                          </span>
                          {rule.tag && (
                            <>
                              <span className="text-white/20">·</span>
                              <span className="uppercase tracking-wider text-[10.5px] text-[#a89b8c]">
                                {rule.tag}
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className="mt-1.5 font-serif text-lg font-medium text-[#f5efe5]">
                          {rule.title}
                        </h3>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-[#cfc5b7]">
                          {rule.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Verification Warning Box */}
        <div className="mt-16 border-l-2 border-[#e0b885] bg-white/[0.03] p-6 text-sm text-[#cfc5b7]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <ShieldAlert size={20} className="text-[#e0b885] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif text-xl font-normal text-[#faf5ee]">
                  Strict Repository Inspection (9:00 PM IST Deadline)
                </h3>
                <p className="mt-1 text-sm text-[#cfc5b7]">
                  Collaborator access must be accepted before 9:00 PM IST on 26 December. Organisers verify commit timestamps, cadence, and checkpoint logs.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link href="/faq" className="btn-secondary">
                View FAQ
              </Link>
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Accept & Register <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
