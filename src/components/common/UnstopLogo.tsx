import * as React from "react";
import { cn } from "@/lib/utils";

interface UnstopLogoProps {
  className?: string;
}

export function UnstopLogo({ className }: UnstopLogoProps) {
  return (
    <svg
      viewBox="0 0 124 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Unstop"
      className={cn("h-7 w-auto select-none", className)}
    >
      {/* Unstop circular emblem with "un" */}
      <circle cx="16" cy="16" r="14" fill="#1C4980" />
      <text
        x="16"
        y="20.5"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="13.5"
        fontWeight="700"
        letterSpacing="-0.4"
      >
        un
      </text>

      {/* Unstop wordmark */}
      <text
        x="37"
        y="22"
        fill="#FFFFFF"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="19.5"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        unstop
      </text>
    </svg>
  );
}
