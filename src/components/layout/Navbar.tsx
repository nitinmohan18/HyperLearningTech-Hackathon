"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import Logo from "./Logo";

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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Track active section on scroll for the home page
  useEffect(() => {
    if (!isHome) return;

    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome && href.startsWith("#")) {
      e.preventDefault();
      setOpen(false);
      const targetId = href.replace("#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const offset = 80;
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
      {/* Top Announcements Banner */}
      <div className="border-b border-sand-border/15 bg-[#100b08]/85 px-4 py-2 text-center font-mono text-[11px] sm:text-xs text-[#8e7a68] backdrop-blur-md">
        <div className="container-site flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-[#c89f6d] font-semibold">
            <Sparkles size={13} />
            <span>Winter Hackathon ’26</span>
          </span>
          <span className="hidden sm:inline text-sand-muted">·</span>
          <span className="text-[#f0eae1]">26–27 December 2026 (24-Hour Online)</span>
          <span className="hidden sm:inline text-sand-muted">·</span>
          <span className="text-[#c89f6d]">Registrations close 25 Dec</span>
        </div>
      </div>

      {/* Main Conventional Header */}
      <header className="sticky top-0 z-50 border-b border-sand-border/20 bg-[#0d0a08]/90 backdrop-blur-xl transition-all">
        <nav
          className="container-site flex h-16 items-center justify-between gap-3 sm:gap-4"
          aria-label="Main Navigation"
        >
          {/* Logo Branding */}
          <Link
            href="/"
            className="shrink-0 transition-opacity hover:opacity-95"
            onClick={() => setOpen(false)}
          >
            <Logo size="default" showSubtitle={true} />
          </Link>

          {/* Desktop Conventional Navigation Bar (All 8 links visible on lg and up) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 2xl:gap-2">
            {navLinks.map(({ label, href }) => {
              const targetId = href.replace("#", "");
              const isActive = isHome && activeSection === targetId;
              const linkUrl = isHome ? href : `/${href}`;

              return (
                <a
                  key={label}
                  href={linkUrl}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`rounded-full px-2.5 xl:px-3 py-1 font-mono text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? "bg-[#c89f6d]/15 text-[#f0eae1] border border-[#c89f6d]/40 shadow-sm"
                      : "text-[#9e8e7c] hover:bg-white/[0.04] hover:text-[#f0eae1]"
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* Action CTAs (Desktop) */}
          <div className="hidden sm:flex items-center gap-3.5">
            <Link
              href="/login"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[#8e7a68] transition-colors hover:text-[#f0eae1]"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn-primary h-9 px-4 xl:px-5 text-xs font-semibold tracking-wide shadow-sm"
            >
              Register Now →
            </Link>
          </div>

          {/* Mobile Menu Hamburger (Visible below lg) */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <Link
              href="/register"
              className="btn-primary h-8 px-3 text-[11px] font-semibold sm:hidden"
            >
              Register
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl border border-sand-border/30 bg-[#16100c]/80 text-[#f0eae1] transition hover:border-[#c89f6d]/50"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="border-t border-sand-border/20 bg-[#0d0a08]/98 px-6 py-6 backdrop-blur-2xl lg:hidden">
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
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#c89f6d]/15 text-[#f0eae1] font-semibold"
                        : "text-[#9e8e7c] hover:bg-white/[0.03] hover:text-[#f0eae1]"
                    }`}
                  >
                    <span>{label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#c89f6d]" />}
                  </a>
                );
              })}

              <div className="mt-4 flex flex-col gap-3 border-t border-sand-border/15 pt-4">
                <Link
                  href="/login"
                  className="btn-secondary h-11 justify-center text-xs"
                  onClick={() => setOpen(false)}
                >
                  Participant Login
                </Link>
                <Link
                  href="/register"
                  className="btn-primary h-11 justify-center text-xs font-semibold"
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
