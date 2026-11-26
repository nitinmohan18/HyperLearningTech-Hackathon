'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
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
    return text.split(' ').map((word, wIdx, words) => (
      <span key={wIdx} className="inline-block whitespace-nowrap">
        {word.split('').map((char, cIdx) => (
          <span key={cIdx} className="char inline-block">
            {char}
          </span>
        ))}
        {wIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
      </span>
    ));
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Run scrubbed ScrollTrigger animations on tablet/desktop (>= 768px) only;
    // keeps mobile scroll 100% native & avoids targeting display:none desktop bento cards.
    mm.add('(min-width: 768px)', () => {
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
    });

    return () => mm.revert();
  }, [scroller]);

  return (
    <div className={cn("relative w-full select-none bg-transparent border-0 shadow-none", className)}>
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center w-full relative mb-8 sm:mb-14 text-center">
        <p className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.26em] sm:tracking-[0.28em] text-[#d4af7a] mb-2 font-medium">
          Winter Hackathon &rsquo;26 · Format
        </p>
        <div
          ref={textRef}
          className="text font-serif uppercase tracking-wider text-[clamp(1.65rem,6.8vw,2.5rem)] md:text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] text-[#ffffff] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
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
                "bento-card relative cursor-pointer overflow-hidden rounded-[24px] contain-layout transition-[flex-grow,border-color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                isActive
                  ? "flex-[3.8] bg-gradient-to-b from-[#322318] via-[#221710] to-[#160f0a] border border-[#e0b885]/35 shadow-[0_24px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,235,205,0.35),inset_0_-1px_0_rgba(212,175,122,0.2)]"
                  : "flex-[1] bg-gradient-to-b from-[#2b1e15] via-[#1d140e] to-[#140e0a] border border-[#e0b885]/[0.18] hover:border-[#e0b885]/40 hover:from-[#322318] hover:to-[#1a110b] shadow-[0_12px_30px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,235,205,0.24)]"
              )}
              onMouseEnter={() => setActiveBento(index)}
              onClick={() => setActiveBento(index)}
            >
              {/* Natural Prismatic Light Sheen across top glass surface */}
              <div 
                className={cn(
                  "absolute inset-0 pointer-events-none transition-opacity duration-500",
                  isActive
                    ? "opacity-100 bg-gradient-to-br from-[#f5deb3]/[0.13] via-transparent to-[#d4af7a]/[0.07]"
                    : "opacity-65 bg-gradient-to-b from-[#f5deb3]/[0.09] via-transparent to-transparent"
                )} 
              />

              {/* Ultra-fine hairline specular rim highlight */}
              <div className="absolute top-0 inset-x-5 h-[1px] bg-gradient-to-r from-transparent via-[#f5deb3]/75 to-transparent pointer-events-none z-10" />

              {/* Realistic 3D Thematic Artwork in Opened Card */}
              {item.image && (
                <>
                  <div
                    className={cn(
                      "absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen transition-[opacity,transform] duration-500 will-change-[opacity,transform]",
                      isActive ? "opacity-85 scale-105" : "opacity-0 scale-95"
                    )}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      decoding="async"
                      className="w-full h-full object-cover object-center filter saturate-150 brightness-[1.18] contrast-105"
                    />
                  </div>
                  <div
                    className={cn(
                      "absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-[#140d08]/65 via-[#140d08]/10 to-transparent transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                </>
              )}

              {/* Active Expanded State Content */}
              <div
                className={cn(
                  "relative z-10 h-full flex flex-col justify-between p-8 transition-[opacity,transform] duration-300",
                  isActive
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-3 pointer-events-none"
                )}
              >
                {/* Header: Subtitle Pill & Translucent Convex Glass Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[#f0d8b6] px-3.5 py-1 rounded-full bg-[#e0b885]/[0.08] border border-[#e0b885]/25 shadow-[inset_0_1px_0_rgba(255,235,205,0.2)]">
                    {item.subtitle}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0b885]/[0.08] border border-[#e0b885]/25 text-[#f3dcb8] shadow-[0_4px_16px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,235,205,0.35)]">
                    {item.icon}
                  </div>
                </div>

                {/* Main Stat & Copy */}
                <div className="my-auto py-2">
                  <div className="font-mono text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 [text-shadow:_0_2px_4px_rgba(0,0,0,1),_0_4px_18px_rgba(0,0,0,0.95),_0_0_28px_rgba(0,0,0,0.85)]">
                    {item.stat}
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#fff5e4] leading-tight [text-shadow:_0_1px_3px_rgba(0,0,0,1),_0_2px_12px_rgba(0,0,0,0.98),_0_0_20px_rgba(0,0,0,0.9)]">
                    {item.title}
                  </h3>
                  <p className="mt-3.5 text-[13.5px] lg:text-sm font-medium leading-relaxed text-[#ffffff] max-w-lg [text-shadow:_0_1px_2px_rgba(0,0,0,1),_0_2px_10px_rgba(0,0,0,1),_0_0_18px_rgba(0,0,0,0.92)]">
                    {item.description}
                  </p>
                </div>

                {/* Specification Line */}
                {item.schedule && (
                  <div className="pt-4 border-t border-white/[0.15] flex items-center justify-between font-mono text-[11px] [text-shadow:_0_1px_3px_rgba(0,0,0,1),_0_2px_10px_rgba(0,0,0,0.95)]">
                    <span className="text-[#e5dacb] font-medium uppercase tracking-wider text-[10px]">
                      SPECIFICATION
                    </span>
                    <span className="text-[#ffffff] font-semibold">
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
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e0b885]/[0.12] border border-[#f5deb3]/40 text-[#fff1d6] shadow-[0_2px_10px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,235,205,0.35)]">
                  {item.icon}
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#f5efe6] [writing-mode:vertical-rl] rotate-180 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-medium select-none">
                  {item.title}
                </span>
                <span className="font-mono text-xs text-[#ffd89b] font-semibold px-2.5 py-0.5 rounded-full bg-[#e0b885]/[0.12] border border-[#e0b885]/30 shadow-sm">
                  0{index + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          MOBILE VIEW: GPU-Smooth Accordion Cards (Zero backdrop-blur stacking lag)
          ========================================================================= */}
      <div className="flex md:hidden flex-col gap-3 max-w-md mx-auto">
        {bentoItems.map((item, index) => {
          const isOpen = activeBento === index;

          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => setActiveBento(isOpen ? -1 : index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveBento(isOpen ? -1 : index);
                }
              }}
              className={cn(
                "rounded-2xl border transition-[border-color,background-color] duration-200 overflow-hidden cursor-pointer relative touch-manipulation",
                isOpen
                  ? "bg-gradient-to-b from-[#2c1f15] via-[#1c130d] to-[#120c08] border-[#e0b885]/40 shadow-[0_14px_32px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,235,205,0.2)]"
                  : "bg-gradient-to-b from-[#231811] to-[#140e09] border-[#e0b885]/[0.16] shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,235,205,0.1)] active:bg-[#271b13]"
              )}
            >
              {/* Hairline top specular rim */}
              <div className="absolute top-0 inset-x-5 h-[1px] bg-gradient-to-r from-transparent via-[#f5deb3]/45 to-transparent pointer-events-none z-10" />

              {/* Lightweight artwork layer rendered when open (no blend/filter for 60fps mobile scroll) */}
              {item.image && isOpen && (
                <>
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-[#120c08]/85 via-[#120c08]/40 to-[#120c08]/15" />
                </>
              )}

              {/* Accordion Header */}
              <div className="relative z-10 flex items-center justify-between gap-2.5 px-3.5 py-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={cn(
                      "shrink-0 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:stroke-[1.6] transition-colors",
                      isOpen ? "text-[#ffd89b]" : "text-[#e0b885]"
                    )}
                  >
                    {item.icon}
                  </div>
                  <span className="h-5 w-px bg-white/[0.1] shrink-0" />
                  <div className="min-w-0">
                    <div className="font-serif text-[15px] font-medium leading-tight text-[#fcf8f2] truncate">
                      {item.title}
                    </div>
                    <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#9f8f7c] truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[11px] font-semibold tracking-tight text-[#ffd89b]">
                    {item.stat}
                  </span>
                  <ChevronDown
                    size={14}
                    className={cn(
                      "text-[#b8ada0] transition-transform duration-300 ease-out",
                      isOpen && "rotate-180 text-[#ffd89b]"
                    )}
                  />
                </div>
              </div>

              {/* Smooth GPU Grid-Row Collapse/Expand */}
              <div
                className={cn(
                  "relative z-10 grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 pt-2.5 border-t border-white/[0.12]">
                    <p className="text-[12.5px] font-medium text-[#ffffff] leading-relaxed [text-shadow:_0_1px_2px_rgba(0,0,0,1),_0_2px_8px_rgba(0,0,0,0.95)]">
                      {item.description}
                    </p>
                    {item.schedule && (
                      <div className="mt-3 pt-2.5 border-t border-white/[0.1] flex items-center justify-between gap-2 font-mono text-[10px] [text-shadow:_0_1px_4px_rgba(0,0,0,1)]">
                        <span className="text-[#dfd3c3] uppercase tracking-wider shrink-0">Spec</span>
                        <span className="text-[#ffe4bd] font-semibold text-right truncate">{item.schedule}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StaggeredGrid;
