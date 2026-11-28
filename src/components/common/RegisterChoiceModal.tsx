"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { event } from "@/data/event";

const OPEN_EVENT = "open-register-modal";

export function openRegisterModal() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function RegisterChoiceModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/75"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-choice-title"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-md max-h-[90dvh] overflow-y-auto rounded-xl border border-white/[0.1] bg-[#140e0a]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/[0.08]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a89d90]">
              Winter Hackathon ’26
            </p>
            <h2
              id="register-choice-title"
              className="mt-0.5 font-serif text-2xl font-normal text-white"
            >
              Register
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close registration options"
            className="rounded-lg p-1.5 text-[#a89d90] hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Clean Divided Options (Zero Glow, Zero Nested Boxes) */}
        <div className="divide-y divide-white/[0.08]">
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/[0.04]"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg text-white">
                  Hackathon Registration
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#a89d90]">
                  · {event.squadFee}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#b8ada0]">
                Compete solo or in a 1–4 member squad directly on Unstop.
              </p>
            </div>
            <ArrowUpRight
              size={17}
              className="shrink-0 text-[#a89d90] transition-colors group-hover:text-white"
            />
          </a>

          <Link
            href="/campus-ambassador"
            onClick={() => setOpen(false)}
            className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/[0.04]"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg text-white">
                  Campus Ambassador
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#a89d90]">
                  · Free
                </span>
              </div>
              <p className="mt-1 text-xs text-[#b8ada0]">
                Open to everyone. Promote the hackathon, refer teams, and earn cash prizes &amp; recognition.
              </p>
            </div>
            <ArrowRight
              size={17}
              className="shrink-0 text-[#a89d90] transition-colors group-hover:text-white"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
