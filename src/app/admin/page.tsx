import { ShieldCheck } from "lucide-react";

export default function AdminPage() {
  const stats = [
    { label: "Total Registrations", value: "128", note: "Across all tracks" },
    { label: "Solo Entries", value: "74", note: "₹99 tier" },
    { label: "Squad Entries", value: "54", note: "₹200 flat tier" },
    { label: "Verified Repositories", value: "96", note: "Collaborator accepted" },
    { label: "Pending Invitations", value: "18", note: "Follow-up required" },
    { label: "Submitted Deliverables", value: "112", note: "Final snapshots locked" },
    { label: "Judging Progress", value: "82%", note: "Evaluation ongoing" },
    { label: "Cash Awards Pending", value: "11", note: "Disbursement ready" },
  ];

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            <span>Operations Telemetry</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-espresso">
            Hackathon Command Center
          </h1>
          <p className="mt-1 text-xs text-espresso-body">
            Live operations overview for registrations, repo inspections, checkpoint submissions, and judging.
          </p>
        </div>
        <span className="badge-sand font-mono text-xs">
          Operations Demo
        </span>
      </div>

      {/* 8 Stats Metrics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, note }) => (
          <div key={label} className="card card-hover flex flex-col justify-between p-5 shadow-card bg-cream-surface">
            <p className="font-mono text-xs text-sand-muted uppercase tracking-wider">{label}</p>
            <div className="mt-4">
              <p className="font-heading text-3xl font-bold text-espresso">{value}</p>
              <p className="mt-1 font-mono text-xs text-sand-muted">{note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Notice Card */}
      <div className="mt-8 card border-sand-border bg-cream-alt p-7 shadow-card">
        <div className="flex items-start gap-3">
          <ShieldCheck size={20} className="text-orange shrink-0 mt-0.5" />
          <div>
            <h2 className="font-heading text-base font-semibold text-espresso">
              Administrative Demo Context
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-espresso-body">
              All figures, tables, and actions presented in this administrative section represent mock demonstration telemetry. This interface showcases the operator experience for managing high-volume git repository reviews and checkpoint verification.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
