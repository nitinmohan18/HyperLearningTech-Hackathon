"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function SubmissionPage() {
  const [confirm, setConfirm] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            <span>Sprint Conclusion</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-espresso">
            Final Project Submission
          </h1>
          <p className="mt-1 text-xs text-espresso-body">
            Must be submitted before 27 December 2026, 10:00 PM IST. Judging evaluates working software.
          </p>
        </div>
        <span className="badge-sand font-mono text-xs">
          Closes 27 Dec 10 PM IST
        </span>
      </div>

      <form
        className="card mt-8 p-7 sm:p-9 shadow-card bg-cream-surface"
        onSubmit={(e) => {
          e.preventDefault();
          setConfirm(true);
        }}
      >
        <div className="flex items-center justify-between border-b border-sand-border/60 pb-4">
          <div>
            <h2 className="font-heading text-lg font-semibold text-espresso">
              Deliverable Specifications
            </h2>
            <p className="text-xs text-sand-muted">Provide inspectable links and comprehensive disclosures</p>
          </div>
          <Send size={18} className="text-sand-muted" />
        </div>

        {confirm && (
          <div className="mt-6 rounded-lg border border-orange-border bg-orange-subtle p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-orange" />
              <div>
                <p className="font-heading text-sm font-semibold text-espresso">
                  Demo Submission Received
                </p>
                <p className="text-xs text-espresso-body">
                  Your project details have been successfully saved for judging review in this session.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted" htmlFor="title">
              Final Project Title
            </label>
            <input
              id="title"
              className="input mt-1.5 font-semibold text-espresso"
              defaultValue="SignBridge"
              required
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted" htmlFor="deploy">
              Live Production Deployment URL
            </label>
            <input
              id="deploy"
              type="url"
              className="input mt-1.5 font-mono text-xs"
              placeholder="https://signbridge.vercel.app"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted" htmlFor="repo">
              Public GitHub Repository URL
            </label>
            <input
              id="repo"
              type="url"
              className="input mt-1.5 font-mono text-xs"
              placeholder="https://github.com/demo/signbridge"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted" htmlFor="desc">
              Final Project Description & Problem Solution
            </label>
            <textarea
              id="desc"
              className="input mt-1.5 h-28 py-3 resize-none"
              placeholder="Describe what the software accomplishes, user pain points resolved, and technical highlights..."
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted" htmlFor="features">
              Key Features Implemented (One per line)
            </label>
            <textarea
              id="features"
              className="input mt-1.5 h-24 py-3 resize-none"
              placeholder="- Real-time hand sign recognition via camera feed&#10;- Sub-second translation pipeline&#10;- Accessible dark UI with keyboard shortcuts"
              required
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted" htmlFor="contribution">
              Team Contribution Declaration
            </label>
            <textarea
              id="contribution"
              className="input mt-1.5 h-24 py-3 resize-none"
              placeholder="Breakdown of individual member roles and modules built..."
              required
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted" htmlFor="ai">
              AI Tools & External Code Disclosure
            </label>
            <textarea
              id="ai"
              className="input mt-1.5 h-24 py-3 resize-none"
              placeholder="List any models, APIs, Copilot usage, or pre-existing templates utilized..."
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-mono text-xs uppercase tracking-wider text-espresso-muted" htmlFor="demoVideo">
              Demo Walkthrough Video URL (Optional — Loom / YouTube)
            </label>
            <input
              id="demoVideo"
              type="url"
              className="input mt-1.5 font-mono text-xs"
              placeholder="https://youtu.be/..."
            />
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-sand-border bg-cream-alt p-4">
          <label className="flex items-start gap-3 text-xs leading-relaxed text-espresso-body cursor-pointer">
            <input
              type="checkbox"
              required
              defaultChecked
              className="mt-0.5 h-4 w-4 rounded border-sand-border bg-cream-surface accent-orange"
            />
            <span>
              I certify that this submission represents authentic work created during the 24-hour competition period. All third-party libraries and AI assistance have been truthfully disclosed.
            </span>
          </label>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-sand-border/60 pt-5">
          <p className="font-mono text-xs text-sand-muted">
            Submission deadline: 27 Dec 2026, 10:00 PM IST
          </p>
          <button type="submit" className="btn-primary">
            <Send size={16} /> Confirm Project Submission
          </button>
        </div>
      </form>
    </>
  );
}
