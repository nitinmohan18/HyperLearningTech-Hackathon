'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface BentoItem {
  id: number | string;
  title: string;
  subtitle: string;
  stat: string;
  description: string;
  icon: React.ReactNode;
  schedule?: string;
  image?: string;
}

export interface StaggeredGridProps {
  bentoItems: BentoItem[];
  centerText?: string;
  className?: string;
  scroller?: string | Element | Window | null;
}

export function StaggeredGrid({
  bentoItems,
  centerText = "EVENT HIGHLIGHTS",
  className,
  scroller,
}: StaggeredGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [activeBento, setActiveBento] = useState<number>(1);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useEffect(() => {
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('.char');
      gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          scroller: scroller || undefined,
          start: 'top bottom-=80',
          end: 'center center+=50',
          scrub: 1,
        },
      }).from(chars, {
        ease: 'sine.out',
        yPercent: 120,
        autoAlpha: 0,
        stagger: {
          each: 0.03,
          from: 'center',
        },
      });
    }

    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.bento-card');
      gsap.from(cards, {
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: scroller || undefined,
          start: 'top bottom-=60',
          end: 'center center',
          scrub: 1,
        },
        y: 30,
        autoAlpha: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      });
    }
  }, [scroller]);

  return (
    <div className={cn("relative w-full select-none bg-transparent border-0 shadow-none", className)}>
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center w-full relative mb-10 sm:mb-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4af7a] mb-2 font-medium">
          At A Glance · Key Pillars
        </p>
        <div
          ref={textRef}
          className="text font-serif uppercase tracking-wider text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1] text-[#ffffff] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
        >
          {splitText(centerText)}
        </div>
      </div>

      {/* =========================================================================
          DESKTOP VIEW: Individual Free-Floating Cards (Zero Outer Container Box)
          ========================================================================= */}
      <div
        ref={containerRef}
        className="hidden md:flex mx-auto max-w-5xl h-[390px] flex-row items-stretch gap-3.5 bg-transparent border-0 shadow-none outline-none"
      >
        {bentoItems.map((item, index) => {
          const isActive = activeBento === index;

          return (
            <div
              key={item.id}
              className={cn(
                "bento-card relative cursor-pointer overflow-hidden rounded-[24px] transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]",
                isActive
                  ? "flex-[3.8] bg-gradient-to-b from-[#2a1e16]/60 via-[#1c140e]/75 to-[#120d09]/90 border border-white/[0.22] shadow-[0_24px_60px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(212,175,122,0.15)] backdrop-blur-2xl"
                  : "flex-[1] bg-gradient-to-b from-[#221812]/45 via-[#18110b]/55 to-[#100b07]/70 border border-white/[0.1] hover:border-white/[0.2] hover:bg-[#251b14]/55 shadow-[0_12px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-xl"
              )}
              onMouseEnter={() => setActiveBento(index)}
              onClick={() => setActiveBento(index)}
            >
              {/* Natural Prismatic Light Sheen across top glass surface */}
              <div 
                className={cn(
                  "absolute inset-0 pointer-events-none transition-opacity duration-500",
                  isActive
                    ? "opacity-100 bg-gradient-to-br from-white/[0.12] via-transparent to-[#d4af7a]/[0.04]"
                    : "opacity-40 bg-gradient-to-b from-white/[0.08] via-transparent to-transparent"
                )} 
              />

              {/* Ultra-fine hairline specular rim highlight */}
              <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-10" />

              {/* Realistic 3D Thematic Artwork in Opened Card (like prize cards) */}
              {item.image && (
                <div
                  className={cn(
                    "absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-700",
                    isActive ? "opacity-35 scale-105" : "opacity-0 scale-95"
                  )}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center filter saturate-125 mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />
                </div>
              )}

              {/* Active Expanded State Content */}
              <div
                className={cn(
                  "relative z-10 h-full flex flex-col justify-between p-8 transition-all duration-400",
                  isActive
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-3 pointer-events-none"
                )}
              >
                {/* Header: Subtitle Pill & Translucent Convex Glass Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[#e8ded1] px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.14] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
                    {item.subtitle}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.2] text-[#f5ebd9] shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-md">
                    {item.icon}
                  </div>
                </div>

                {/* Main Stat & Copy */}
                <div className="my-auto py-2">
                  <div className="font-mono text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                    {item.stat}
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-[#fcf8f2] leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3.5 text-xs lg:text-[13px] leading-relaxed text-[#c7baa8] max-w-lg">
                    {item.description}
                  </p>
                </div>

                {/* Specification Line */}
                {item.schedule && (
                  <div className="pt-4 border-t border-white/[0.09] flex items-center justify-between font-mono text-[11px]">
                    <span className="text-[#968877] uppercase tracking-wider text-[10px]">
                      SPECIFICATION
                    </span>
                    <span className="text-[#e8ded1] font-medium">
                      {item.schedule}
                    </span>
                  </div>
                )}
              </div>

              {/* Inactive Vertical State */}
              <div
                className={cn(
                  "absolute inset-0 z-20 flex flex-col items-center justify-between py-8 px-2 transition-opacity duration-300 pointer-events-none",
                  isActive ? "opacity-0" : "opacity-100"
                )}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.15] text-[#d4af7a] shadow-[0_2px_10px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)]">
                  {item.icon}
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ded4c5] [writing-mode:vertical-rl] rotate-180 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-medium select-none">
                  {item.title}
                </span>
                <span className="font-mono text-xs text-[#d4af7a] font-semibold px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.1] shadow-sm">
                  0{index + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          MOBILE VIEW: iOS Frosted Glass Accordion List
          ========================================================================= */}
      <div className="flex md:hidden flex-col gap-3 max-w-md mx-auto px-2">
        {bentoItems.map((item, index) => {
          const isOpen = activeBento === index;

          return (
            <div
              key={item.id}
              onClick={() => setActiveBento(isOpen ? -1 : index)}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer backdrop-blur-xl relative",
                isOpen
                  ? "bg-gradient-to-b from-[#2a1e16]/70 to-[#140d09]/85 border-white/[0.22] shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.4)]"
                  : "bg-[#18110b]/60 border-white/[0.1] shadow-[0_8px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]"
              )}
            >
              {/* Internal Sheen Reflection */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#d4af7a] font-semibold">
                    0{index + 1}
                  </span>
                  <div className="text-[#f5ebd9]">{item.icon}</div>
                  <span className="font-serif text-base font-normal text-white">
                    {item.title}
                  </span>
                </div>
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#e8ded1] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.14] shrink-0 backdrop-blur-sm">
                  {item.stat}
                </span>
              </div>

              {isOpen && (
                <div className="relative z-10 px-4 pb-4 pt-1 border-t border-white/[0.08]">
                  <p className="text-xs text-[#c7baa8] leading-relaxed mt-2">
                    {item.description}
                  </p>
                  {item.schedule && (
                    <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10.5px]">
                      <span className="text-[#968877] uppercase">Specification</span>
                      <span className="text-[#e8ded1]">{item.schedule}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StaggeredGrid;
