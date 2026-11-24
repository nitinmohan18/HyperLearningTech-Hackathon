"use client";

import React, { useId, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface MorphTextProps {
  /**
   * Array of words / phrases to cycle through.
   */
  words?: string[];
  /**
   * Duration (ms) each word is displayed before transitioning.
   * @default 4000
   */
  interval?: number;
  fontSize?: string;
  fontFamily?: string;
  className?: string;
  textClassName?: string;
}

export function MorphText({
  words = ["LOGIN", "PORTAL"],
  interval = 4000,
  fontSize = "12px",
  fontFamily = "var(--font-mono)",
  className,
  textClassName,
}: MorphTextProps) {
  const uid = useId().replace(/:/g, "");
  const filterId = `morph-threshold-${uid}`;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto trigger every `interval` (4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      triggerMorph();
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  const triggerMorph = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
      setIsAnimating(false);
    }, 450);
  };

  const nextIndex = (currentIndex + 1) % words.length;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center cursor-pointer select-none", className)}
      onMouseEnter={triggerMorph}
      onTouchStart={triggerMorph}
    >
      {/* Threshold SVG Filter for viscous text morphing */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        className={cn(
          "relative flex items-center justify-center overflow-visible",
          textClassName
        )}
        style={{
          fontSize,
          fontWeight: 600,
          fontFamily,
          filter: `url(#${filterId})`,
          width: "100%",
          textAlign: "center",
        }}
      >
        <span
          className={cn(
            "transition-all duration-300 transform whitespace-nowrap inline-block",
            isAnimating
              ? "opacity-0 blur-[6px] scale-90"
              : "opacity-100 blur-0 scale-100"
          )}
        >
          {words[currentIndex]}
        </span>

        {isAnimating && (
          <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-80 blur-[2px] scale-105 whitespace-nowrap">
            {words[nextIndex]}
          </span>
        )}
      </div>
    </div>
  );
}

export default MorphText;
