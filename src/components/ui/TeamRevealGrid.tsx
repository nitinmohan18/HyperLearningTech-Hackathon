"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface TeamRevealSocials {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  portfolio?: string;
  email?: string;
}

export interface TeamRevealMember {
  /** Stable identifier used by the controlled active state. */
  id: string;
  name: string;
  role: string;
  expertise: string | readonly string[];
  /** Any browser-readable image URL. When omitted, an initial-based portrait is rendered. */
  image?: string;
  imageAlt?: string;
  /** CSS object-position value used when an image is supplied. */
  imagePosition?: string;
  /** Accent shown while the member is active. */
  accent?: string;
  socials?: TeamRevealSocials;
}

export interface TeamRevealGridProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  eyebrow?: string;
  title?: string;
  description?: string;
  members?: readonly TeamRevealMember[];
  /** Controlled active member id. */
  activeMemberId?: string | null;
  /** Initial active member id when uncontrolled. Defaults to the first member. */
  defaultActiveMemberId?: string | null;
  onActiveMemberChange?: (memberId: string | null) => void;
  /** Automatically moves the reveal between members when idle. */
  autoPlay?: boolean;
  rotationInterval?: number;
  /** Compact variant tailored for footer-adjacent creator showcase. */
  compact?: boolean;
  /** Optional external site link rendered in the section header. */
  websiteHref?: string;
  websiteLabel?: string;
}

const DEFAULT_MEMBERS: readonly TeamRevealMember[] = [
  {
    id: "shiv",
    name: "Shiv Raj Singh",
    role: "Product & Tech Lead · Full Stack Developer",
    expertise: [
      "Leads product vision & platform strategy",
      "Defines features & technology roadmap",
      "Architects AI systems & core engineering",
      "Oversees platform build & execution",
    ],
    image: "/team/shiv.webp",
    imagePosition: "center 18%",
    accent: "#e0b885",
  },
  {
    id: "nitin",
    name: "Nitin Mohan",
    role: "Design & UI/UX Lead · Full Stack Developer",
    expertise: [
      "Leads creative & visual direction",
      "Owns brand identity, colors & typography",
      "Oversees UI/UX & user experience",
      "Ensures consistent, engaging product design",
    ],
    image: "/team/nitin.webp",
    imagePosition: "center 24%",
    accent: "#ff6b2b",
  },
  {
    id: "ramoo",
    name: "Ramoo Kachhee",
    role: "Operations Lead · Full Stack Developer",
    expertise: [
      "Leads operations, coordination & growth",
      "Drives community & partnerships",
      "Contributes to platform development",
      "Manages academic & learning resources",
    ],
    image: "/team/ramoo.webp",
    imagePosition: "center 16%",
    accent: "#ffd89b",
  },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

function Portrait({ member, active }: { member: TeamRevealMember; active: boolean }) {
  const style = {
    "--team-accent": member.accent ?? "#e0b885",
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[0.85rem] bg-[#1a120d] transition-colors duration-[450ms]",
        active && "bg-[color-mix(in_srgb,var(--team-accent)_12%,#140e0a)]",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 opacity-55 transition-opacity duration-[450ms]",
          active && "opacity-100",
        )}
        style={{
          background:
            "radial-gradient(circle at 68% 20%, color-mix(in srgb, var(--team-accent) 32%, transparent), transparent 42%), radial-gradient(circle at 22% 82%, color-mix(in srgb, var(--team-accent) 16%, transparent), transparent 48%)",
        }}
      />

      {member.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.image}
          alt={member.imageAlt ?? member.name}
          loading="lazy"
          draggable={false}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-[filter,transform,opacity] duration-[450ms] ease-out motion-reduce:transition-none",
            active ? "scale-[1.03] grayscale-0" : "scale-100 grayscale opacity-80",
          )}
          style={{ objectPosition: member.imagePosition ?? "center top" }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-end overflow-hidden">
          <div
            aria-hidden="true"
            className={cn(
              "absolute top-[13%] aspect-square h-[36%] rounded-full bg-white/15 transition-[transform,background-color] duration-[450ms]",
              active && "-translate-y-0.5 scale-105 bg-[var(--team-accent)]",
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "absolute -bottom-[12%] h-[66%] w-[82%] rounded-t-[48%] bg-white/10 transition-[transform,background-color] duration-[450ms]",
              active && "scale-105 bg-[var(--team-accent)]",
            )}
          />
          <span className="relative z-10 mb-[18%] text-xl font-semibold tracking-[-0.06em] text-white">
            {initials(member.name)}
          </span>
        </div>
      )}

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0d0a08]/90 via-[#0d0a08]/25 to-transparent transition-opacity duration-[450ms]",
          active ? "opacity-100" : "opacity-60",
        )}
      />
    </div>
  );
}

function BrandIcon({
  platform,
  idPrefix,
}: {
  platform: keyof TeamRevealSocials;
  idPrefix: string;
}) {
  switch (platform) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" className="h-[13.5px] w-[13.5px]" fill="#f0f6fc" aria-hidden="true">
          <path d="M12 1.27a11 11 0 0 0-3.48 21.46c.55.1.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.5-1.26-1.21-1.6-1.21-1.6-.99-.68.07-.67.07-.67 1.1.08 1.67 1.13 1.67 1.13.97 1.67 2.55 1.19 3.17.91.1-.71.38-1.19.69-1.46-2.42-.28-4.96-1.21-4.96-5.38 0-1.19.42-2.16 1.12-2.92-.11-.28-.49-1.39.11-2.9 0 0 .92-.29 3 1.12a10.4 10.4 0 0 1 5.46 0c2.08-1.41 3-1.12 3-1.12.6 1.51.22 2.62.11 2.9.7.76 1.12 1.73 1.12 2.92 0 4.18-2.55 5.1-4.97 5.37.39.34.74 1.01.74 2.04v3.02c0 .29.18.64.74.53A11 11 0 0 0 12 1.27Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className="h-[13.5px] w-[13.5px]" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2" />
          <path
            fill="#ffffff"
            d="M7.75 9.8h2.1v6.8h-2.1V9.8Zm1.05-3.35a1.22 1.22 0 1 1 0 2.44 1.22 1.22 0 0 1 0-2.44Zm2.85 3.35h2.01v.93h.03c.28-.53.97-1.09 2-1.09 2.14 0 2.53 1.41 2.53 3.24v3.72h-2.1v-3.3c0-.79-.02-1.8-1.1-1.8-1.1 0-1.27.86-1.27 1.75v3.35h-2.1V9.8Z"
          />
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" className="h-[13.5px] w-[13.5px]" fill="#1DA1F2" aria-hidden="true">
          <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.38 8.6 8.6 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.29 3.9A12.14 12.14 0 0 1 3.05 4.79a4.28 4.28 0 0 0 1.32 5.71 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.6 8.6 0 0 1 2 19.07a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.19-6.53 12.19-12.19 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 22.46 6Z" />
        </svg>
      );
    case "instagram": {
      const gradId = `ig-grad-${idPrefix}`;
      return (
        <svg viewBox="0 0 24 24" className="h-[13.5px] w-[13.5px]" aria-hidden="true">
          <defs>
            <radialGradient id={gradId} cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5.5" fill={`url(#${gradId})`} />
          <circle cx="12" cy="12" r="4.1" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1.15" fill="#ffffff" />
        </svg>
      );
    }
    case "portfolio":
      return (
        <svg viewBox="0 0 24 24" className="h-[13.5px] w-[13.5px]" fill="none" stroke="#38BDF8" strokeWidth="1.9" aria-hidden="true">
          <circle cx="12" cy="12" r="9.2" />
          <ellipse cx="12" cy="12" rx="4.2" ry="9.2" />
          <path d="M3.3 9h17.4M3.3 15h17.4" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" className="h-[13.5px] w-[13.5px]" aria-hidden="true">
          <path fill="#4285F4" d="M3.5 19.25h2.75v-6.9L2.5 9.55v8.7c0 .55.45 1 1 1Z" />
          <path fill="#34A853" d="M17.75 19.25h2.75c.55 0 1-.45 1-1v-8.7l-3.75 2.8v6.9Z" />
          <path fill="#FBBC04" d="M17.75 6.45v5.9l3.75-2.8V7.2c0-1.24-1.42-1.95-2.4-1.2l-1.35 1.02v-.57Z" />
          <path fill="#EA4335" d="M6.25 12.35v-5.9L12 10.75l5.75-4.3v5.9L12 16.65l-5.75-4.3Z" />
          <path fill="#C5221F" d="M2.5 7.2v2.35l3.75 2.8v-5.9L4.9 5.43C3.92 4.68 2.5 5.39 2.5 6.63v.57Z" />
        </svg>
      );
  }
}

const SOCIAL_ITEMS: {
  key: keyof TeamRevealSocials;
  number: string;
  label: string;
  isEmail?: boolean;
  hoverClass: string;
  labelClass: string;
}[] = [
  {
    key: "github",
    number: "01",
    label: "GitHub",
    hoverClass: "hover:border-white/35 hover:bg-white/[0.09]",
    labelClass: "text-[#f0f6fc]",
  },
  {
    key: "linkedin",
    number: "02",
    label: "LinkedIn",
    hoverClass: "hover:border-[#0A66C2]/65 hover:bg-[#0A66C2]/15",
    labelClass: "text-[#3897f0]",
  },
  {
    key: "twitter",
    number: "03",
    label: "Twitter / X",
    hoverClass: "hover:border-[#1DA1F2]/60 hover:bg-[#1DA1F2]/15",
    labelClass: "text-[#1DA1F2]",
  },
  {
    key: "instagram",
    number: "04",
    label: "Instagram",
    hoverClass: "hover:border-[#d6249f]/60 hover:bg-[#d6249f]/15",
    labelClass: "text-[#fd5949]",
  },
  {
    key: "portfolio",
    number: "05",
    label: "Portfolio",
    hoverClass: "hover:border-[#38BDF8]/60 hover:bg-[#38BDF8]/15",
    labelClass: "text-[#38BDF8]",
  },
  {
    key: "email",
    number: "06",
    label: "Gmail",
    isEmail: true,
    hoverClass: "hover:border-[#EA4335]/60 hover:bg-[#EA4335]/15",
    labelClass: "text-[#EA4335]",
  },
];

function formatSocialHandle(key: keyof TeamRevealSocials, value: string): string {
  if (key === "email") return value;
  try {
    const url = new URL(value);
    const cleanPath = url.pathname.replace(/^\/+|\/+$/g, "");
    if (key === "github" || key === "twitter" || key === "instagram") {
      return cleanPath ? `@${cleanPath.split("/")[0]}` : url.hostname;
    }
    if (key === "linkedin") {
      const slug = cleanPath.replace(/^in\//, "").replace(/-[0-9a-f]{6,}$/i, "");
      return slug ? `@${slug}` : "LinkedIn";
    }
    return url.hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
}

export function TeamRevealGrid({
  eyebrow,
  title,
  description,
  members = DEFAULT_MEMBERS,
  activeMemberId,
  defaultActiveMemberId,
  onActiveMemberChange,
  autoPlay = true,
  rotationInterval = 2800,
  compact = false,
  websiteHref,
  websiteLabel,
  className,
  ...props
}: TeamRevealGridProps) {
  const firstMemberId = members[0]?.id ?? null;
  const [internalActiveId, setInternalActiveId] = useState<string | null>(
    defaultActiveMemberId === undefined ? firstMemberId : defaultActiveMemberId,
  );
  const [interacting, setInteracting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [previewSocialKey, setPreviewSocialKey] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSocialPointerRef = useRef<string>("mouse");
  const isControlled = activeMemberId !== undefined;

  useEffect(() => {
    if (!previewSocialKey) return;
    const handleOutsidePointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setPreviewSocialKey(null);
      }
    };
    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [previewSocialKey]);

  const memberIds = useMemo(() => new Set(members.map((member) => member.id)), [members]);
  const requestedActiveId = isControlled ? activeMemberId : internalActiveId;
  const resolvedActiveId =
    requestedActiveId === null
      ? null
      : requestedActiveId && memberIds.has(requestedActiveId)
        ? requestedActiveId
        : firstMemberId;

  const selectMember = useCallback(
    (memberId: string | null) => {
      if (!isControlled) setInternalActiveId(memberId);
      onActiveMemberChange?.(memberId);
    },
    [isControlled, onActiveMemberChange],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlay || interacting || !isVisible || members.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      const currentIndex = members.findIndex((member) => member.id === resolvedActiveId);
      const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % members.length;
      selectMember(members[nextIndex]?.id ?? null);
    }, Math.max(rotationInterval, 1200));

    return () => window.clearInterval(timer);
  }, [autoPlay, interacting, isVisible, members, resolvedActiveId, rotationInterval, selectMember]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full text-left", className)}
      onPointerEnter={(e) => {
        if (e.pointerType !== "touch") setInteracting(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "touch") setInteracting(false);
      }}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setInteracting(false);
        }
      }}
      {...props}
    >
      {(eyebrow || title || description || websiteHref) && (
        <div className={cn("mb-4", compact ? "mb-3.5" : "mb-6")}>
          {eyebrow ? (
            <p className="font-mono text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0b885]">
              {eyebrow}
            </p>
          ) : null}
          {(title || websiteHref) ? (
            <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              {title ? (
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                  {title}
                </h3>
              ) : null}
              {websiteHref ? (
                <a
                  href={websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-[#e0b885] underline decoration-[#e0b885]/40 underline-offset-4 transition-colors hover:text-[#ffd89b] hover:decoration-[#ffd89b]"
                >
                  <span>{websiteLabel ?? websiteHref.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
                  <ArrowUpRight size={12} />
                </a>
              ) : null}
            </div>
          ) : null}
          {description ? (
            <p className="mt-1.5 text-xs leading-relaxed text-[#d6cec2]">{description}</p>
          ) : null}
        </div>
      )}

      <ul className="grid grid-cols-1 items-start gap-3 sm:h-[420px] lg:h-[400px] sm:grid-cols-3">
        {members.map((member) => {
          const isActive = resolvedActiveId === member.id;
          const accent = member.accent ?? "#e0b885";

          return (
            <li
              key={member.id}
              onPointerEnter={(e) => {
                if (e.pointerType !== "touch") selectMember(member.id);
              }}
              style={{ "--team-accent": accent } as React.CSSProperties}
              className={cn(
                "group relative flex flex-col justify-between rounded-2xl border p-3 sm:p-2.5 transition-[border-color,background-color,box-shadow,transform] duration-[450ms] ease-out",
                isActive
                  ? "border-[#e0b885]/50 bg-gradient-to-br from-[#21150e]/95 via-[#18100b]/95 to-[#120b08]/95 shadow-[0_14px_34px_-12px_rgba(0,0,0,0.75)]"
                  : "border-white/[0.08] bg-[#140d09]/85 hover:border-white/20",
              )}
            >
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setInteracting(true);
                  selectMember(isActive ? null : member.id);
                }}
                onFocus={(e) => {
                  try {
                    if (e.currentTarget.matches(":focus-visible")) {
                      selectMember(member.id);
                    }
                  } catch {
                    selectMember(member.id);
                  }
                }}
                className="flex w-full flex-row items-start gap-3 sm:flex-1 sm:flex-col sm:gap-0 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#e0b885]/60 rounded-xl"
              >
                <div
                  className={cn(
                    "shrink-0 overflow-hidden transition-[width,height] duration-[450ms] ease-out motion-reduce:transition-none",
                    "sm:w-full",
                    compact
                      ? isActive
                        ? "w-[84px] h-[96px] sm:h-40"
                        : "w-[64px] h-[64px] sm:h-32"
                      : isActive
                        ? "w-[92px] h-[106px] sm:h-48"
                        : "w-[70px] h-[70px] sm:h-36",
                  )}
                >
                  <Portrait member={member} active={isActive} />
                </div>

                <div className="min-w-0 flex-1 py-0.5 sm:py-0 sm:w-full sm:flex-none sm:px-1 sm:pt-3">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "font-serif text-[15.5px] sm:text-[16px] font-normal leading-tight transition-colors duration-[270ms]",
                        isActive ? "text-[#ffd89b]" : "text-[#f0eae1]",
                      )}
                    >
                      {member.name}
                    </p>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-all duration-[270ms]",
                          isActive ? "scale-125 bg-[var(--team-accent)]" : "bg-white/20",
                        )}
                      />
                      <ChevronDown
                        size={13}
                        aria-hidden="true"
                        className={cn(
                          "sm:hidden text-[#a89d90] transition-transform duration-300",
                          isActive && "rotate-180 text-[#e0b885]",
                        )}
                      />
                    </span>
                  </div>

                  <p className="mt-1 sm:min-h-[28px] font-mono text-[9.5px] uppercase tracking-[0.04em] leading-[1.35] sm:leading-[1.4] text-[#e0b885]/85">
                    {member.role}
                  </p>

                  <div
                    className={cn(
                      "overflow-hidden transition-[max-height,opacity,margin] duration-[450ms] ease-out motion-reduce:transition-none",
                      isActive
                        ? "mt-1.5 sm:mt-2.5 max-h-[180px] opacity-100"
                        : "mt-0 max-h-0 opacity-0",
                    )}
                  >
                    {Array.isArray(member.expertise) ? (
                      <ul
                        className={cn(
                          "space-y-1 font-sans text-[11px] leading-[1.35] text-[#cfc6ba]",
                          isActive && "sm:min-h-[104px] lg:min-h-[88px]",
                        )}
                      >
                        {member.expertise.map((point) => (
                          <li key={point} className="flex items-start gap-1.5">
                            <span
                              aria-hidden="true"
                              className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[var(--team-accent)] opacity-80"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        className={cn(
                          "font-sans text-[11.5px] leading-[1.45] sm:leading-[1.48] text-[#cfc6ba]",
                          isActive && "sm:min-h-[104px] lg:min-h-[88px]",
                        )}
                      >
                        {member.expertise}
                      </p>
                    )}
                  </div>
                </div>
              </button>

              {member.socials ? (
                <div className="relative mt-2.5 flex flex-nowrap items-center gap-1.5 sm:gap-1 border-t border-white/[0.06] px-0.5 sm:px-1 pt-2">
                  {SOCIAL_ITEMS.filter(({ key }) => Boolean(member.socials?.[key])).map(
                    ({ key, number, label, isEmail, hoverClass, labelClass }) => {
                      const rawValue = member.socials?.[key];
                      if (!rawValue) return null;
                      const href = isEmail ? `mailto:${rawValue}` : rawValue;
                      const handle = formatSocialHandle(key, rawValue);
                      const socialId = `${member.id}:${key}`;
                      const isPreviewOpen = previewSocialKey === socialId;
                      return (
                        <a
                          key={key}
                          href={href}
                          target={isEmail ? undefined : "_blank"}
                          rel={isEmail ? undefined : "noopener noreferrer"}
                          aria-label={`${member.name} ${label}`}
                          onPointerDown={(e) => {
                            lastSocialPointerRef.current = e.pointerType;
                          }}
                          onClick={(e) => {
                            const isTouchInteraction =
                              lastSocialPointerRef.current === "touch" ||
                              (typeof window !== "undefined" &&
                                window.matchMedia("(hover: none)").matches);
                            if (isTouchInteraction && !isPreviewOpen) {
                              e.preventDefault();
                              setPreviewSocialKey(socialId);
                              setInteracting(true);
                              return;
                            }
                            setPreviewSocialKey(null);
                          }}
                          className={cn(
                            "group/social sm:relative inline-flex h-[26px] w-[26px] sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-[7px] border border-white/[0.08] bg-[#160f0b]/90 transition-all duration-200 sm:hover:-translate-y-0.5",
                            hoverClass,
                            isPreviewOpen && "sm:-translate-y-0.5 border-[#e0b885]/55 ring-1 ring-[#e0b885]/40",
                          )}
                        >
                          <BrandIcon platform={key} idPrefix={member.id} />

                          <span
                            aria-hidden={!isPreviewOpen}
                            className={cn(
                              "absolute bottom-[calc(100%+8px)] sm:bottom-[calc(100%+10px)] left-0 sm:left-1/2 sm:-translate-x-1/2 z-[100] flex w-max max-w-[min(260px,100%)] sm:max-w-[215px] translate-y-2 scale-90 items-center gap-2.5 rounded-xl border border-[#e0b885]/35 bg-[#120c08]/95 p-2 text-left shadow-2xl backdrop-blur-md opacity-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-hover/social:translate-y-0 group-hover/social:scale-100 group-hover/social:opacity-100 group-focus-visible/social:translate-y-0 group-focus-visible/social:scale-100 group-focus-visible/social:opacity-100",
                              isPreviewOpen
                                ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                                : "pointer-events-none",
                            )}
                          >
                            {member.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={member.image}
                                alt=""
                                className="h-11 w-9 shrink-0 rounded-md object-cover shadow-md"
                                style={{ objectPosition: member.imagePosition ?? "center top" }}
                              />
                            ) : null}
                            <span className="min-w-0 pr-1">
                              <span
                                className={cn(
                                  "flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em]",
                                  labelClass,
                                )}
                              >
                                <span className="text-white/40">{number}</span>
                                <span>{label}</span>
                              </span>
                              <span className="mt-0.5 block truncate font-sans text-[11px] font-medium text-[#f0eae1]">
                                {handle}
                              </span>
                              {isPreviewOpen ? (
                                <span className="mt-0.5 block font-mono text-[8.5px] uppercase tracking-[0.1em] text-[#e0b885]/85">
                                  Tap again to open
                                </span>
                              ) : null}
                            </span>
                          </span>
                        </a>
                      );
                    },
                  )}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TeamRevealGrid;
