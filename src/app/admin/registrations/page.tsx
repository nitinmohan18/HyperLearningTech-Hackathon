"use client";
import { useState } from "react";
export default function RegistrationsPage(){
 const [q,setQ]=useState(""); const [filter,setFilter]=useState("All");
 const rows=[["Aarav Sharma","Solo","Verified","aarav@example.com"],["Team Null","Squad","Pending","team-null@example.com"],["Pulse Makers","Squad","Verified","pulse@example.com"]];
 const filtered=rows.filter(r=>(filter==="All"||r[1]==filter)&&r.join(" ").toLowerCase().includes(q.toLowerCase()));
 return <><p className="eyebrow">Mock registrations</p><h1 className="text-3xl font-semibold">Registration management</h1><div className="mt-6 flex flex-col gap-3 sm:flex-row"><input className="input sm:max-w-xs" placeholder="Search registrations" value={q} onChange={e=>setQ(e.target.value)}/><select className="input sm:w-40" value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Solo</option><option>Squad</option></select></div><div className="table-wrap mt-5"><table className="table"><thead><tr><th>Participant / Squad</th><th>Type</th><th>Status</th><th>Email</th></tr></thead><tbody>{filtered.map(r=><tr key={r[0]}><td className="text-white">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>)}</tbody></table></div></>;
}