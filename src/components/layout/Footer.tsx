import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#070b14]">
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 font-semibold"><span className="grid h-9 w-9 place-items-center rounded-lg border border-electric/40 text-cyan">HL</span>HyperLearningTech</div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">An independently organised, 24-hour online technology hackathon built for serious participation.</p>
        </div>
        <div><p className="mb-4 text-sm font-bold">Event</p><div className="flex flex-col gap-3 text-sm text-slate-400"><Link href="/about">About</Link><Link href="/prizes">Prizes</Link><Link href="/schedule">Schedule</Link><Link href="/rules">Rules</Link></div></div>
        <div><p className="mb-4 text-sm font-bold">Participants</p><div className="flex flex-col gap-3 text-sm text-slate-400"><Link href="/register">Register</Link><Link href="/dashboard">Dashboard</Link><Link href="/leaderboard">Leaderboard</Link><Link href="/faq">FAQ</Link></div></div>
      </div>
      <div className="border-t border-line"><div className="container-site flex flex-col gap-2 py-5 text-xs text-slate-500 sm:flex-row sm:justify-between"><span>© 2026 HyperLearningTech</span><span>Official: hackathon.hyperlearningtech.in</span></div></div>
    </footer>
  );
}