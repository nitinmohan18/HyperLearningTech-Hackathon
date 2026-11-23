"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

interface DockContextType {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextType>({
  mouseX: new MotionValue(Infinity),
  magnification: 50,
  distance: 120,
});

const DockItemContext = createContext<{ isHovered: boolean }>({
  isHovered: false,
});

export interface DockProps {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

export function Dock({
  className = "",
  magnification = 48,
  distance = 110,
  children,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`flex items-center gap-2 rounded-full border border-sand-border/25 bg-[#120d09]/75 px-3 py-1.5 backdrop-blur-xl shadow-card transition-all ${className}`}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

export interface DockItemProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export function DockItem({
  className = "",
  children,
  onClick,
  href,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, magnification, distance } = useContext(DockContext);
  const [isHovered, setIsHovered] = useState(false);

  const baseSize = 36;

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [baseSize, magnification, baseSize]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 180,
    damping: 14,
  });

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative flex items-center justify-center rounded-full transition-all cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );

  return (
    <DockItemContext.Provider value={{ isHovered }}>
      {href ? (
        <Link href={href} className="inline-flex items-center justify-center focus:outline-none">
          {content}
        </Link>
      ) : (
        content
      )}
    </DockItemContext.Provider>
  );
}

export function DockLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isHovered } = useContext(DockItemContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0, x: "-50%" }}
      animate={{
        opacity: isHovered ? 1 : 0,
        y: isHovered ? -8 : 0,
        x: "-50%",
      }}
      transition={{ duration: 0.15 }}
      className={`pointer-events-none absolute -top-8 left-1/2 z-50 whitespace-nowrap rounded-md border border-sand-border/30 bg-[#16100c]/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#f0eae1] shadow-card backdrop-blur-md ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function DockIcon({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center p-2 text-[#9e8e7c] transition-colors hover:text-[#f0eae1] ${className}`}
    >
      {children}
    </div>
  );
}
