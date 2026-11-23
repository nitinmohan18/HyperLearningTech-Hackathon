"use client";

import { useState } from "react";
import { Copy, CheckCircle2, Github } from "lucide-react";

export default function RepositoryPage() {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const copy = async () => {
    await navigator.clipboard?.writeText("[OFFICIAL HYPERLEARNINGTECH GITHUB ACCOUNT]");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            <span>Integrity Setup</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-espresso">
            Private GitHub Repository
          </h1>
          <p className="mt-1 text-xs text-espresso-body">
            Link your private repository and invite the official reviewer before 26 Dec 10:00 PM IST.
          </p>
        </div>
        <span className="badge-sand font-mono text-xs">
          Mandatory Verification
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Repository Inputs */}
        <div className="card p-7 shadow-card bg-cream-surface">
          <div className="flex items-center gap-3 border-b border-sand-border/60 pb-4">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-sand-border bg-cream text-espresso shadow-subtle">
              <Github size={20} />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-espresso">
                Repository Credentials
              </h2>
              <p className="text-xs text-sand-muted">Owned by registered team leader</p>
            </div>
          </div>

          {saved && (
            <div className="mt-4 rounded-lg border border-orange-border bg-orange-subtle p-3.5 text-xs text-espresso-body">
              <span className="font-semibold text-espresso">Repository information saved!</span> Pending organiser collaborator inspection.
            </div>
          )}

          <div className="mt-5 space-y-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted" htmlFor="repoUrl">
                Private Repository URL
              </label>
              <input
                id="repoUrl"
                className="input mt-1.5 font-mono text-xs"
                placeholder="https://github.com/username/project-repo"
                defaultValue="https://github.com/demo/signbridge"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted" htmlFor="githubUser">
                Leader GitHub Username
              </label>
              <input
                id="githubUser"
                className="input mt-1.5 font-mono text-xs"
                placeholder="github-username"
                defaultValue="demo-aarav"
              />
            </div>

            <div className="rounded-xl border border-sand-border bg-cream p-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-espresso">
                Required Inspection Collaborator
              </p>
              <p className="mt-1 text-xs text-espresso-body">
                Invite this exact account with Read / Triage collaborator permissions:
              </p>
              <div className="mt-3 flex items-center gap-2">
                <code className="flex-1 rounded-lg border border-sand-border bg-cream-surface px-3 py-2.5 font-mono text-xs text-orange font-semibold">
                  [OFFICIAL HYPERLEARNINGTECH GITHUB ACCOUNT]
                </code>
                <button
                  type="button"
                  aria-label="Copy collaborator username"
                  className="btn-secondary h-10 w-10 px-0 shrink-0"
                  onClick={copy}
                >
                  {copied ? <CheckCircle2 size={16} className="text-orange" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary mt-6 w-full justify-center sm:w-auto"
            onClick={() => setSaved(true)}
          >
            Save Repository Details
          </button>
        </div>

        {/* Verification Status & Instructions */}
        <div className="space-y-6">
          <div className="card p-7 shadow-card bg-cream-surface">
            <div className="flex items-center justify-between border-b border-sand-border/60 pb-3">
              <h3 className="font-heading text-base font-semibold text-espresso">
                Access Verification Status
              </h3>
              <span className="badge-sand font-mono text-xs">Pending Review</span>
            </div>

            <div className="mt-5 space-y-3.5">
              {[
                "Create a private repository on GitHub",
                "Add your team members as collaborators",
                "Invite the official organizer account",
                "Organizer verifies collaborator invitation",
                "Initial snapshot taken at 10 PM, 26 Dec",
              ].map((step, i) => (
                <div key={step} className="flex items-start gap-3 text-xs leading-relaxed text-espresso-body">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-sand-border bg-cream font-mono text-[10px] text-espresso font-semibold shadow-subtle">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Milestones Box */}
          <div className="card border-sand-border bg-cream-alt p-6">
            <h4 className="font-heading text-sm font-semibold text-espresso">
              Git Verification Cadence
            </h4>
            <div className="mt-3 space-y-2 font-mono text-xs text-espresso-body">
              <div className="flex justify-between">
                <span className="text-sand-muted">Snapshot 0:</span>
                <span className="text-espresso font-semibold">26 Dec · 10:00 PM IST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sand-muted">Visibility:</span>
                <span className="text-espresso">Private throughout sprint</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sand-muted">Public Reveal:</span>
                <span className="text-orange font-bold">27 Dec · 08:00 PM IST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sand-muted">Final Snapshot:</span>
                <span className="text-espresso font-semibold">27 Dec · 10:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
