export default function SchedulePage() {
  const items = [
    ["25 Dec", "Preparation day", "Registration closes; preparation brief and repository guidance."],
    ["26 Dec · 10:00 PM IST", "Competition starts", "The 24-hour build period begins."],
    ["Hourly", "Checkpoints", "Submit progress, evidence and next milestones every hour."],
    ["27 Dec · 8:00 PM IST", "Repository reveal", "Public reveal is planned for registered repositories."],
    ["27 Dec · 10:00 PM IST", "Submission deadline", "Final repository snapshot and submission window close."],
    ["27 Dec · 10:00–11:00 PM IST", "Judging", "Final evaluations and ranking review."],
    ["27 Dec · 11:00 PM IST", "Results", "Results are declared."],
    ["27 Dec · by 11:05 PM IST", "Prize distribution target", "Target time for prize distribution."],
  ];
  return <div className="container-site section-pad"><p className="eyebrow">IST schedule</p><h1 className="section-title">The complete event timeline.</h1><div className="mt-10 space-y-3">{items.map(([time,title,copy]) => <div key={time} className="card grid gap-3 p-5 sm:grid-cols-[220px_1fr]"><p className="text-sm font-bold text-cyan">{time}</p><div><h2 className="font-semibold">{title}</h2><p className="mt-1 text-sm text-slate-400">{copy}</p></div></div>)}</div></div>;
}