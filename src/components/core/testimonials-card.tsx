"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Trophy, Medal, Award, CheckCircle2 } from "lucide-react";

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

  // Direct card tap swaps to the next card
  const handleCardClick = (clickedIndex: number) => {
    if (clickedIndex === activeIndex) {
      handleNext();
    } else {
      setDirection(clickedIndex > activeIndex ? 1 : -1);
      setActiveIndex(clickedIndex);
    }
  };

  // Drag / swipe detection
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
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
          icon: <Trophy size={20} className="text-[#ffd89b]" />,
          crown: "GOLD MEDALIST",
          tagBg: "bg-[#4a3219]/80 border-[#ffd89b]/50 text-[#ffd89b]",
          statGlow: "text-[#ffffff] drop-shadow-[0_2px_18px_rgba(255,216,155,0.45)]",
        };
      case "2nd":
        return {
          icon: <Medal size={20} className="text-[#e8decb]" />,
          crown: "SILVER MEDALIST",
          tagBg: "bg-[#382b20]/80 border-white/20 text-[#e8decb]",
          statGlow: "text-[#ffffff] drop-shadow-[0_2px_14px_rgba(232,222,203,0.35)]",
        };
      case "3rd":
        return {
          icon: <Medal size={20} className="text-[#d4af7a]" />,
          crown: "BRONZE MEDALIST",
          tagBg: "bg-[#2d1e15]/80 border-[#d4af7a]/40 text-[#d4af7a]",
          statGlow: "text-[#ffffff] drop-shadow-[0_2px_12px_rgba(212,175,122,0.3)]",
        };
      default:
        return {
          icon: <Award size={18} className="text-[#b5a794]" />,
          crown: "FINALIST MERIT",
          tagBg: "bg-white/[0.08] border-white/10 text-[#d6cec2]",
          statGlow: "text-[#ffffff] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]",
        };
    }
  };

  const rankTheme = getRankTheme(activeItem.place);

  return (
    <div className={cn("w-full py-4 sm:py-8", className)}>
      <div
        className="relative mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center max-w-5xl"
        style={{ perspective: "1500px" }}
      >
        {/* =========================================================================
            TOP / LEFT: 3D Realistic Trophy Card Stack
            ========================================================================= */}
        <div className="lg:col-span-6 relative w-full max-w-[300px] sm:max-w-[360px] aspect-[1/1.12] mx-auto select-none touch-pan-y">
          <AnimatePresence custom={direction}>
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;
              const theme = getRankTheme(item.place);

              return (
                <motion.div
                  key={item.id}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleCardClick(index)}
                  className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[28px] border border-white/[0.22] shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1.5px_0_rgba(255,255,255,0.45)] backdrop-blur-2xl flex flex-col justify-between p-5 sm:p-6 cursor-pointer overflow-hidden active:cursor-grabbing"
                  style={{
                    background: item.gradient,
                  }}
                  initial={{
                    x: offset * 16,
                    y: Math.abs(offset) * 7,
                    z: -120 * Math.abs(offset),
                    scale: 0.9 - Math.abs(offset) * 0.04,
                    rotateZ: rotations[index % rotations.length],
                    opacity: isActive ? 1 : 0.35,
                    zIndex: 10 - Math.abs(offset),
                  }}
                  animate={
                    isActive
                      ? {
                          x: [offset * 16, direction === 1 ? -170 : 170, 0],
                          y: [Math.abs(offset) * 7, 0, 0],
                          z: [-160, 120, 220],
                          scale: [0.9, 1.02, 1],
                          rotateZ: [rotations[index % rotations.length], -2.5, 0],
                          opacity: 1,
                          zIndex: 100,
                        }
                      : {
                          x: offset * 16,
                          y: Math.abs(offset) * 7,
                          z: -120 * Math.abs(offset),
                          rotateZ: rotations[index % rotations.length],
                          scale: 0.9 - Math.abs(offset) * 0.04,
                          opacity: 0.45,
                          zIndex: 10 - Math.abs(offset),
                        }
                  }
                  exit={{
                    x: direction === 1 ? -230 : 230,
                    z: -240,
                    scale: 0.8,
                    rotateZ: direction === 1 ? -7 : 7,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Real 3D Trophy Background Visual Render */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-75 mix-blend-screen scale-105 transition-opacity duration-500">
                    <img
                      src={item.image}
                      alt={`${item.place} Trophy`}
                      className="w-full h-full object-cover object-center filter saturate-150 brightness-110"
                    />
                  </div>

                  {/* Specular Sheen & Contrast Vignette to keep text ultra crisp */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-[1]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35)_0%,transparent_75%)] pointer-events-none z-[1]" />

                  {/* Card Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span
                      className={cn(
                        "font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] px-3 py-1 rounded-full border shadow-sm backdrop-blur-md",
                        theme.tagBg
                      )}
                    >
                      {item.place} PLACE
                    </span>
                    <div className="flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full bg-white/[0.08] border border-white/[0.25] shadow-inner backdrop-blur-md">
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
                      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#e0b885] font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                        GUARANTEED CASH AWARD
                      </span>
                      <span className="h-1 w-1 rounded-full bg-[#ffd89b]" />
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="relative z-10 pt-2 flex items-center justify-between font-mono text-[11px] text-[#ded4c5] backdrop-blur-sm">
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
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ffd89b] animate-pulse" />
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

          {/* Animated Detail Stage */}
          <div className="py-4 sm:py-5 min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
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
                <div className="mt-4 space-y-2 border-l-2 border-[#d4af7a]/30 pl-3.5 py-0.5">
                  {activeItem.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-mono text-[#ded4c5]">
                      <CheckCircle2 size={13} className="text-[#ffd89b] shrink-0 mt-0.5" />
                      <span className="leading-snug">{perk}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination and Touch Controls */}
          {showNavigation && items.length > 1 && (
            <div className="pt-2 flex items-center justify-between">
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
                      "h-2 rounded-full transition-all duration-300",
                      dotIdx === activeIndex
                        ? "w-7 sm:w-8 bg-gradient-to-r from-[#ffd89b] to-[#e0b885]"
                        : "w-2 bg-white/[0.18] hover:bg-white/[0.35]"
                    )}
                    aria-label={`Jump to rank ${it.place}`}
                  />
                ))}
              </div>

              {/* Prev / Next Circular Touch Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="flex items-center justify-center w-10 sm:w-11 h-10 sm:h-11 rounded-full border border-white/[0.12] bg-[#1a120c]/80 text-[#e8ded1] transition-all hover:border-[#ffd89b]/50 hover:bg-[#25180e] hover:text-white active:scale-95 shadow-md"
                  aria-label="Previous Prize Standing"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center justify-center w-10 sm:w-11 h-10 sm:h-11 rounded-full border border-white/[0.12] bg-[#1a120c]/80 text-[#e8ded1] transition-all hover:border-[#ffd89b]/50 hover:bg-[#25180e] hover:text-white active:scale-95 shadow-md"
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
