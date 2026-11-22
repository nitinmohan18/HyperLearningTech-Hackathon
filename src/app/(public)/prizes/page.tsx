import { overallPrizes, specialPrizes } from "@/data/prizes";

export default function PrizesPage() {
  return (
    <div className="container-site section-pad">
      <p className="eyebrow">Cash prizes</p><h1 className="section-title">Up to ₹9000 total prize pool.</h1>
      <p className="section-copy">Cash awards are recognised across overall rankings and two special categories.</p>
      <h2 className="mt-12 text-2xl font-semibold">Overall Top 5</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{overallPrizes.map((p) => <div key={p.place} className="card p-5"><p className="text-xs uppercase tracking-widest text-slate-500">{p.place} place</p><p className="mt-3 text-3xl font-semibold">{p.amount}</p></div>)}</div>
      <h2 className="mt-12 text-2xl font-semibold">Special awards</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{specialPrizes.map((a) => <div key={a.category} className="card p-6"><h3 className="font-semibold">{a.category}</h3><div className="mt-5 flex gap-3">{a.prizes.map((prize, i) => <div key={prize} className="rounded-lg border border-line px-3 py-2 text-sm"><span className="text-slate-500">{i + 1}{i === 0 ? "st" : i === 1 ? "nd" : "rd"} </span>{prize}</div>)}</div></div>)}</div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[["One award per project", "A project can receive at most one cash award, even if eligible across multiple categories."], ["Certificates", "Eligible individual participants receive participation certificates; ranked projects receive ranking certificates."], ["Hidden surprises", "Some promising projects outside cash-prize positions may receive additional surprise recognition."]].map(([title, copy]) => <div key={title} className="card p-5"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p></div>)}
      </div>
    </div>
  );
}