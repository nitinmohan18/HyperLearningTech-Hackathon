"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Award, CalendarDays, CheckCircle2, Clock3, Github, Users } from "lucide-react";
import { event } from "@/data/event";
import { overallPrizes, specialPrizes } from "@/data/prizes";

function Countdown() {
  const [left, setLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, new Date(event.competitionStart).getTime() - Date.now());
      setLeft({ days: Math.floor(diff / 864e5), hours: Math.floor(diff / 36e5) % 24, minutes: Math.floor(diff / 6e4) % 60, seconds: Math.floor(diff / 1000) % 60 });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <div className="grid grid-cols-4 gap-2">{Object.entries(left).map(([label, value]) => <div key={label} className="rounded-lg border border-line bg-[#0c1120] px-2 py-3 text-center"><div className="text-xl font-semibold text-white sm:text-2xl">{String(value).padStart(2, "0")}</div><div className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">{label}</div></div>)}</div>;
}

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(91,140,255,.16),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(139,92,246,.08),transparent_28%)]" />
        <div className="container-site relative grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <div className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-cyan" /> 1st Edition · Online</div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[72px]">HyperLearningTech <span className="text-slate-400">Winter Hackathon ’26</span></h1>
            <p className="mt-6 text-lg font-bold tracking-[0.18em] text-cyan">{event.tagline}</p>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">A 24-hour online build challenge for individuals and teams who want to turn a genuine idea into a working, inspectable project.</p>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-300"><CalendarDays size={18} className="text-electric" /><span>26–27 December 2026 · 10:00 PM IST onward</span></div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/register" className="btn-primary">Register Now <ArrowRight size={17} /></Link><Link href="/prizes" className="btn-secondary">Explore Prizes</Link></div>
          </div>
          <div className="card p-5 shadow-glow sm:p-6">
            <div className="mb-5 flex items-center justify-between"><div><p className="text-xs uppercase tracking-widest text-slate-500">Competition starts in</p><p className="mt-1 text-sm font-semibold">26 Dec · 10:00 PM IST</p></div><Clock3 className="text-electric" /></div>
            <Countdown />
            <div className="mt-5 border-t border-line pt-5"><p className="text-sm text-slate-400">Build window</p><p className="mt-1 text-lg font-semibold">27 December · 10:00 PM IST</p></div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-[#0b101d]"><div className="container-site grid grid-cols-2 divide-x divide-line lg:grid-cols-4">
        {[["24 Hours", "Build challenge"], ["Up to ₹9000", "Cash prize pool"], ["Top 25", "Ranked projects"], ["Solo & Squad", "Participation"]].map(([value, label]) => <div key={value} className="px-4 py-8 text-center first:border-l-0"><p className="text-xl font-semibold sm:text-2xl">{value}</p><p className="mt-2 text-xs uppercase tracking-wider text-slate-500">{label}</p></div>)}
      </div></section>

      <section className="section-pad"><div className="container-site grid gap-10 lg:grid-cols-2">
        <div><p className="eyebrow">The challenge</p><h2 className="section-title">Build something real in 24 hours.</h2></div>
        <div><p className="section-copy mt-0">Winter Hackathon ’26 brings independent builders together for a focused, transparent online competition. Participants receive a project brief, develop an original working solution, maintain inspectable repository progress and present a complete submission.</p><p className="mt-5 text-sm leading-7 text-slate-400">Genuine development effort matters: AI tools may assist, but use must be disclosed, existing work cannot substitute for the hackathon build, and the project must remain the participant’s or team’s own.</p></div>
      </div></section>

      <section className="border-y border-line bg-[#0b101d]"><div className="container-site section-pad">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow">Prizes</p><h2 className="section-title">Recognise the work.</h2></div><Link href="/prizes" className="text-sm font-bold text-cyan">View all prizes <ArrowRight className="inline" size={16} /></Link></div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{overallPrizes.map((prize) => <div key={prize.place} className="card p-5"><Award className="text-electric" size={22} /><p className="mt-8 text-xs uppercase tracking-widest text-slate-500">{prize.place} place</p><p className="mt-2 text-2xl font-semibold">{prize.amount}</p></div>)}</div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">{specialPrizes.map((award) => <div key={award.category} className="card flex items-center justify-between p-5"><div><p className="text-sm font-semibold">{award.category}</p><p className="mt-1 text-xs text-slate-500">Top 3 category awards</p></div><p className="text-sm font-bold text-cyan">{award.prizes.join(" / ")}</p></div>)}</div>
      </div></section>

      <section className="section-pad"><div className="container-site">
        <p className="eyebrow">How to participate</p><h2 className="section-title">From registration to reveal.</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">{[
          ["01", "Register", "Choose solo or squad and submit the proposal."],
          ["02", "Prepare", "Complete checkout briefings on 25 December."],
          ["03", "Build", "Create, checkpoint and inspect for 24 hours."],
          ["04", "Submit", "Deploy, document and preserve repository evidence."],
        ].map(([step, title, copy]) => <div key={step} className="bg-panel p-6"><p className="text-xs font-bold text-cyan">STEP {step}</p><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p></div>)}</div>
      </div></section>

      <section className="border-y border-line bg-[#0b101d]"><div className="container-site section-pad">
        <p className="eyebrow">Event timeline</p><h2 className="section-title">Three decisive days.</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {[["25 Dec · Preparation", "Registration closes and participants prepare repository and project details."],["26 Dec · 10 PM IST", "The 24-hour competition starts with the initial repository snapshot."],["27 Dec · 8–11 PM IST", "Repository reveal, final submission, judging and results."]].map(([time,copy]) => <div key={time} className="bg-panel p-6"><p className="text-sm font-bold text-cyan">{time}</p><p className="mt-3 text-sm leading-7 text-slate-400">{copy}</p></div>)}
        </div>
      </div></section>

      <section className="section-pad"><div className="container-site grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="card p-6 sm:p-8"><p className="eyebrow">Hidden surprises</p><h2 className="text-2xl font-semibold">Some promising work deserves another look.</h2><p className="mt-4 text-sm leading-7 text-slate-400">A selection of promising projects outside the announced cash-prize positions may receive additional surprise recognition. Exact categories, recipients and formats are intentionally undisclosed.</p></div>
        <div className="card p-6 sm:p-8"><p className="eyebrow">Common questions</p><h2 className="text-2xl font-semibold">Know the event before you build.</h2><div className="mt-5 space-y-3 text-sm"><Link href="/faq" className="flex justify-between border-b border-line py-3 text-slate-300">Solo vs squad <ArrowRight size={16}/></Link><Link href="/faq" className="flex justify-between border-b border-line py-3 text-slate-300">GitHub and collaborator access <ArrowRight size={16}/></Link><Link href="/faq" className="flex justify-between py-3 text-slate-300">Certificates and prizes <ArrowRight size={16}/></Link></div></div>
      </div></section>

      <section className="border-y border-line bg-[#0b101d]"><div className="container-site grid gap-8 py-12 lg:grid-cols-[1fr_1fr]">
        <div className="card p-6"><Github className="text-electric" /><h3 className="mt-5 text-xl font-semibold">Repository integrity</h3><p className="mt-3 text-sm leading-7 text-slate-400">Every entry needs a private GitHub repository, official collaborator access and an initial snapshot at 10 PM on 26 December. Repository public reveal is planned for 8 PM on 27 December.</p></div>
        <div className="card p-6"><Award className="text-cyan" /><h3 className="mt-5 text-xl font-semibold">Certificates</h3><p className="mt-3 text-sm leading-7 text-slate-400">Eligible participants receive individual participation certificates. Top 25 projects receive ranking certificates, and every member of a ranked squad receives an individual certificate.</p></div>
      </div></section>

      <section className="section-pad text-center"><div className="container-site"><Users className="mx-auto text-electric" /><h2 className="mt-5 section-title">Bring the idea. Build the proof.</h2><p className="mx-auto section-copy">Registration is open until 25 December 2026. Solo entry is {event.soloFee}; squad entry is {event.squadFee} for a team of 2–4.</p><Link href="/register" className="btn-primary mt-8">Register for Winter Hackathon ’26 <ArrowRight size={17} /></Link></div></section>
    </>
  );
}