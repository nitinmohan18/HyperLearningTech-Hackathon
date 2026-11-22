"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["About", "/about"], ["Prizes", "/prizes"], ["Rules", "/rules"],
  ["Schedule", "/schedule"], ["Leaderboard", "/leaderboard"], ["FAQ", "/faq"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="border-b border-line bg-[#070b14] px-4 py-2 text-center text-xs font-semibold text-slate-300">
        Registrations close 25 December 2026 · 24-hour online competition
      </div>
      <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/95 backdrop-blur">
        <nav className="container-site flex h-16 items-center justify-between" aria-label="Primary navigation">
          <Link href="/" className="flex items-center gap-3 font-semibold text-white" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-electric/40 bg-electric/10 text-sm text-cyan">HL</span>
            <span className="hidden sm:block">HyperLearningTech</span>
          </Link>
          <div className="hidden items-center gap-5 lg:flex">
            {links.map(([label, href]) => <Link key={href} href={href} className="text-sm text-slate-300 transition hover:text-white">{label}</Link>)}
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white">Login</Link>
            <Link href="/register" className="btn-primary h-10 px-4">Register Now</Link>
          </div>
          <button type="button" className="grid h-10 w-10 place-items-center sm:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>
        {open && (
          <div className="border-t border-line bg-ink px-5 py-5 sm:hidden">
            <div className="flex flex-col gap-4">
              {links.map(([label, href]) => <Link key={href} href={href} className="text-sm text-slate-200" onClick={() => setOpen(false)}>{label}</Link>)}
              <Link href="/register" className="btn-primary" onClick={() => setOpen(false)}>Register Now</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}