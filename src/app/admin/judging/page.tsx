import { Gavel } from "lucide-react";

export default function JudgingPage() {
  const rows = [
    ["Carbon Lens", "94", "Functionality 38 · UI/UX 28 · Innovation 28", "Provisional 1st"],
    ["Campus Pulse", "91", "Functionality 36 · UI/UX 29 · Innovation 26", "Provisional 2nd"],
    ["SignBridge", "89", "Functionality 35 · UI/UX 27 · Innovation 27", "Provisional 3rd"],
    ["Wastewise", "87", "Functionality 34 · UI/UX 26 · Innovation 27", "Provisional 4th"],
  ];

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            <span>Scoring & Rubric</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-espresso">
            Project Scores & Judging Rubric
          </h1>
          <p className="mt-1 text-xs text-espresso-body">
            Evaluate deliverables based on working functionality (40), craft & UI/UX (30), innovation (20), and git proof (10).
          </p>
        </div>
        <span className="badge-sand font-mono text-xs">
          82% Evaluated
        </span>
      </div>

      <div className="table-wrap mt-8 shadow-card">
        <table className="table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Total / 100</th>
              <th>Score Breakdown</th>
              <th>Provisional Standing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-border/50">
            {rows.map((r) => (
              <tr key={r[0]} className="hover:bg-sand/10 transition-colors">
                <td className="font-heading font-semibold text-espresso">{r[0]}</td>
                <td className="font-mono font-bold text-orange text-base">{r[1]}</td>
                <td className="font-mono text-xs text-espresso-body">{r[2]}</td>
                <td>
                  <span className="badge-sand font-mono text-[10px]">{r[3]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card mt-8 p-7 max-w-2xl shadow-card bg-cream-surface">
        <div className="flex items-center gap-2">
          <Gavel size={16} className="text-orange" />
          <h2 className="font-heading text-sm font-semibold text-espresso">
            Judge Evaluation Notes
          </h2>
        </div>
        <textarea
          className="input mt-3 h-28 py-3 resize-none"
          placeholder="Enter confidential judging remarks, code quality observations, or category commendations..."
        />
        <div className="mt-4 flex justify-end">
          <button type="button" className="btn-primary text-xs h-9 px-4">
            Save Evaluation Notes
          </button>
        </div>
      </div>
    </>
  );
}
