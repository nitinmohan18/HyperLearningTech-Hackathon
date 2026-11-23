"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function RegistrationsPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");

  const rows = [
    ["Aarav Sharma", "Solo", "Verified", "aarav@example.com", "SignBridge"],
    ["Team Null", "Squad", "Pending", "team-null@example.com", "Carbon Lens"],
    ["Pulse Makers", "Squad", "Verified", "pulse@example.com", "Campus Pulse"],
    ["Meera Patel", "Solo", "Verified", "meera@example.com", "StudyFlow"],
    ["Green Byte", "Squad", "Pending", "greenbyte@example.com", "Wastewise"],
  ];

  const filtered = rows.filter(
    (r) =>
      (filter === "All" || r[1] === filter) &&
      r.join(" ").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            <span>Participant Roster</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-espresso">
            Registration Management
          </h1>
          <p className="mt-1 text-xs text-espresso-body">
            Review confirmed entries, entry categories, and verification states.
          </p>
        </div>
        <span className="badge-sand font-mono text-xs">
          128 Total Registered
        </span>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-muted" />
          <input
            className="input pl-10"
            placeholder="Search registrations..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <select
          className="input sm:w-44 font-mono text-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Formats</option>
          <option value="Solo">Solo Entries</option>
          <option value="Squad">Squad Entries</option>
        </select>
      </div>

      <div className="table-wrap mt-6 shadow-card">
        <table className="table">
          <thead>
            <tr>
              <th>Participant / Squad</th>
              <th>Format</th>
              <th>Project Proposal</th>
              <th>Verification</th>
              <th>Contact Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-border/50">
            {filtered.map((r) => (
              <tr key={r[0]} className="hover:bg-sand/10 transition-colors">
                <td className="font-heading font-semibold text-espresso">{r[0]}</td>
                <td>
                  <span className="badge-sand text-[10px]">{r[1]}</span>
                </td>
                <td className="text-espresso-body">{r[4]}</td>
                <td>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] ${
                      r[2] === "Verified"
                        ? "border border-orange-border bg-orange-subtle text-orange font-semibold"
                        : "border border-sand-border bg-cream-surface text-sand-muted"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        r[2] === "Verified" ? "bg-orange" : "bg-sand-muted"
                      }`}
                    />
                    {r[2]}
                  </span>
                </td>
                <td className="font-mono text-xs text-sand-muted">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
