import React from "react";

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: "sm" | "default" | "lg";
}

export default function Logo({
  className = "",
  showSubtitle = true,
  size = "default",
}: LogoProps) {
  const iconSizes = {
    sm: "h-7 w-7",
    default: "h-9 w-9",
    lg: "h-11 w-11",
  };

  const textSizes = {
    sm: "text-base",
    default: "text-lg sm:text-xl",
    lg: "text-2xl sm:text-3xl",
  };

  return (
    <div className={`group flex items-center gap-3 transition-opacity ${className}`}>
      {/* Brand Icon Emblem */}
      <div className="relative shrink-0">
        {/* Ambient bloom effect on hover */}
        <div className="absolute -inset-1 rounded-xl bg-[#c89f6d]/25 blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div
          className={`relative ${iconSizes[size]} grid place-items-center rounded-xl border border-sand-border/30 bg-[#16100c]/80 shadow-card backdrop-blur-md transition-all duration-300 group-hover:border-[#c89f6d]/50 group-hover:bg-[#1f150f]`}
        >
          <svg
            className="h-full w-full p-1.5"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Pillar 1: Light warm champagne gradient */}
              <linearGradient
                id="hltPillar1"
                x1="10"
                y1="8"
                x2="18"
                y2="32"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#f7f2eb" />
                <stop offset="45%" stopColor="#dfc4a2" />
                <stop offset="100%" stopColor="#967756" />
              </linearGradient>

              {/* Pillar 2: Rich bronze gradient */}
              <linearGradient
                id="hltPillar2"
                x1="22"
                y1="8"
                x2="30"
                y2="32"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#dfc4a2" />
                <stop offset="50%" stopColor="#c89f6d" />
                <stop offset="100%" stopColor="#6e4f32" />
              </linearGradient>

              {/* Diagonal hyper-bridge gradient */}
              <linearGradient
                id="hltBridge"
                x1="16"
                y1="16"
                x2="24"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#c89f6d" />
                <stop offset="100%" stopColor="#8e6845" />
              </linearGradient>
            </defs>

            {/* Left Angled Isometric Pillar (H-left stem) */}
            <path
              d="M10 13.5L16.5 9.5V26.5L10 30.5V13.5Z"
              fill="url(#hltPillar1)"
            />

            {/* Connecting Angled Hyper-Bridge (H-crossbar / accelerator) */}
            <path
              d="M16.5 17.5L23.5 13.5V22.5L16.5 26.5V17.5Z"
              fill="url(#hltBridge)"
              opacity="0.95"
            />

            {/* Right Angled Isometric Pillar (H-right stem) */}
            <path
              d="M23.5 9.5L30 13.5V30.5L23.5 26.5V9.5Z"
              fill="url(#hltPillar2)"
            />

            {/* Central Specular Prism Flare */}
            <circle cx="20" cy="20" r="1.75" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* Brand Wordmark Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 leading-none tracking-tight">
          <span className={`font-serif ${textSizes[size]} font-normal text-[#f0eae1]`}>
            HyperLearning
          </span>
          <span className={`font-serif ${textSizes[size]} italic font-normal text-[#c89f6d]`}>
            Tech
          </span>
        </div>
        {showSubtitle && (
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.26em] text-[#8e7a68] transition-colors group-hover:text-[#c89f6d]">
            Winter Hackathon ’26
          </span>
        )}
      </div>
    </div>
  );
}
