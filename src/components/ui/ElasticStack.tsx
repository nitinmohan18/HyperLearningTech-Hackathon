"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ElasticStackItem {
  id: string | number;
  image?: string;
  name?: string;
}

export interface ElasticStackProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ElasticStackItem[];
  itemSize?: number;
  overlap?: number;
  pushForce?: number;
}

const SPRING_EASING =
  "linear(0, 0.55 12%, 0.95 28%, 1.045 45%, 1.015 68%, 1)";

export function ElasticStack({
  items,
  itemSize = 70,
  overlap = 30,
  pushForce = 15,
  className,
  ...props
}: ElasticStackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = items.length;

  return (
    <div
      className={cn("flex items-center justify-center cursor-pointer py-8", className)}
      onMouseLeave={() => setHoveredIndex(null)}
      {...props}
    >
      {items.map((item, i) => {
        let translateX = 0;
        let scale = 1;
        let zIndex = i;
        const isHovered = hoveredIndex === i;

        if (hoveredIndex !== null) {
          if (i > hoveredIndex) {
            translateX = Math.max(
              Math.min(pushForce * (total - i - 1), overlap),
              overlap - pushForce * (i - hoveredIndex - 1)
            );
          } else if (i < hoveredIndex) {
            translateX = -Math.min(pushForce * i, overlap);
          } else {
            scale = 1.25;
            zIndex = 100;
          }
        }

        return (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredIndex(i)}
            className={cn(
              "relative flex items-center justify-center rounded-full isolate bg-neutral-100 dark:bg-neutral-800",
              "border-2 border-white dark:border-neutral-950",
              isHovered ? "shadow-xl" : "shadow-sm"
            )}
            style={{
              width: itemSize,
              height: itemSize,
              marginLeft: i === 0 ? 0 : -overlap,
              transform: `translate3d(${translateX}px, 0, 0) scale(${scale})`,
              willChange: "transform",
              transitionProperty: "transform, z-index",
              transitionDuration: "450ms, 0ms",
              transitionDelay: isHovered ? "0ms, 90ms" : "0ms",
              transitionTimingFunction: SPRING_EASING,
              zIndex,
            }}
          >
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.name || `Avatar ${i}`}
                className="w-full h-full object-cover rounded-full pointer-events-none"
              />
            ) : (
              <div className="w-full h-full rounded-full flex items-center justify-center font-semibold text-neutral-500 dark:text-neutral-400">
                {item.name ? item.name.charAt(0) : i + 1}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export interface VerticalElasticStackProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string | number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overlap?: number;
  pushForce?: number;
  hoverScale?: number;
  className?: string;
}

export function VerticalElasticStack<T>({
  items,
  getKey,
  renderItem,
  overlap = 10,
  pushForce = 10,
  hoverScale = 1.016,
  className,
}: VerticalElasticStackProps<T>) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const total = items.length;
  itemRefs.current.length = total;

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Mutates GPU-only transform & z-index directly on refs so hovering triggers zero React re-renders
  const applyHover = (hoveredIndex: number | null) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      for (let i = 0; i < total; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        let translateY = 0;
        let scale = 1;
        let zIndex = i + 1;
        const isHovered = hoveredIndex === i;

        if (hoveredIndex !== null) {
          if (i > hoveredIndex) {
            translateY = Math.max(
              Math.min(pushForce * (total - i - 1), overlap),
              overlap - pushForce * (i - hoveredIndex - 1)
            );
          } else if (i < hoveredIndex) {
            translateY = -Math.min(pushForce * i, overlap);
          } else {
            scale = hoverScale;
            zIndex = 100;
          }
        }

        el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        el.style.transitionDelay = isHovered ? "0ms, 80ms" : "0ms";
        el.style.zIndex = String(zIndex);
      }
      rafRef.current = null;
    });
  };

  return (
    <div
      className={cn("flex flex-col py-2", className)}
      onPointerLeave={() => applyHover(null)}
    >
      {items.map((item, i) => (
        <div
          key={getKey(item, i)}
          ref={(node) => {
            itemRefs.current[i] = node;
          }}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") {
              applyHover(i);
            }
          }}
          className="relative isolate contain-layout"
          style={{
            marginTop: i === 0 ? 0 : -overlap,
            transform: "translate3d(0, 0, 0) scale(1)",
            willChange: "transform",
            backfaceVisibility: "hidden",
            transitionProperty: "transform, z-index",
            transitionDuration: "420ms, 0ms",
            transitionTimingFunction: SPRING_EASING,
            zIndex: i + 1,
          }}
        >
          {renderItem(item, i)}
        </div>
      ))}
    </div>
  );
}

export default ElasticStack;
