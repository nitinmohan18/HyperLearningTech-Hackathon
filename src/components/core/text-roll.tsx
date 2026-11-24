'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, type Transition, type Variant } from 'framer-motion';

export interface TextRollProps {
  children: string;
  className?: string;
  duration?: number;
  getEnterDelay?: (index: number) => number;
  getExitDelay?: (index: number) => number;
  transition?: Transition;
  variants?: {
    enter: Variant;
    exit: Variant;
  };
  /** Interval in ms to auto-roll periodically (especially useful for touch/mobile). Defaults to 6000ms */
  autoRollInterval?: number;
}

export function TextRoll({
  children,
  className,
  duration = 0.5,
  getEnterDelay = (i) => i * 0.02,
  getExitDelay = (i) => i * 0.02,
  transition = { ease: [0.22, 1, 0.36, 1] },
  variants,
  autoRollInterval = 6000,
}: TextRollProps) {
  const letters = children.split('');
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Mobile / periodic trigger state
  const [isTriggered, setIsTriggered] = useState(false);

  // Initial trigger when scrolled into view
  useEffect(() => {
    if (isInView) {
      setIsTriggered(true);
      const timer = setTimeout(() => {
        setIsTriggered(false);
      }, duration * 1000 + 400);
      return () => clearTimeout(timer);
    }
  }, [isInView, duration]);

  // Periodic subtle roll trigger (runs periodically while visible in viewport)
  useEffect(() => {
    if (!isInView || !autoRollInterval) return;

    const interval = setInterval(() => {
      setIsTriggered(true);
      setTimeout(() => {
        setIsTriggered(false);
      }, duration * 1000 + 400);
    }, autoRollInterval);

    return () => clearInterval(interval);
  }, [isInView, autoRollInterval, duration]);

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap overflow-hidden leading-[1.1] cursor-default select-none ${className || ''}`}
      initial="initial"
      animate={isTriggered ? 'hover' : 'initial'}
      whileHover="hover"
      onTouchStart={() => {
        setIsTriggered(true);
        setTimeout(() => setIsTriggered(false), duration * 1000 + 400);
      }}
    >
      {letters.map((letter, index) => {
        const isSpace = letter === ' ';
        return (
          <span
            key={index}
            className="relative inline-block overflow-hidden"
            aria-hidden="true"
          >
            <motion.span
              className="inline-block"
              variants={{
                initial: { y: 0 },
                hover: { y: '-100%' },
                ...variants,
              }}
              transition={{
                ...transition,
                duration,
                delay: getEnterDelay(index),
              }}
            >
              {isSpace ? '\u00A0' : letter}
            </motion.span>
            <motion.span
              className="absolute left-0 top-full inline-block"
              variants={{
                initial: { y: 0 },
                hover: { y: '-100%' },
                ...variants,
              }}
              transition={{
                ...transition,
                duration,
                delay: getExitDelay(index),
              }}
            >
              {isSpace ? '\u00A0' : letter}
            </motion.span>
          </span>
        );
      })}
      <span className="sr-only">{children}</span>
    </motion.span>
  );
}
