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
    <div className="grid grid-cols-4 divide-x divide-white/[0.08] py-2 text-center">
      {items.map((item) => (
        <div key={item.label} className="px-1 sm:px-2">
          <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-medium text-white tracking-tight">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="mt-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#b8ada0]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
