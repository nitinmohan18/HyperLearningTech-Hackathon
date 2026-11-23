"use client";

import { useEffect, useState } from "react";
import { event } from "@/data/event";

export default function Countdown() {
  const [left, setLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, new Date(event.competitionStart).getTime() - Date.now());
      setLeft({
        days: Math.floor(diff / 864e5),
        hours: Math.floor(diff / 36e5) % 24,
        minutes: Math.floor(diff / 6e4) % 60,
        seconds: Math.floor(diff / 1000) % 60,
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const items = [
    { label: "Days", value: left.days },
    { label: "Hours", value: left.hours },
    { label: "Minutes", value: left.minutes },
    { label: "Seconds", value: left.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-sand-border/15 bg-[#140e0a]/60 py-3 text-center transition-colors hover:border-sand-border/30"
        >
          <div className="font-mono text-2xl font-semibold text-[#f0eae1] sm:text-3xl">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8e7a68]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
