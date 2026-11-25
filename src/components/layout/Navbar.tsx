"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import Logo from "./Logo";
import { LiquidMetalButton } from "@/components/core/liquid-metal-button";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Prizes", href: "#prizes" },
  { label: "Schedule", href: "#schedule" },
  { label: "Registration", href: "#registration" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Judging", href: "#judging" },
  { label: "Rules", href: "#rules" },
  { label: "FAQ", href: "#faq" },
];

const HANDBOOK_BOOK_IDS = new Set(["schedule", "how-it-works", "judging", "rules"]);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [activeBook, setActiveBook] = useState<string>("schedule");
  const [isDesktopActions, setIsDesktopActions] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Avoid mounting heavy WebGL LiquidMetalShader & MorphText SVG filters on mobile (< 640px)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setIsDesktopActions(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Track which handbook volume is currently selected
  useEffect(() => {
    const onBookSelected = (e: Event) => {
      const id = (e as CustomEvent<{ id?: string | null }>).detail?.id;
      if (id && HANDBOOK_BOOK_IDS.has(id)) {
        setActiveBook(id);
      }
    };
    window.addEventListener("handbook-book-selected", onBookSelected);
    return () => window.removeEventListener("handbook-book-selected", onBookSelected);
  }, []);

  // Track active section on scroll for the home page
  useEffect(() => {
    if (!isHome) return;

    const scrollAnchors = ["overview", "prizes", "handbook", "registration", "faq"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = scrollAnchors.length - 1; i >= 0; i--) {
        const id = scrollAnchors[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id === "handbook" ? activeBook : id);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, activeBook]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome && href.startsWith("#")) {
      e.preventDefault();
      setOpen(false);
      const targetId = href.replace("#", "");
      const targetEl =
        (HANDBOOK_BOOK_IDS.has(targetId) ? document.getElementById("handbook") : null) ??
        document.getElementById(targetId);
      if (HANDBOOK_BOOK_IDS.has(targetId)) {
        setActiveBook(targetId);
        window.dispatchEvent(new CustomEvent("open-handbook-book", { detail: { id: targetId } }));
      }
      if (targetEl) {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetEl.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        window.history.pushState(null, "", href);
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Top Announcement Bar (Desktop only for a clean, spacious mobile viewport) */}
      <div className="hidden sm:block border-b border-white/[0.08] bg-[#0d0a08]/60 px-4 py-1.5 text-center font-mono text-xs text-[#d6cec2] backdrop-blur-md">
        <div className="container-site flex items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[#e0b885] font-semibold">
            <Sparkles size={13} />
            <span>Winter Hackathon ’26</span>
          </span>
          <span className="text-white/30">·</span>
          <span className="text-white">26–27 December 2026 (24-Hour Online)</span>
          <span className="text-white/30">·</span>
          <span className="text-[#e0b885]">Registrations close 25 Dec</span>
        </div>
      </div>

      {/* Floating Navigation Bar */}
      <header className="sticky top-2 sm:top-3.5 z-50 px-3 sm:px-6 transition-all pointer-events-none">
        <nav
          className="glass pointer-events-auto mx-auto max-w-[1240px] px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center justify-between gap-1.5 sm:gap-4 border border-white/[0.08] overflow-hidden"
          aria-label="Main Navigation"
        >
          {/* Logo Branding */}
          <Link
            href="/"
            className="min-w-0 shrink transition-opacity hover:opacity-95"
            onClick={() => setOpen(false)}
          >
            <Logo size="default" showSubtitle={true} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 rounded-full bg-white/[0.04] border border-white/[0.08] px-1.5 py-1">
            {navLinks.map(({ label, href }) => {
              const targetId = href.replace("#", "");
              const isActive = isHome && activeSection === targetId;
              const linkUrl = isHome ? href : `/${href}`;

              return (
                <a
                  key={label}
                  href={linkUrl}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`rounded-full px-3 py-1 font-mono text-xs tracking-wide transition-colors ${
                    isActive
                      ? "bg-white/[0.15] text-white font-medium border border-white/20"
                      : "text-[#b8ada0] hover:text-white"
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* Action CTAs (Desktop — only mount WebGL shader on >=640px) */}
          {isDesktopActions && (
            <div className="hidden sm:flex items-center gap-3.5">
              <Link href="/register">
                <LiquidMetalButton
                  borderWidth={2}
                  metalConfig={{
                    colorBack: "#c99a5e",
                    colorTint: "#ffffff",
                    speed: 0.6,
                    distortion: 0.2,
                    repetition: 4,
                  }}
                >
                  <span>Register Now</span>
                  <ArrowRight size={13} />
                </LiquidMetalButton>
              </Link>
            </div>
          )}

          {/* Mobile Menu Actions (Visible below lg) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/register" className="sm:hidden">
              <LiquidMetalButton
                borderWidth={1.5}
                metalConfig={{
                  colorBack: "#c99a5e",
                  colorTint: "#ffffff",
                  speed: 0.45,
                  distortion: 0.16,
                  repetition: 4,
                }}
              >
                <span className="text-[11px]">Register</span>
              </LiquidMetalButton>
            </Link>
            <button
              type="button"
              className="rounded-full p-2 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer (Apple iOS Floating Sheet) */}
        {open && (
          <div className="glass apple-glass-panel pointer-events-auto mx-auto mt-2.5 max-w-[1240px] p-5 lg:hidden shadow-2xl">
            <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wider">
              {navLinks.map(({ label, href }) => {
                const targetId = href.replace("#", "");
                const isActive = isHome && activeSection === targetId;
                const linkUrl = isHome ? href : `/${href}`;

                return (
                  <a
                    key={label}
                    href={linkUrl}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white/[0.12] text-white font-medium"
                        : "text-[#b8ada0] hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span>{label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#c89f6d]" />}
                  </a>
                );
              })}

              <div className="mt-4 flex flex-col gap-2.5 border-t border-white/[0.1] pt-4">
                <Link
                  href="/register"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f5efe6] to-[#ded2c3] text-xs font-semibold text-[#120d09] shadow-md"
                  onClick={() => setOpen(false)}
                >
                  Register Now <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
