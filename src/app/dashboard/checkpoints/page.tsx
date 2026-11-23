"use client";

import { useState } from "react";
import { CheckCircle2, CheckSquare } from "lucide-react";

export default function CheckpointsPage() {
  const [hour, setHour] = useState("1");
  const [saved, setSaved] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            <span>Audit Trail</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-espresso">
            Hourly Progress Log
          </h1>
          <p className="mt-1 text-xs text-espresso-body">
            Log your progress, blockers, and git milestones every hour to preserve verifiable development evidence.
          </p>
        </div>
        <span className="badge-sand font-mono text-xs">
          24-Hour Build Window
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.32fr_1fr]">
        {/* Hour selector sidebar */}
        <aside className="card max-h-[560px] overflow-y-auto p-3 shadow-card bg-cream-surface">
          <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-sand-muted border-b border-sand-border/60 mb-2">
            Build Hours (1–24)
          </p>
          {Array.from({ length: 24 }, (_, i) => i + 1).map((n) => {
            const isSelected = hour === String(n);
            const isDemoSaved = n <= 2;
            return (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setHour(String(n));
                  setSaved(false);
                }}
                className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-mono transition ${
                  isSelected
                    ? "border border-orange-border bg-orange-subtle text-orange font-bold"
                    : "text-espresso-body hover:bg-cream-alt hover:text-espresso"
                }`}
              >
                <span>Hour {String(n).padStart(2, "0")}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] ${
                    isDemoSaved
                      ? "border border-sand-border bg-cream text-espresso font-medium"
                      : "text-sand-muted"
                  }`}
                >
                  {isDemoSaved ? "Saved" : "Pending"}
                </span>
              </button>
            );
          })}
        </aside>

        {/* Checkpoint submission form */}
        <form
          className="card p-7 shadow-card bg-cream-surface"
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
          }}
        >
          <div className="flex items-center justify-between border-b border-sand-border/60 pb-4">
            <div>
              <span className="font-mono text-xs text-orange font-semibold">Sprint Hour {hour}</span>
              <h2 className="font-heading text-xl font-bold text-espresso">
                Submit Hour {hour} Checkpoint
              </h2>
            </div>
            <span className="badge-sand font-mono text-xs">Continuous Audit</span>
          </div>

          {saved && (
            <div className="mt-5 rounded-lg border border-orange-border bg-orange-subtle p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-orange" />
                <div>
                  <p className="font-heading text-sm font-semibold text-espresso">
                    Hour {hour} Checkpoint Recorded
                  </p>
                  <p className="text-xs text-espresso-body">
                    Progress summary saved in your local demo session.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted">
                Work Completed During This Hour
              </label>
              <textarea
                className="input mt-1.5 h-24 py-3 resize-none"
                placeholder="Key commits, components authored, bugs resolved..."
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted">
                Current Technical Progress
              </label>
              <textarea
                className="input mt-1.5 h-20 py-3 resize-none"
                placeholder="State of frontend, API endpoints, model weights, database..."
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted">
                Next Milestone Goal
              </label>
              <input
                className="input mt-1.5"
                placeholder="Target for next 60 minutes"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted">
                Blockers / Issues Encountered
              </label>
              <input
                className="input mt-1.5"
                placeholder="None or state technical hurdles"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted">
                Evidence Git Commit Hash or Preview URL
              </label>
              <input
                className="input mt-1.5 font-mono"
                placeholder="e.g. 7f8c9b2a or https://..."
              />
            </div>
          </div>

          <div className="mt-8 border-t border-sand-border/60 pt-5 flex items-center justify-between">
            <p className="font-mono text-xs text-sand-muted">
              Checkpoints are timestamps logged to the organizers.
            </p>
            <button type="submit" className="btn-primary">
              <CheckSquare size={16} /> Save Checkpoint {hour}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
