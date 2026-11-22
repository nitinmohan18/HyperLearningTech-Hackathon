"use client";
import { useMemo, useState } from "react";
import { leaderboard } from "@/data/mock-data";

export default function LeaderboardPage() {
  const [filter,setFilter]=useState("All");
  const [query,setQuery]=useState("");
  const rows=useMemo(()=>leaderboard.filter(r=>(filter==="All"||r.type===filter)&&(`${r.project} ${r.team}`.toLowerCase().includes(query.toLowerCase()))),[filter,query]);
  return <div className="container-site section-pad"><p className="eyebrow">Demo leaderboard</p><h1 className="section-title">Overall ranking.</h1><p className="mt-4 text-sm text-amber-300">Mock UI data — not live or official results.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"><input className="input sm:max-w-sm" placeholder="Search project or team" value={query} onChange={e=>setQuery(e.target.value)} /><div className="flex gap-2">{["All","Solo","Squad"].map(v=><button key={v} type="button" onClick={()=>setFilter(v)} className={`h-10 rounded-lg border px-4 text-sm ${filter===v?"border-electric bg-electric/10 text-white":"border-line text-slate-400"}`}>{v}</button>)}</div></div><div className="table-wrap mt-6"><table className="table"><thead><tr><th>Rank</th><th>Project</th><th>Team</th><th>Score</th><th>Status</th><th>Updated</th></tr></thead><tbody>{rows.map(r=><tr key={r.rank}><td className="font-bold text-cyan">#{r.rank}</td><td className="font-semibold text-white">{r.project}</td><td>{r.team}</td><td>{r.score}/100</td><td><span className="rounded-full border border-amber-400/30 px-2 py-1 text-xs text-amber-300">{r.status}</span></td><td className="text-xs">{r.updated}</td></tr>)}</tbody></table></div>{rows.length===0&&<div className="card mt-4 p-8 text-center text-slate-400">No matching demo entries.</div>}</div>;
}