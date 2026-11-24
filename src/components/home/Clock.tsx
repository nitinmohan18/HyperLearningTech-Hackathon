"use client";

import { useEffect, useRef, useMemo } from "react";
import "@/styles/clock.css";

interface ClockProps {
  target?: string;
}

export default function Clock({
  target = "2026-12-26T22:00:00+05:30",
}: ClockProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const tilt = root.querySelector<HTMLElement>(".chrono__tilt");

    // Interactive pointer parallax tilt (respects prefers-reduced-motion)
    let cleanupPointer = () => {};
    if (tilt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const handlePointerMove = (e: PointerEvent) => {
        const r = root.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `rotateY(${-10 + x * 8}deg) rotateX(${4 - y * 6}deg)`;
      };
      const handlePointerLeave = () => {
        tilt.style.transform = "";
      };
      root.addEventListener("pointermove", handlePointerMove);
      root.addEventListener("pointerleave", handlePointerLeave);
      cleanupPointer = () => {
        root.removeEventListener("pointermove", handlePointerMove);
        root.removeEventListener("pointerleave", handlePointerLeave);
      };
    }

    // Countdown timer logic
    const targetAttr = root.dataset.target || target;
    const targetTime = new Date(targetAttr).getTime();
    const els: Record<string, HTMLElement | null> = {
      d: root.querySelector('[data-u="d"]'),
      h: root.querySelector('[data-u="h"]'),
      m: root.querySelector('[data-u="m"]'),
      s: root.querySelector('[data-u="s"]'),
    };
    const title = root.querySelector<HTMLElement>(".chrono__title");
    const pad = (n: number) => String(n).padStart(2, "0");
    const last: Record<string, string> = {};
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      const diff = Math.max(0, targetTime - Date.now());
      const v: Record<string, number> = {
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff % 864e5) / 36e5),
        m: Math.floor((diff % 36e5) / 6e4),
        s: Math.floor((diff % 6e4) / 1e3),
      };

      for (const k of ["d", "h", "m", "s"]) {
        const t = pad(v[k]);
        if (last[k] !== t) {
          if (els[k]) {
            els[k]!.textContent = t;
          }
          last[k] = t;
        }
      }

      if (!diff) {
        if (title) {
          title.innerHTML = "Competition<br>Is Live";
        }
        return;
      }

      timerId = setTimeout(tick, 1000 - (Date.now() % 1000) + 5);
    };

    tick();

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
      cleanupPointer();
    };
  }, [target]);

  // Generate 60 watch dial ticks around the inner rim (longer every 5th)
  const dialTicks = useMemo(() => {
    const ticks = [];
    const cx = 150;
    const cy = 150;
    const rOuter = 144;

    for (let i = 0; i < 60; i++) {
      const rad = (i * 6 * Math.PI) / 180;
      const isMajor = i % 5 === 0;
      const isQuarter = i % 15 === 0;
      const length = isQuarter ? 10 : isMajor ? 6.5 : 3.5;
      const rInner = rOuter - length;

      const x1 = cx + rOuter * Math.sin(rad);
      const y1 = cy - rOuter * Math.cos(rad);
      const x2 = cx + rInner * Math.sin(rad);
      const y2 = cy - rInner * Math.cos(rad);

      ticks.push(
        <line
          key={i}
          x1={x1.toFixed(1)}
          y1={y1.toFixed(1)}
          x2={x2.toFixed(1)}
          y2={y2.toFixed(1)}
          stroke={isQuarter ? "#f7e3b5" : isMajor ? "#d6ad6a" : "rgba(214, 173, 106, 0.45)"}
          strokeWidth={isQuarter ? 1.6 : isMajor ? 1.2 : 0.8}
          strokeLinecap="round"
        />
      );
    }
    return ticks;
  }, []);

  return (
    <div
      ref={rootRef}
      className="chrono"
      id="chrono"
      role="timer"
      data-target={target}
    >
      {/* Warm ambient glow behind disc */}
      <div className="chrono__glow"></div>

      {/* 3D Tilt container wrapping disc only */}
      <div className="chrono__tilt">
        <div className="chrono__disc">
          {/* Dark glass face */}
          <div className="chrono__face">
            {/* 60 dial ticks */}
            <svg
              className="chrono__dial-svg"
              viewBox="0 0 300 300"
              fill="none"
              aria-hidden="true"
            >
              {dialTicks}
            </svg>

            {/* 3D Glass Crystal Convex Highlight */}
            <div className="chrono__glass" aria-hidden="true"></div>

            {/* Diamond 4-point star at top 12 o'clock */}
            <div className="orn orn--top">
              <svg className="star-svg" viewBox="0 0 24 36" fill="currentColor">
                <path d="M12 0 C12 10 14 18 24 18 C14 18 12 26 12 36 C12 26 10 18 0 18 C10 18 12 10 12 0 Z" />
              </svg>
            </div>

            {/* Title */}
            <p className="chrono__title">
              Competition<br />Starts in
            </p>

            {/* Digits & labels */}
            <div className="chrono__digits">
              <div className="u">
                <b data-u="d">00</b>
                <small>Days</small>
              </div>
              <span className="sep">:</span>
              <div className="u">
                <b data-u="h">00</b>
                <small>Hours</small>
              </div>
              <span className="sep">:</span>
              <div className="u">
                <b data-u="m">00</b>
                <small>Mins</small>
              </div>
              <span className="sep">:</span>
              <div className="u">
                <b data-u="s">00</b>
                <small>Secs</small>
              </div>
            </div>

            {/* Diamond with hairlines below labels */}
            <div className="orn orn--bot">
              <i></i>
              <svg className="star-svg star-svg--small" viewBox="0 0 24 32" fill="currentColor">
                <path d="M12 0 C12 9 14 16 24 16 C14 16 12 23 12 32 C12 23 10 16 0 16 C10 16 12 9 12 0 Z" />
              </svg>
              <i></i>
            </div>

            {/* Diamond 4-point star at bottom 6 o'clock rim */}
            <div className="orn orn--rim-bot">
              <svg className="star-svg" viewBox="0 0 24 36" fill="currentColor">
                <path d="M12 0 C12 10 14 18 24 18 C14 18 12 26 12 36 C12 26 10 18 0 18 C10 18 12 10 12 0 Z" />
              </svg>
            </div>
          </div>
        </div>
        <i className="rim-shine" aria-hidden="true"></i>
        <i className="flare" aria-hidden="true"></i>
      </div>

      {/* Flat dark-bronze 3D pedestal base under disc */}
      <div className="chrono__base">
        <div className="chrono__base-tier chrono__base-tier--upper"></div>
        <div className="chrono__base-tier chrono__base-tier--lower"></div>
      </div>
    </div>
  );
}
