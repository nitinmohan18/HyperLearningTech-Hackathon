"use client";

import React from "react";
import { Clock, Globe, Users, Trophy } from "lucide-react";
import { StaggeredGrid, type BentoItem } from "@/components/core/staggered-grid";

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
      icon: <Clock size={18} />,
    },
    {
      id: "remote",
      title: "100% Fully Virtual",
      subtitle: "REMOTE ACCESS",
      stat: "Worldwide",
      description: "Compete from anywhere globally. Everything is coordinated online through GitHub, Discord live stages, and digital mentor check-in desks.",
      schedule: "GitHub · Discord Stage · Video Demos",
      image: "/highlights/remote.jpg",
      icon: <Globe size={18} />,
    },
    {
      id: "teams",
      title: "Solo or Squad Formats",
      subtitle: "TEAM STRUCTURE",
      stat: "1 to 4 Devs",
      description: "Full flexibility to compete independently or coordinate as a team of up to 4 contributors with complete IP ownership retained.",
      schedule: "₹99 Solo Pass · ₹200 Flat Squad Pass",
      image: "/highlights/squad.jpg",
      icon: <Users size={18} />,
    },
    {
      id: "prize",
      title: "Direct Cash Prize Pool",
      subtitle: "GUARANTEED AWARDS",
      stat: "₹14,992 Pool",
      description: "Guaranteed liquid cash disbursement directly via UPI to 8 verified positions: top 5 general podiums plus 3 special technical categories.",
      schedule: "8 Winners · Immediate UPI Payout",
      image: "/highlights/prize.jpg",
      icon: <Trophy size={18} />,
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
