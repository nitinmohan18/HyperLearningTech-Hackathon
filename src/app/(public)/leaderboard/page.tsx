"use client";

import { useMemo, useState } from "react";
import { Search, Trophy } from "lucide-react";
import { leaderboard } from "@/data/mock-data";

export default function LeaderboardPage() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () =>
      leaderboard.filter(
        (r) =>
          (filter === "All" || r.type === filter) &&
          `${r.project} ${r.team}`.toLowerCase().includes(query.toLowerCase())
      ),
    [filter, query]
  );

  return (
    <div className="bg-cream">
      <div className="container-site section-pad">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
              Event Standings
            </p>
            <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#f0eae1]">
              Competition Leaderboard
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#9e8e7c] sm:text-lg">
              Real-time rankings and verified checkpoint scores. Official results declared on 27 Dec, 11:00 PM IST.
            </p>
          </div>
          <span className="font-mono text-xs text-[#8e7a68]">
            Provisional Standings · Declaration Upcoming
          </span>
        </div>

        {leaderboard.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-12 text-center backdrop-blur-xl">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
              <Trophy size={26} />
            </div>
            <h2 className="mt-5 font-serif text-2xl font-normal text-[#f0eae1]">
              Standings Declaration Upcoming
            </h2>
            <p className="mt-2 max-w-md mx-auto text-sm leading-relaxed text-[#9e8e7c]">
              Real-time rankings and checkpoint scores will be declared live following the kickoff checkpoint reviews on 26–27 December 2026. Official final standings will be published here upon competition conclusion.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-mono text-[#8e7a68]">
              <span>Kickoff: 26 Dec 2026, 10:00 PM IST</span>
              <span>·</span>
              <span>Review: Hourly Checkpoints</span>
              <span>·</span>
              <span>Freeze: 27 Dec 2026, 10:00 PM IST</span>
            </div>
          </div>
        ) : (
          <>
            {/* Search & Filters */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e7a68]"
                />
                <input
                  className="input pl-11"
                  placeholder="Search by project or team name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#8e7a68] mr-1">Filter:</span>
                {["All", "Squad"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setFilter(v)}
                    className={`h-10 rounded-full px-5 font-mono text-xs font-medium transition-all ${
                      filter === v
                        ? "bg-[#f0eae1] text-[#120d09] shadow-sm font-semibold"
                        : "border border-sand-border/20 bg-[#16100c]/40 text-[#9e8e7c] hover:border-sand-border/40 hover:text-[#f0eae1]"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Leaderboard Table Container */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-sand-border/15 bg-[#120d09]/35 backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-sand-border/15 bg-[#16100c]/60">
                      <th className="px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8e7a68] w-20">Rank</th>
                      <th className="px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8e7a68]">Project</th>
                      <th className="px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8e7a68]">Team</th>
                      <th className="px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8e7a68]">Type</th>
                      <th className="px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8e7a68]">Score</th>
                      <th className="px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8e7a68]">Status</th>
                      <th className="px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8e7a68]">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-border/10">
                    {rows.map((r) => (
                      <tr key={r.rank} className="transition-colors hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-mono font-semibold text-[#c89f6d]">
                          #{String(r.rank).padStart(2, "0")}
                        </td>
                        <td className="px-6 py-4 font-serif text-lg font-normal text-[#f0eae1]">
                          {r.project}
                        </td>
                        <td className="px-6 py-4 text-[#9e8e7c]">{r.team}</td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-[#8e7a68]">{r.type}</span>
                        </td>
                        <td className="px-6 py-4 font-mono font-semibold text-[#f0eae1]">
                          {r.score}<span className="text-xs text-[#8e7a68] font-normal">/100</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#c89f6d]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#c89f6d]" />
                            {r.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-[#8e7a68]">{r.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {rows.length === 0 && (
              <div className="mt-6 rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-12 text-center backdrop-blur-xl">
                <p className="font-serif text-xl font-normal text-[#f0eae1]">
                  No matching entries found
                </p>
                <p className="mt-1 text-xs text-[#8e7a68]">
                  Try adjusting your search query or filter selection.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
