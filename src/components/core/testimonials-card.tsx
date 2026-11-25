"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Trophy, Medal, Award } from "lucide-react";

export interface PrizeStackItem {
  id: string | number;
  place: string;
  amount: string;
  title: string;
  description: string;
  image: string;
  perks: string[];
  gradient: string;
  badgeColor: string;
  accentColor: string;
}

interface TestimonialsCardProps {
  items: PrizeStackItem[];
  className?: string;
  showNavigation?: boolean;
  showCounter?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function TestimonialsCard({
  items,
  className,
  showNavigation = true,
  showCounter = true,
  autoPlay = false,
  autoPlayInterval = 3500,
}: TestimonialsCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const didDragRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const activeItem = items[activeIndex];

  // Auto-play effect
  React.useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  // Direct card tap swaps to the next card (guarded against post-drag click firing)
  const handleCardClick = (clickedIndex: number) => {
    if (Date.now() - didDragRef.current < 220) return;
    if (clickedIndex === activeIndex) {
      handleNext();
    } else {
      setDirection(clickedIndex > activeIndex ? 1 : -1);
      setActiveIndex(clickedIndex);
    }
  };

  // Drag / swipe detection
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 10) {
      didDragRef.current = Date.now();
    }
    const swipeThreshold = 42;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      handlePrev();
    }
  };

  // Organic deck angles
  const rotations = useMemo(() => [3, -2.5, 2, -3, 1.5], []);

  if (!items || items.length === 0) {
    return null;
  }

  const getRankTheme = (place: string) => {
    switch (place) {
      case "1st":
        return {
          icon: <Trophy size={17} className="text-[#ffd89b]" />,
          crown: "GOLD MEDALIST",
          tagBg: "bg-[#160e08]/75 border-[#ffd89b]/45 text-[#ffe6be] shadow-[inset_0_1px_0_rgba(255,235,205,0.2)]",
          iconBg: "bg-[#160e08]/75 border-[#ffd89b]/40 shadow-[0_4px_14px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,235,205,0.22)]",
          statGlow: "text-[#ffffff] drop-shadow-[0_2px_18px_rgba(255,216,155,0.45)]",
        };
      case "2nd":
        return {
          icon: <Medal size={17} className="text-[#e8decb]" />,
          crown: "SILVER MEDALIST",
          tagBg: "bg-[#160e08]/75 border-[#e8decb]/35 text-[#f2eadc] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]",
          iconBg: "bg-[#160e08]/75 border-[#e8decb]/30 shadow-[0_4px_14px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)]",
          statGlow: "text-[#ffffff] drop-shadow-[0_2px_14px_rgba(232,222,203,0.35)]",
        };
      case "3rd":
        return {
          icon: <Medal size={17} className="text-[#e0b885]" />,
          crown: "BRONZE MEDALIST",
          tagBg: "bg-[#160e08]/75 border-[#d4af7a]/40 text-[#e8c696] shadow-[inset_0_1px_0_rgba(255,235,205,0.16)]",
          iconBg: "bg-[#160e08]/75 border-[#d4af7a]/35 shadow-[0_4px_14px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,235,205,0.18)]",
          statGlow: "text-[#ffffff] drop-shadow-[0_2px_12px_rgba(212,175,122,0.3)]",
        };
      default:
        return {
          icon: <Award size={17} className="text-[#c7baa8]" />,
          crown: "FINALIST MERIT",
          tagBg: "bg-[#160e08]/75 border-white/[0.16] text-[#d6cec2] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
          iconBg: "bg-[#160e08]/75 border-white/[0.16] shadow-[0_4px_14px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.14)]",
          statGlow: "text-[#ffffff] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]",
        };
    }
  };

  const rankTheme = getRankTheme(activeItem.place);

  return (
    <div className={cn("w-full py-4 sm:py-8", className)}>
      <div
        className="relative mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-14 items-center max-w-5xl"
        style={isMobile ? undefined : { perspective: "1500px" }}
      >
        {/* =========================================================================
            TOP / LEFT: 3D Realistic Trophy Card Stack
            ========================================================================= */}
        <div className="lg:col-span-6 relative w-full max-w-[290px] sm:max-w-[360px] aspect-[1/1.1] sm:aspect-[1/1.12] mx-auto select-none touch-pan-y">
          <AnimatePresence custom={direction}>
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              const theme = getRankTheme(item.place);

              // Skip rendering deep off-stack cards on mobile to avoid stacked GPU overdraw
              if (isMobile && absOffset > 2) return null;

              const mobileX = offset * 8;
              const desktopX = offset * 16;
              const cardX = isMobile ? mobileX : desktopX;

              return (
                <motion.div
                  key={item.id}
                  drag={isActive ? "x" : false}
                  dragDirectionLock
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.35}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleCardClick(index)}
                  className="absolute inset-0 w-full h-full rounded-[22px] sm:rounded-[28px] border border-white/[0.22] shadow-[0_14px_32px_rgba(0,0,0,0.65)] sm:shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1.5px_0_rgba(255,255,255,0.45)] md:backdrop-blur-2xl flex flex-col justify-between p-[18px] sm:p-6 cursor-pointer overflow-hidden active:cursor-grabbing touch-manipulation"
                  style={{
                    background: item.gradient,
                  }}
                  initial={{
                    x: cardX,
                    y: absOffset * (isMobile ? 5 : 7),
                    z: isMobile ? 0 : -120 * absOffset,
                    scale: (isMobile ? 0.92 : 0.9) - absOffset * 0.04,
                    rotateZ: rotations[index % rotations.length],
                    opacity: isActive ? 1 : 0.35,
                    zIndex: 10 - absOffset,
                  }}
                  animate={
                    isActive
                      ? isMobile
                        ? {
                            x: [cardX, direction === 1 ? -72 : 72, 0],
                            y: [absOffset * 5, -4, 0],
                            z: 0,
                            scale: [0.92, 1.015, 1],
                            rotateZ: [rotations[index % rotations.length], direction === 1 ? -2.2 : 2.2, 0],
                            opacity: 1,
                            zIndex: 100,
                          }
                        : {
                            x: [desktopX, direction === 1 ? -170 : 170, 0],
                            y: [absOffset * 7, 0, 0],
                            z: [-160, 120, 220],
                            scale: [0.9, 1.02, 1],
                            rotateZ: [rotations[index % rotations.length], -2.5, 0],
                            opacity: 1,
                            zIndex: 100,
                          }
                      : {
                          x: cardX,
                          y: absOffset * (isMobile ? 5 : 7),
                          z: isMobile ? 0 : -120 * absOffset,
                          rotateZ: rotations[index % rotations.length],
                          scale: (isMobile ? 0.92 : 0.9) - absOffset * 0.04,
                          opacity: 0.45,
                          zIndex: 10 - absOffset,
                        }
                  }
                  exit={{
                    x: direction === 1 ? (isMobile ? -120 : -230) : isMobile ? 120 : 230,
                    z: isMobile ? 0 : -240,
                    scale: 0.85,
                    rotateZ: direction === 1 ? -6 : 6,
                    opacity: 0,
                  }}
                  transition={{
                    duration: isMobile ? 0.52 : 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Real 3D Trophy Background Visual Render (only heavy blend/filter on active card for mobile smoothness) */}
                  {(!isMobile || isActive) && (
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-75 sm:mix-blend-screen scale-105 transition-opacity duration-500">
                      <img
                        src={item.image}
                        alt={`${item.place} Trophy`}
                        className="w-full h-full object-cover object-center sm:filter sm:saturate-150 sm:brightness-110"
                      />
                    </div>
                  )}

                  {/* Specular Sheen & Contrast Vignette to keep text ultra crisp */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/80 pointer-events-none z-[1]" />
                  <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35)_0%,transparent_75%)] pointer-events-none z-[1]" />

                  {/* Card Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span
                      className={cn(
                        "font-mono text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.24em] px-3 py-1 rounded-full border sm:backdrop-blur-md",
                        theme.tagBg
                      )}
                    >
                      {item.place} PLACE
                    </span>
                    <div
                      className={cn(
                        "flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full border sm:backdrop-blur-md",
                        theme.iconBg
                      )}
                    >
                      {theme.icon}
                    </div>
                  </div>

                  {/* Center Hero Cash Prize */}
                  <div className="relative z-10 my-auto text-center py-2">
                    <div
                      className={cn(
                        "font-mono text-4xl sm:text-5xl font-extrabold tracking-tight",
                        theme.statGlow
                      )}
                    >
                      {item.amount}
                    </div>
                    <div className="mt-1 flex items-center justify-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-[#ffd89b]" />
                      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#e0b885] font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                        GUARANTEED CASH AWARD
                      </span>
                      <span className="h-1 w-1 rounded-full bg-[#ffd89b]" />
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="relative z-10 pt-2 flex items-center justify-between font-mono text-[11px] text-[#ded4c5] sm:backdrop-blur-sm">
                    <span className="truncate font-medium">{item.title}</span>
                    <span className="text-[#ffd89b] text-[10px] tracking-wider uppercase shrink-0 font-semibold">
                      Tap to swap →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* =========================================================================
            BOTTOM / RIGHT: Informative Spec Stage & Controls
            ========================================================================= */}
        <div className="lg:col-span-6 flex flex-col justify-center px-1">
          {/* Eyebrow & Live Step Progress Indicator */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rotate-45 bg-[#ffd89b] shrink-0" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#d4af7a] font-semibold">
                {rankTheme.crown}
              </span>
            </div>

            {showCounter && (
              <div className="flex items-center gap-1.5 font-mono text-xs text-[#a89d90]">
                <span className="text-white font-bold">{activeIndex + 1}</span>
                <span className="text-white/30">/</span>
                <span>{items.length}</span>
              </div>
            )}
          </div>

          {/* Animated Detail Stage — fixed min-h prevents layout jumps across ranks */}
          <div className="pt-2 pb-1 sm:py-3.5 min-h-[224px] sm:min-h-[235px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: isMobile ? 0.34 : 0.25 }}
              >
                {/* Title and Prize Badge */}
                <div className="flex flex-wrap items-baseline gap-2.5 sm:gap-3">
                  <h3 className="font-serif text-2xl sm:text-4xl font-normal text-white tracking-tight">
                    {activeItem.title}
                  </h3>
                  <span className="font-mono text-lg sm:text-2xl font-bold text-[#ffd89b] drop-shadow-sm">
                    {activeItem.amount}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#c7baa8]">
                  {activeItem.description}
                </p>

                {/* Specific Deliverable Perks */}
                <div className="mt-3.5 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                  {activeItem.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2.5 py-1.5 text-[11.5px] sm:text-[12.5px] text-[#ded4c5]">
                      <span className="h-1 w-1 rounded-full bg-[#e0b885] shrink-0" />
                      <span className="leading-snug">{perk}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination and Touch Controls */}
          {showNavigation && items.length > 1 && (
            <div className="pt-0.5 flex items-center justify-between">
              {/* Progress Pill Track */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {items.map((it, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => {
                      setDirection(dotIdx > activeIndex ? 1 : -1);
                      setActiveIndex(dotIdx);
                    }}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300 touch-manipulation",
                      dotIdx === activeIndex
                        ? "w-7 sm:w-8 bg-gradient-to-r from-[#ffd89b] to-[#e0b885]"
                        : "w-2.5 sm:w-2 bg-white/[0.18] hover:bg-white/[0.35]"
                    )}
                    aria-label={`Jump to rank ${it.place}`}
                  />
                ))}
              </div>

              {/* Prev / Next Circular Touch Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="flex items-center justify-center w-10 sm:w-11 h-10 sm:h-11 rounded-full border border-white/[0.12] bg-[#1a120c]/80 text-[#e8ded1] transition-all hover:border-[#ffd89b]/50 hover:bg-[#25180e] hover:text-white active:scale-95 shadow-md touch-manipulation"
                  aria-label="Previous Prize Standing"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center justify-center w-10 sm:w-11 h-10 sm:h-11 rounded-full border border-white/[0.12] bg-[#1a120c]/80 text-[#e8ded1] transition-all hover:border-[#ffd89b]/50 hover:bg-[#25180e] hover:text-white active:scale-95 shadow-md touch-manipulation"
                  aria-label="Next Prize Standing"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsCard;
