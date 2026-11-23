import { Github } from "lucide-react";

export default function RepositoriesPage() {
  const rows = [
    ["Team Null", "github.com/demo/carbon-lens", "Accepted", "Verified", "Initial snapshot pending"],
    ["Aarav Sharma", "github.com/demo/signbridge", "Accepted", "Verified", "Snapshot 0 logged at 10 PM"],
    ["Pulse Makers", "github.com/demo/campus-pulse", "Pending", "Pending", "Follow-up email dispatched"],
    ["Green Byte", "github.com/demo/wastewise", "Accepted", "Verified", "Active git commits regular"],
  ];

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            <span>Git Auditing</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-espresso">
            Repository Management & Access
          </h1>
          <p className="mt-1 text-xs text-espresso-body">
            Audit private repository links and verify [OFFICIAL HYPERLEARNINGTECH GITHUB ACCOUNT] collaborator permissions.
          </p>
        </div>
        <span className="badge-sand font-mono text-xs">
          96 of 128 Verified
        </span>
      </div>

      <div className="table-wrap mt-8 shadow-card">
        <table className="table">
          <thead>
            <tr>
              <th>Team / Builder</th>
              <th>Repository Target</th>
              <th>Invite Status</th>
              <th>Access Level</th>
              <th>Operator Review Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-border/50">
            {rows.map((r) => (
              <tr key={r[0]} className="hover:bg-sand/10 transition-colors">
                <td className="font-heading font-semibold text-espresso">{r[0]}</td>
                <td className="font-mono text-xs text-espresso-body">
                  <span className="flex items-center gap-1.5">
                    <Github size={13} className="text-sand-muted" />
                    {r[1]}
                  </span>
                </td>
                <td>
                  <span className={`${r[2] === "Accepted" ? "badge-orange" : "badge-sand"} text-[10px]`}>
                    {r[2]}
                  </span>
                </td>
                <td className="font-mono text-xs text-espresso font-semibold">{r[3]}</td>
                <td className="text-xs text-sand-muted">{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
