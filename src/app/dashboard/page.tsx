import Link from "next/link";
import { Clock3, Github, CheckSquare, Send, Users, ArrowRight, ShieldCheck } from "lucide-react";

export default function DashboardPage() {
  const cards = [
    { title: "Participation Profile", value: "Solo · Aarav Sharma", note: "Fee: ₹99 Paid", icon: Users },
    { title: "Repository Inspection", value: "Pending Verification", note: "Invite official user", icon: Github },
    { title: "Hourly Checkpoints", value: "0 of 24 Submitted", note: "Logs open at 10 PM", icon: CheckSquare },
    { title: "Final Delivery", value: "Not Submitted", note: "Closes 27 Dec 10 PM", icon: Send },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            <span>Participant Workspace</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-espresso">
            Welcome back, Aarav.
          </h1>
          <p className="mt-1 text-xs text-espresso-body">
            Project: <strong className="text-espresso">SignBridge</strong> · Registered Solo Entry
          </p>
        </div>
        <span className="badge-orange font-mono text-xs self-start sm:self-auto">
          Active Participant Slot
        </span>
      </div>

      {/* 4 Status Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, note, icon: Icon }) => (
          <div key={title} className="card card-hover flex flex-col justify-between p-5 bg-cream-surface">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-sand-muted">{title}</span>
              <div className="grid h-8 w-8 place-items-center rounded-lg border border-sand-border bg-cream text-espresso shadow-subtle">
                <Icon size={16} />
              </div>
            </div>
            <div className="mt-6">
              <p className="font-heading text-lg font-semibold text-espresso">{value}</p>
              <p className="mt-1 font-mono text-xs text-sand-muted">{note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Overview Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Countdown & Event Schedule */}
        <div className="card p-7 bg-cream-surface">
          <div className="flex items-center justify-between border-b border-sand-border/60 pb-4">
            <div>
              <p className="font-mono text-xs text-sand-muted uppercase tracking-wider">
                Event Kickoff Clock
              </p>
              <h2 className="mt-1 font-heading text-xl font-bold text-espresso">
                26 Dec 2026 · 10:00 PM IST
              </h2>
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-lg border border-orange-border bg-orange-subtle text-orange">
              <Clock3 size={18} />
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-espresso-body">
            The 24-hour sprint begins promptly at 10:00 PM IST. Your initial repository snapshot must be committed by this timestamp. Ensure your private GitHub repository is created and the official collaborator is invited before start.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard/repository" className="btn-primary">
              Verify Repository Setup <ArrowRight size={15} />
            </Link>
            <Link href="/dashboard/checkpoints" className="btn-secondary">
              Open Checkpoint Log
            </Link>
          </div>
        </div>

        {/* Announcements & Notes */}
        <div className="card p-7 flex flex-col justify-between bg-cream-surface">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-orange" />
              <h2 className="font-heading text-base font-semibold text-espresso">
                Organizer Announcement
              </h2>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-espresso-body">
              Preparation day is <strong className="text-espresso">25 December 2026</strong>. Review the official rules regarding AI tool disclosures and ensure collaborator access is confirmed before 10:00 PM on kickoff.
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-sand-border bg-cream p-4">
            <p className="font-mono text-[11px] font-semibold text-espresso uppercase tracking-wider">
              Assigned Reviewer
            </p>
            <p className="mt-1 font-mono text-xs text-orange font-semibold">
              [OFFICIAL HYPERLEARNINGTECH GITHUB ACCOUNT]
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
