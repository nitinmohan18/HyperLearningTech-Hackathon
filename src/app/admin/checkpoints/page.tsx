export default function AdminCheckpointsPage() {
  const rows = [
    ["Team Null", "24", "23", "Submitted", "95.8% cadence"],
    ["Aarav Sharma", "24", "18", "Submitted", "75.0% cadence"],
    ["Pulse Makers", "24", "12", "Partially Complete", "50.0% cadence"],
    ["Green Byte", "24", "22", "Submitted", "91.6% cadence"],
  ];

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            <span>Inspection Feed</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-espresso">
            Hourly Checkpoint Review
          </h1>
          <p className="mt-1 text-xs text-espresso-body">
            Live telemetry of hourly progress logs, git commits, and milestone timestamps.
          </p>
        </div>
        <span className="badge-sand font-mono text-xs">
          24h Checkpoint Stream
        </span>
      </div>

      <div className="table-wrap mt-8 shadow-card">
        <table className="table">
          <thead>
            <tr>
              <th>Team / Builder</th>
              <th>Total Window</th>
              <th>Checkpoints Logged</th>
              <th>Status</th>
              <th>Audit Cadence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-border/50">
            {rows.map((r) => (
              <tr key={r[0]} className="hover:bg-sand/10 transition-colors">
                <td className="font-heading font-semibold text-espresso">{r[0]}</td>
                <td className="font-mono text-xs text-sand-muted">{r[1]} Hours</td>
                <td className="font-mono font-semibold text-espresso">
                  {r[2]} <span className="text-sand-muted text-xs font-normal">/ 24</span>
                </td>
                <td>
                  <span
                    className={`${r[3] === "Submitted" ? "badge-orange" : "badge-sand"} text-[10px]`}
                  >
                    {r[3]}
                  </span>
                </td>
                <td className="font-mono text-xs text-sand-muted">{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
