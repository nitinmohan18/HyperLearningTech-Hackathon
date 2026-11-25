"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CreepyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /**
   * Optional custom class for the button container
   */
  className?: string;
  /**
   * Optional custom class for the button cover (the visible part)
   */
  coverClassName?: string;
  /**
   * Optional href if wrapping navigation
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type Coords = {
  x: number;
  y: number;
};

export const CreepyButton = ({
  children,
  className,
  coverClassName,
  onClick,
  ...props
}: CreepyButtonProps) => {
  const eyesRef = useRef<HTMLSpanElement>(null);
  const [eyeCoords, setEyeCoords] = useState<Coords>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const updateEyes = (e: React.MouseEvent | React.TouchEvent) => {
    const userEvent =
      "touches" in e ? (e as React.TouchEvent).touches[0] : (e as React.MouseEvent);

    if (!eyesRef.current) return;

    // get the center of the eyes container
    const eyesRect = eyesRef.current.getBoundingClientRect();
    const eyesCenter = {
      x: eyesRect.left + eyesRect.width / 2,
      y: eyesRect.top + eyesRect.height / 2,
    };

    // cursor position
    const cursor = {
      x: userEvent.clientX,
      y: userEvent.clientY,
    };

    // calculate the eye angle
    const dx = cursor.x - eyesCenter.x;
    const dy = cursor.y - eyesCenter.y;
    const angle = Math.atan2(-dy, dx) + Math.PI / 2;

    // pupil distance from the eye center
    const visionRangeX = 180; // Max distance to look horizontally
    const visionRangeY = 75; // Max distance to look vertically
    const distance = Math.hypot(dx, dy);

    // Limit the movement so pupils don't go too far
    const x = (Math.sin(angle) * Math.min(distance, visionRangeX)) / visionRangeX;
    const y = (Math.cos(angle) * Math.min(distance, visionRangeY)) / visionRangeY;

    setEyeCoords({ x, y });
  };

  // Reset eyes when mouse leaves
  const resetEyes = () => {
    setEyeCoords({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const pupilStyle = {
    transform: `translate(calc(-50% + ${eyeCoords.x * 50}%), calc(-50% + ${eyeCoords.y * 50}%))`,
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative rounded-xl bg-[#0e0906] cursor-pointer outline-none select-none group tap-highlight-transparent touch-manipulation overflow-visible border border-white/[0.08] shadow-[0_6px_20px_rgba(0,0,0,0.6)]",
        className
      )}
      onClick={onClick}
      onMouseMove={(e) => {
        updateEyes(e);
        setIsHovered(true);
      }}
      onMouseLeave={resetEyes}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {/* Eyes Container placed in the bottom right corner underneath the tilting flap */}
      <span
        ref={eyesRef}
        className="absolute flex items-center gap-[0.35em] right-[1.1em] bottom-[0.7em] h-[0.75em] z-0 pointer-events-none"
      >
        {/* Left Eye (only animates when uncovered/hovered) */}
        <motion.span
          className="relative w-[0.75em] h-[0.75em] bg-white rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
          animate={isHovered ? { scaleY: [1, 1, 0.1, 1] } : { scaleY: 1 }}
          transition={
            isHovered
              ? {
                  duration: 3.5,
                  times: [0, 0.9, 0.95, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : { duration: 0.15 }
          }
        >
          <span
            className="absolute top-1/2 left-1/2 w-[0.38em] h-[0.38em] bg-[#160d06] rounded-full transition-transform duration-75 ease-out shadow-[0_0_1px_rgba(0,0,0,0.8)]"
            style={pupilStyle}
          />
        </motion.span>
        {/* Right Eye (only animates when uncovered/hovered) */}
        <motion.span
          className="relative w-[0.75em] h-[0.75em] bg-white rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
          animate={isHovered ? { scaleY: [1, 1, 0.1, 1] } : { scaleY: 1 }}
          transition={
            isHovered
              ? {
                  duration: 3.5,
                  times: [0, 0.9, 0.95, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : { duration: 0.15 }
          }
        >
          <span
            className="absolute top-1/2 left-1/2 w-[0.38em] h-[0.38em] bg-[#160d06] rounded-full transition-transform duration-75 ease-out shadow-[0_0_1px_rgba(0,0,0,0.8)]"
            style={pupilStyle}
          />
        </motion.span>
      </span>

      {/* Button Cover */}
      <motion.span
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center rounded-xl font-medium tracking-wide",
          "origin-[1.25em_50%]",
          coverClassName
        )}
        animate={{
          rotate: isHovered ? -12 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
      >
        {children}
      </motion.span>

      {/* Invisible placeholder to establish button dimensions accurately */}
      <span className="invisible flex items-center justify-center px-6 py-3 min-w-[9.5em] text-sm font-semibold pointer-events-none">
        {children}
      </span>
    </motion.button>
  );
};

export default CreepyButton;
