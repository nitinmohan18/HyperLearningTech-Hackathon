"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Github, X, FolderGit2 } from "lucide-react";
import { projects } from "@/data/mock-data";

export default function ProjectsPage() {
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);

  return (
    <div className="bg-cream">
      <div className="container-site section-pad">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e7a68]">
              Project Showcase
            </p>
            <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#f0eae1]">
              Submitted Projects
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#9e8e7c] sm:text-lg">
              Explore inspectable software artifacts, design prototypes, and verified repositories built during Winter Hackathon ’26.
            </p>
          </div>
          <span className="font-mono text-xs text-[#8e7a68]">
            {projects.length} Verified Submissions
          </span>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-12 text-center backdrop-blur-xl">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-sand-border/25 bg-[#1c140d]/60 text-[#c89f6d]">
              <FolderGit2 size={26} />
            </div>
            <h2 className="mt-5 font-serif text-2xl font-normal text-[#f0eae1]">
              Submissions Showcase Upcoming
            </h2>
            <p className="mt-2 max-w-md mx-auto text-sm leading-relaxed text-[#9e8e7c]">
              Verified project repositories, prototypes, and architecture artifacts built during Winter Hackathon ’26 will be showcased here following the final code freeze on 27 December 2026.
            </p>
            <div className="mt-6 flex justify-center">
              <Link href="/register" className="btn-primary">
                Register Your Project Idea
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.title}
                className="group flex flex-col justify-between rounded-2xl border border-sand-border/15 bg-[#120d09]/35 p-7 backdrop-blur-xl transition-all duration-300 hover:border-sand-border/40 hover:bg-[#18110b]/50 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#c89f6d]">{p.category}</span>
                    <FolderGit2 size={16} className="text-[#8e7a68]" />
                  </div>

                  <h2 className="mt-4 font-serif text-2xl font-normal text-[#f0eae1]">
                    {p.title}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-[#8e7a68]">
                    By {p.team}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-[#9e8e7c] line-clamp-3">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-sand-border/15 pt-5">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] text-[#8e7a68]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn-secondary mt-5 w-full justify-center text-xs"
                    onClick={() => setSelected(p)}
                  >
                    Inspect Project Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Project Modal */}
        {selected && (
          <div
            className="fixed inset-0 z-[70] grid place-items-center bg-black/60 p-5 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-lg rounded-2xl border border-sand-border/25 bg-[#140e0a] p-7 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs text-[#c89f6d]">{selected.category}</span>
                  <h2 className="mt-2 font-serif text-3xl font-normal text-[#f0eae1]">
                    {selected.title}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-[#8e7a68]">Built by {selected.team}</p>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  className="grid h-8 w-8 place-items-center rounded-xl border border-sand-border/20 bg-[#1c140d] text-[#9e8e7c] transition hover:text-[#f0eae1]"
                  onClick={() => setSelected(null)}
                >
                  <X size={16} />
                </button>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#9e8e7c]">
                {selected.description}
              </p>

              <div className="mt-5">
                <p className="font-mono text-xs uppercase tracking-wider text-[#8e7a68] mb-2">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((t: string) => (
                    <span
                      key={t}
                      className="rounded-lg border border-sand-border/20 bg-[#1c140d] px-2.5 py-1 font-mono text-xs text-[#f0eae1]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="btn-primary flex-1 justify-center text-xs"
                  href={selected.deploy}
                >
                  <ExternalLink size={14} /> Live Deployment
                </a>
                <a
                  className="btn-secondary flex-1 justify-center text-xs"
                  href={selected.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={14} /> GitHub Repository
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
