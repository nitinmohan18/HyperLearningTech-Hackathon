"use client";

import React from "react";
import { StaggeredGrid, type BentoItem } from "@/components/core/staggered-grid";

function ChronometerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 9v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 3h5M12 3v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

function MeridianGlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.35" />
      <path d="M3.5 9.5h17M3.5 14.5h17" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function SquadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="9.5" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 18.5c.4-3 2.8-4.7 6-4.7s5.6 1.7 6 4.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16.8" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.35" opacity="0.8" />
      <path d="M16.5 14.2c2.2.3 3.7 1.6 4 3.8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

function ChaliceTrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M7.5 4.5h9v5.2a4.5 4.5 0 0 1-9 0V4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.5 6.5H5a1.5 1.5 0 0 0-1.5 1.5v1a3 3 0 0 0 3 3h1.3M16.5 6.5H19a1.5 1.5 0 0 1 1.5 1.5v1a3 3 0 0 1-3 3h-1.3" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M12 14.2v4.3M8.5 19.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function EventHighlights() {
  const bentoItems: BentoItem[] = [
    {
      id: "build",
      title: "24-Hour Continuous Sprint",
      subtitle: "BUILD WINDOW",
      stat: "24 Hours",
      description: "Non-stop synchronized development sprint. Live commit logging starts sharp at 10:00 PM with an automated repository freeze after 24 hours.",
      schedule: "26 Dec 10:00 PM – 27 Dec 10:00 PM IST",
      image: "/highlights/24h.jpg",
      icon: <ChronometerIcon />,
    },
    {
      id: "remote",
      title: "100% Fully Virtual",
      subtitle: "REMOTE ACCESS",
      stat: "Worldwide",
      description: "Compete from anywhere globally. Everything is coordinated online through GitHub, Discord live stages, and digital mentor check-in desks.",
      schedule: "GitHub · Discord Stage · Video Demos",
      image: "/highlights/remote.jpg",
      icon: <MeridianGlobeIcon />,
    },
    {
      id: "teams",
      title: "Unified Squad Format",
      subtitle: "TEAM STRUCTURE",
      stat: "1 to 4 Devs",
      description: "Participate alone or as a collaborative squad of up to 4 contributors under one unified entry format with full IP ownership retained.",
      schedule: "₹200 Flat Entry Fee (1–4 Members)",
      image: "/highlights/squad.jpg",
      icon: <SquadIcon />,
    },
    {
      id: "prize",
      title: "Direct Cash Prize Pool",
      subtitle: "GUARANTEED AWARDS",
      stat: "₹14,992 Pool",
      description: "Guaranteed cash disbursement directly via UPI within 2–4 hours post-results to 8 verified positions: top 5 general podiums plus 3 special technical categories.",
      schedule: "8 Winners · UPI Transfer in 2–4h",
      image: "/highlights/prize.jpg",
      icon: <ChaliceTrophyIcon />,
    },
  ];

  return (
    <section id="overview" className="overflow-x-clip border-b border-white/[0.08] bg-[#1a120c] py-12 sm:py-24">
      <div className="container-site">
        <StaggeredGrid
          centerText="EVENT HIGHLIGHTS"
          bentoItems={bentoItems}
        />
      </div>
    </section>
  );
}
