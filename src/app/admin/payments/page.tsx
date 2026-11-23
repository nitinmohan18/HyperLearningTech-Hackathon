export default function PaymentsPage() {
  const rows = [
    ["Overall 1st Place", "Team Null", "₹2,999", "Pending Disbursement", "TRX-DEMO-001"],
    ["Overall 2nd Place", "Pulse Makers", "₹1,999", "Pending Disbursement", "TRX-DEMO-002"],
    ["Overall 3rd Place", "Aarav Sharma", "₹999", "Pending Disbursement", "TRX-DEMO-003"],
    ["Overall 4th Place", "Green Byte", "₹499", "Pending Disbursement", "TRX-DEMO-004"],
    ["Overall 5th Place", "StudyFlow", "₹299", "Pending Disbursement", "TRX-DEMO-005"],
    ["Best UI/UX 1st", "Campus Pulse", "₹499", "Pending Disbursement", "TRX-DEMO-006"],
  ];

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            <span>Prize Operations</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-espresso">
            Cash Prize Disbursements
          </h1>
          <p className="mt-1 text-xs text-espresso-body">
            Direct cash reward disbursement tracking. Scheduled for release by 11:05 PM IST on 27 Dec 2026.
          </p>
        </div>
        <span className="badge-sand font-mono text-xs">
          ₹9,000 Total Pool
        </span>
      </div>

      <div className="table-wrap mt-8 shadow-card">
        <table className="table">
          <thead>
            <tr>
              <th>Award Category</th>
              <th>Recipient / Team</th>
              <th>Cash Amount</th>
              <th>Transfer Status</th>
              <th>Transaction Ref</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-border/50">
            {rows.map((r) => (
              <tr key={r[0]} className="hover:bg-sand/10 transition-colors">
                <td className="font-heading font-semibold text-espresso">{r[0]}</td>
                <td className="text-espresso-body">{r[1]}</td>
                <td className="font-mono font-bold text-orange text-base">{r[2]}</td>
                <td>
                  <span className="badge-sand text-[10px]">{r[3]}</span>
                </td>
                <td className="font-mono text-xs text-sand-muted">{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 font-mono text-xs text-sand-muted">
        Note: Operations demo view. Real payouts are processed via official banking / UPI disbursement channels.
      </p>
    </>
  );
}
