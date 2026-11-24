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
    sm: "h-10 w-10",
    default: "h-14 w-14",
    lg: "h-20 w-20",
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
              {/* Half-H gradient: light warm champagne */}
              <linearGradient
                id="hltPillar1"
                x1="8"
                y1="8"
                x2="20"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#f7f2eb" />
                <stop offset="45%" stopColor="#dfc4a2" />
                <stop offset="100%" stopColor="#967756" />
              </linearGradient>

              {/* L gradient: rich bronze */}
              <linearGradient
                id="hltPillar2"
                x1="24"
                y1="15"
                x2="34"
                y2="30"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#dfc4a2" />
                <stop offset="50%" stopColor="#c89f6d" />
                <stop offset="100%" stopColor="#6e4f32" />
              </linearGradient>

              {/* Diagonal slash gradient: bright at the top, fading to the tip */}
              <linearGradient
                id="hltBridge"
                x1="26"
                y1="15"
                x2="12"
                y2="33"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#c89f6d" />
                <stop offset="100%" stopColor="#8e6845" />
              </linearGradient>
            </defs>

            {/* Optical centering for the whole mark */}
            <g transform="translate(-1.8 -0.3)">
              {/* Half H: full left stem, crossbar, short right stem cut on the slash angle */}
              <path
                d="M8 8H12V14.5H18.5V8H22V16.2L18.5 21V17.5H12V24H8Z"
                fill="url(#hltPillar1)"
              />

              {/* L: vertical stem with a rounded-corner foot */}
              <path
                d="M24.5 15.6H28V26H34.2C34.8 26 35.6 26.4 35.6 27V28.8C35.6 29.2 35.2 29.6 34.8 29.6H24.5Z"
                fill="url(#hltPillar2)"
              />

              {/* Diagonal slash: tapered blade from the bottom-left tip up into the L */}
              <path
                d="M12.2 32.6L24.8 15.4L27 17.2Z"
                fill="url(#hltBridge)"
              />

              {/* Specular flare where the slash meets the L */}
              <circle cx="25.9" cy="16.5" r="1.3" fill="#ffffff" />
            </g>
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