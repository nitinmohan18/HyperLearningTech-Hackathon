import { Users, User, FileCode } from "lucide-react";
import { event } from "@/data/event";

export default function TeamPage() {
  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            <span>Profile Roster</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-espresso">
            Participation Profile & Proposal
          </h1>
          <p className="mt-1 text-xs text-espresso-body">
            Review registered builder information, registration tier, and initial proposal commitments.
          </p>
        </div>
        <span className="badge-orange font-mono text-xs">
          Confirmed Entry
        </span>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Entry Tier Card */}
        <div className="card p-7 shadow-card bg-cream-surface">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-sand-muted">
              Registration Tier
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-lg border border-sand-border bg-cream text-espresso shadow-subtle">
              <User size={16} />
            </div>
          </div>
          <h2 className="mt-4 font-heading text-2xl font-bold text-espresso">
            Solo Developer
          </h2>
          <div className="mt-4 space-y-2 border-t border-sand-border/60 pt-4 font-mono text-xs text-espresso-body">
            <div className="flex justify-between">
              <span className="text-sand-muted">Registration Fee:</span>
              <span className="font-semibold text-orange">{event.soloFee} Paid</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sand-muted">Team Quota:</span>
              <span className="text-espresso font-semibold">1 Builder</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sand-muted">Status:</span>
              <span className="text-espresso">Eligible for all awards</span>
            </div>
          </div>
        </div>

        {/* Lead Participant Info */}
        <div className="card p-7 shadow-card bg-cream-surface">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-sand-muted">
              Primary Builder
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-lg border border-sand-border bg-cream text-espresso shadow-subtle">
              <Users size={16} />
            </div>
          </div>
          <h2 className="mt-4 font-heading text-2xl font-bold text-espresso">
            Aarav Sharma
          </h2>
          <div className="mt-4 space-y-2 border-t border-sand-border/60 pt-4 font-mono text-xs text-espresso-body">
            <div className="flex justify-between">
              <span className="text-sand-muted">GitHub:</span>
              <span className="text-orange font-semibold">@demo-aarav</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sand-muted">Role:</span>
              <span className="text-espresso font-medium">Lead Engineer & Architect</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sand-muted">Organization:</span>
              <span className="text-espresso">Independent Builder</span>
            </div>
          </div>
        </div>

        {/* Project Proposal Card */}
        <div className="card md:col-span-2 p-7 shadow-card bg-cream-surface">
          <div className="flex items-center justify-between border-b border-sand-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg border border-sand-border bg-cream text-espresso shadow-subtle">
                <FileCode size={18} />
              </div>
              <div>
                <span className="font-mono text-xs text-sand-muted uppercase tracking-wider">
                  Registered Proposal
                </span>
                <h3 className="font-heading text-xl font-bold text-espresso">
                  SignBridge
                </h3>
              </div>
            </div>
            <span className="badge-sand font-mono text-xs">Accessibility Track</span>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-espresso-body">
            A real-time sign-language practice and two-way translation companion built to make digital communication and learning genuinely inclusive. Incorporates computer vision gestures translation and accessible WebGL interactive lessons.
          </p>

          <div className="mt-6 grid gap-4 border-t border-sand-border/60 pt-5 sm:grid-cols-3 font-mono text-xs text-espresso-body">
            <div>
              <p className="text-sand-muted uppercase">Tech Stack</p>
              <p className="mt-1 font-semibold text-espresso">Next.js · OpenCV · WebGL</p>
            </div>
            <div>
              <p className="text-sand-muted uppercase">Git Inspection</p>
              <p className="mt-1 font-semibold text-espresso">Private Branch Configured</p>
            </div>
            <div>
              <p className="text-sand-muted uppercase">Hourly Checkpoints</p>
              <p className="mt-1 font-semibold text-orange">Ready for 10 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
