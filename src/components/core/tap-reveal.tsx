"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TapRevealProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Content hidden behind the pixel field until it is revealed. */
  children: React.ReactNode;
  /** Text in the chip shown over the sealed field. */
  label?: React.ReactNode;
  /** Accessible name of the button that seals the content again. */
  hideLabel?: string;
  /** Size of one pixel cell in CSS pixels, including its 1px gap. */
  cellSize?: number;
  /** Length of the dissolve in milliseconds. */
  duration?: number;
  /** Let a few cells brighten and settle while the field is sealed. */
  shimmer?: boolean;
  /** Controlled revealed state. */
  revealed?: boolean;
  /** Initial revealed state when uncontrolled. */
  defaultRevealed?: boolean;
  /** Called when the content is revealed or sealed again. */
  onRevealedChange?: (revealed: boolean) => void;
  /** Show a button that seals the content again after it is revealed. */
  hideable?: boolean;
  /** Classes for the wrapper around children, merged with cn. */
  contentClassName?: string;
}

type Point = { x: number; y: number };

interface Palette {
  base: string;
  shades: [string, string, string];
  twinkle: string;
  flash: string;
}

interface Field {
  reveal: (origin: Point | null) => void;
  seal: () => void;
}

// Very large cards get bigger cells so painting and sorting stay bounded.
const MAX_CELLS = 40_000;
// A tap only sets the dissolve origin for a reveal that follows it straight away.
const ORIGIN_TTL_MS = 250;

const FALLBACK: Palette = {
  base: "#140e0a",
  shades: ["#1c140e", "#241a12", "#2d2016"],
  twinkle: "#ffd89b",
  flash: "#e0b885",
};

// Photorealistic Eye Component with Natural Double-Blink, Pupil Saccade & Eyelid Physics
function RealisticBlinkingEye({ className }: { className?: string }) {
  return (
    <div className={cn("relative inline-flex items-center justify-center w-5 h-3.5 select-none", className)}>
      <svg
        viewBox="0 0 24 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_0_6px_rgba(255,216,155,0.6)]"
      >
        <defs>
          {/* Sclera & Iris Gradients */}
          <linearGradient id="irisGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd89b" />
            <stop offset="60%" stopColor="#d4af7a" />
            <stop offset="100%" stopColor="#8c6239" />
          </linearGradient>
          <radialGradient id="pupilGlow" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#ffd89b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1a120c" stopOpacity="1" />
          </radialGradient>
          <clipPath id="eyeContour">
            <path d="M1 8C4.5 2.5 8.5 1 12 1C15.5 1 19.5 2.5 23 8C19.5 13.5 15.5 15 12 15C8.5 15 4.5 13.5 1 8Z" />
          </clipPath>
        </defs>

        {/* Outer Eye Shell Contour Line */}
        <path
          d="M1 8C4.5 2.5 8.5 1 12 1C15.5 1 19.5 2.5 23 8C19.5 13.5 15.5 15 12 15C8.5 15 4.5 13.5 1 8Z"
          stroke="#ffd89b"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90"
        />

        {/* Eyeball Inner (Clipped to Eyelids Contour) */}
        <g clipPath="url(#eyeContour)">
          {/* Eyeball Sclera Background */}
          <rect x="0" y="0" width="24" height="16" fill="#22160f" />

          {/* Iris & Pupil with Saccade Movement */}
          <g className="animate-eye-look">
            {/* Iris */}
            <circle cx="12" cy="8" r="4.5" fill="url(#irisGrad)" />
            <circle cx="12" cy="8" r="4.2" stroke="#160e0a" strokeWidth="0.6" strokeOpacity="0.5" />
            
            {/* Pupil */}
            <circle cx="12" cy="8" r="2.2" fill="#0f0906" />
            
            {/* Specular Light Catch (Reflection) */}
            <circle cx="10.8" cy="6.6" r="1.1" fill="#ffffff" className="opacity-95" />
            <circle cx="13.2" cy="9.2" r="0.5" fill="#ffd89b" className="opacity-70" />
          </g>

          {/* Upper Eyelid that snaps shut on blink */}
          <path
            d="M0 0 H24 V8 C19.5 2.5 15.5 1 12 1 C8.5 1 4.5 2.5 0 8 Z"
            fill="#160e0a"
            className="animate-lid-top origin-top"
          />

          {/* Lower Eyelid that rises slightly to meet */}
          <path
            d="M0 16 H24 V8 C19.5 13.5 15.5 15 12 15 C8.5 15 4.5 13.5 0 8 Z"
            fill="#160e0a"
            className="animate-lid-bottom origin-bottom"
          />
        </g>
      </svg>
    </div>
  );
}

function hash(value: number) {
  let n = Math.imul(value ^ 0x9e3779b9, 0x85ebca6b);
  n ^= n >>> 13;
  n = Math.imul(n, 0xc2b2ae35);
  n ^= n >>> 16;
  return n >>> 0;
}

function hashString(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function readPalette(el: HTMLElement): Palette {
  const style = getComputedStyle(el);
  const read = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback;
  const background = style.backgroundColor;
  const opaque = background && background !== "transparent" && !/rgba\([^)]*,\s*0\)$/.test(background);
  return {
    base: opaque ? background : read("--tap-reveal-base", FALLBACK.base),
    shades: [
      read("--tap-reveal-1", FALLBACK.shades[0]),
      read("--tap-reveal-2", FALLBACK.shades[1]),
      read("--tap-reveal-3", FALLBACK.shades[2]),
    ],
    twinkle: read("--tap-reveal-twinkle", FALLBACK.twinkle),
    flash: read("--tap-reveal-flash", FALLBACK.flash),
  };
}

export function TapReveal({
  children,
  label = "Tap to reveal breakdown",
  hideLabel = "Seal card",
  cellSize = 8,
  duration = 650,
  shimmer = true,
  revealed,
  defaultRevealed = false,
  onRevealedChange,
  hideable = true,
  className,
  contentClassName,
  onClick,
  onKeyDown,
  "aria-label": ariaLabel,
  ...props
}: TapRevealProps) {
  const id = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const fieldRef = React.useRef<Field | null>(null);
  const originRef = React.useRef<{ point: Point; at: number } | null>(null);
  const [internalRevealed, setInternalRevealed] = React.useState(defaultRevealed);
  const isRevealed = revealed ?? internalRevealed;
  const revealedRef = React.useRef(isRevealed);

  const setRevealed = (next: boolean) => {
    if (revealed === undefined) setInternalRevealed(next);
    onRevealedChange?.(next);
  };

  React.useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const requestedCell = Math.max(2, Math.round(Number.isFinite(cellSize) ? cellSize : 8));
    const dissolveMs = Number.isFinite(duration) ? Math.max(0, duration) : 650;
    let cell = requestedCell;
    let gap = 1;
    const seed = hashString(id);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const darkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    let state: "sealed" | "revealing" | "open" = revealedRef.current ? "open" : "sealed";
    let palette = readPalette(root);
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let visible = true;
    let revealFrame = 0;
    let shimmerFrame = 0;
    let nextTwinkle = 0;
    const twinkles = new Map<number, number>();

    const shadeOf = (i: number) => {
      const h = hash(i + seed) % 10;
      return palette.shades[h < 6 ? 0 : h < 9 ? 1 : 2];
    };
    const paintCell = (i: number, color: string) => {
      const x = (i % cols) * cell;
      const y = Math.floor(i / cols) * cell;
      ctx.fillStyle = palette.base;
      ctx.fillRect(x, y, cell, cell);
      ctx.fillStyle = color;
      ctx.fillRect(x, y, cell - gap, cell - gap);
    };
    const clearCell = (i: number) => {
      ctx.clearRect((i % cols) * cell, Math.floor(i / cols) * cell, cell, cell);
    };
    const clearAll = () => ctx.clearRect(0, 0, width, height);
    const paintAll = () => {
      twinkles.clear();
      ctx.fillStyle = palette.base;
      ctx.fillRect(0, 0, width, height);
      for (let i = 0, n = cols * rows; i < n; i++) paintCell(i, shadeOf(i));
    };

    const shimmerTick = (now: number) => {
      shimmerFrame = 0;
      if (state !== "sealed" || !visible || !shimmer || reduceMotion.matches) return;
      twinkles.forEach((until, i) => {
        if (now > until) {
          paintCell(i, shadeOf(i));
          twinkles.delete(i);
        }
      });
      if (now > nextTwinkle && cols * rows > 0) {
        for (let k = 0; k < 2; k++) {
          const i = Math.floor(Math.random() * cols * rows);
          paintCell(i, Math.random() < 0.5 ? palette.twinkle : palette.shades[2]);
          twinkles.set(i, now + 380 + Math.random() * 420);
        }
        nextTwinkle = now + 90 + Math.random() * 120;
      }
      shimmerFrame = requestAnimationFrame(shimmerTick);
    };
    const startShimmer = () => {
      if (!shimmerFrame) shimmerFrame = requestAnimationFrame(shimmerTick);
    };

    const resize = () => {
      const nextWidth = root.clientWidth;
      const nextHeight = root.clientHeight;
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.max(requestedCell, Math.ceil(Math.sqrt((width * height) / MAX_CELLS)));
      while (Math.ceil(width / cell) * Math.ceil(height / cell) > MAX_CELLS) cell++;
      gap = cell >= 4 ? 1 : 0;
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
      if (state === "sealed") paintAll();
      else finish();
    };

    const finish = () => {
      cancelAnimationFrame(revealFrame);
      state = "open";
      clearAll();
    };

    const reveal = (origin: Point | null) => {
      if (state !== "sealed") return;
      state = "revealing";
      twinkles.clear();
      if (reduceMotion.matches || dissolveMs <= 0) {
        finish();
        return;
      }

      const ox = origin?.x ?? width / 2;
      const oy = origin?.y ?? height / 2;
      const reach = Math.max(
        Math.hypot(ox, oy),
        Math.hypot(width - ox, oy),
        Math.hypot(ox, height - oy),
        Math.hypot(width - ox, height - oy),
      ) || 1;
      const flash = Math.min(70, dissolveMs * 0.12);
      const jitter = dissolveMs * 0.2;
      const spread = Math.max(0, dissolveMs - flash - jitter);
      const count = cols * rows;
      const start = new Float32Array(count);
      const order = new Uint32Array(count);
      for (let i = 0; i < count; i++) {
        const cx = (i % cols) * cell + cell / 2;
        const cy = Math.floor(i / cols) * cell + cell / 2;
        start[i] = (Math.hypot(cx - ox, cy - oy) / reach) * spread + ((hash(i ^ seed) % 1000) / 1000) * jitter;
        order[i] = i;
      }
      order.sort((a, b) => start[a] - start[b]);

      let lit = 0;
      let cleared = 0;
      let startedAt = -1;
      const frame = (now: number) => {
        if (startedAt < 0) startedAt = now;
        const elapsed = now - startedAt;
        while (lit < count && start[order[lit]] <= elapsed) paintCell(order[lit++], palette.flash);
        while (cleared < lit && start[order[cleared]] + flash <= elapsed) clearCell(order[cleared++]);
        if (cleared < count) revealFrame = requestAnimationFrame(frame);
        else finish();
      };
      revealFrame = requestAnimationFrame(frame);
    };

    const repaint = (force = false) => {
      if (state !== "sealed") return;
      const next = readPalette(root);
      if (!force && JSON.stringify(next) === JSON.stringify(palette)) return;
      palette = next;
      paintAll();
    };

    const seal = () => {
      if (state === "sealed") return;
      cancelAnimationFrame(revealFrame);
      state = "sealed";
      repaint(true);
      startShimmer();
    };

    resize();
    startShimmer();
    fieldRef.current = { reveal, seal };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startShimmer();
    });
    visibilityObserver.observe(root);

    const onThemeChange = () => repaint();
    const themeObserver = new MutationObserver(onThemeChange);
    for (const target of [document.documentElement, document.body, root]) {
      themeObserver.observe(target, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
    }
    darkScheme.addEventListener("change", onThemeChange);
    const onMotionChange = () => {
      if (reduceMotion.matches && state === "revealing") finish();
      startShimmer();
    };
    reduceMotion.addEventListener("change", onMotionChange);

    return () => {
      fieldRef.current = null;
      cancelAnimationFrame(revealFrame);
      cancelAnimationFrame(shimmerFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      darkScheme.removeEventListener("change", onThemeChange);
      reduceMotion.removeEventListener("change", onMotionChange);
    };
  }, [id, cellSize, duration, shimmer]);

  React.useEffect(() => {
    revealedRef.current = isRevealed;
    const pending = originRef.current;
    originRef.current = null;
    const field = fieldRef.current;
    if (!field) return;
    if (isRevealed) field.reveal(pending && performance.now() - pending.at < ORIGIN_TTL_MS ? pending.point : null);
    else field.seal();
  }, [isRevealed]);

  const revealFrom = (origin: Point | null) => {
    originRef.current = origin ? { point: origin, at: performance.now() } : null;
    setRevealed(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || isRevealed) return;
    if (event.detail === 0) return revealFrom(null);
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const scaleX = el.offsetWidth ? rect.width / el.offsetWidth : 1;
    const scaleY = el.offsetHeight ? rect.height / el.offsetHeight : 1;
    revealFrom({
      x: (event.clientX - rect.left) / scaleX - el.clientLeft,
      y: (event.clientY - rect.top) / scaleY - el.clientTop,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || isRevealed || event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      revealFrom(null);
    }
  };

  const handleHide = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setRevealed(false);
    requestAnimationFrame(() => rootRef.current?.focus());
  };

  return (
    <div
      {...props}
      ref={rootRef}
      role={isRevealed ? props.role : "button"}
      tabIndex={isRevealed ? props.tabIndex ?? -1 : 0}
      aria-label={isRevealed ? ariaLabel : ariaLabel ?? (typeof label === "string" ? label : "Reveal hidden content")}
      data-state={isRevealed ? "revealed" : "sealed"}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "group/tap-reveal relative isolate overflow-hidden rounded-2xl border border-white/[0.1] bg-[#140e0a] text-white transition-[border-color,background-color] duration-300",
        "[--tap-reveal-base:#140e0a] [--tap-reveal-1:#1b130e] [--tap-reveal-2:#241a12] [--tap-reveal-3:#2e2117] [--tap-reveal-twinkle:#ffd89b] [--tap-reveal-flash:#ffd89b]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd89b]",
        !isRevealed && "cursor-pointer hover:border-[#ffd89b]/40 hover:bg-[#18110c]",
        className,
      )}
    >
      {hideable && (
        <button
          type="button"
          aria-label={hideLabel}
          tabIndex={isRevealed ? 0 : -1}
          onClick={handleHide}
          title={hideLabel}
          className={cn(
            "group/hide-btn absolute right-4 top-4 z-[10] flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-xs font-mono text-[#c7baa8] backdrop-blur-md transition-all duration-200 hover:border-[#ffd89b]/40 hover:bg-black/80 hover:text-white focus-visible:outline-2 focus-visible:outline-[#ffd89b]",
            isRevealed ? "visible opacity-100 [transition-delay:300ms,300ms,0ms,0ms]" : "pointer-events-none invisible opacity-0",
          )}
        >
          {/* Animated realistic eye blinking icon */}
          <span className="relative flex items-center justify-center size-3.5">
            <Eye className="size-3.5 text-[#ffd89b] transition-transform duration-300 group-hover/hide-btn:scale-y-[0.1]" strokeWidth={2} />
          </span>
          <span className="text-[10.5px] uppercase tracking-wider text-[#a89d90] group-hover/hide-btn:text-white transition-colors">
            Hide
          </span>
        </button>
      )}

      {/* Hidden from view until revealed - ultra compact mobile padding */}
      <div className={cn("relative z-[1] min-w-0 p-3 sm:p-7 pt-7 sm:pt-14", !isRevealed && "invisible", contentClassName)}>
        {children}
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn("absolute inset-0 z-[2] block size-full pointer-events-none", isRevealed && "pointer-events-none")}
      />

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center p-2 sm:p-6 text-center transition-opacity duration-300",
          isRevealed && "opacity-0",
        )}
      >
        <span className="inline-flex min-h-[28px] sm:min-h-[40px] items-center gap-1.5 sm:gap-3 rounded-full border border-[#ffd89b]/40 bg-black/85 px-2.5 sm:px-5 py-0.5 sm:py-1.5 text-[9.5px] sm:text-xs font-mono font-medium uppercase tracking-[0.08em] sm:tracking-[0.2em] text-[#ffd89b] shadow-[0_6px_20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300 group-hover/tap-reveal:scale-105 group-hover/tap-reveal:border-[#ffd89b]/70 group-hover/tap-reveal:text-white max-w-[94%] whitespace-nowrap">
          {/* Realistic physical blinking eye with pupil glance & double-blink */}
          <RealisticBlinkingEye className="shrink-0 scale-[0.65] sm:scale-100" />
          <span className="truncate">{label}</span>
        </span>
      </div>
    </div>
  );
}

export default TapReveal;
