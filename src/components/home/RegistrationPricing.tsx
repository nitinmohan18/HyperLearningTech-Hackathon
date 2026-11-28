"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import { event } from "@/data/event";
import GlowBorderCard from "@/components/ui/GlowBorderCard";
import { CreepyButton } from "@/components/core/creepy-button";
import { openRegisterModal } from "@/components/common/RegisterChoiceModal";

const squadGlowColors = [
  "#2a1e14",
  "#4d3724",
  "#a88254",
  "#ffd89b",
  "#fff0d4",
  "#ffd89b",
  "#a88254",
  "#4d3724",
  "#2a1e14",
  "#2a1e14",
];

interface PricingCardProps {
  metaLabel: string;
  icon: React.ReactNode;
  title: string;
  price: string;
  priceNote: string;
  features: string[];
  ctaText: string;
  featured?: boolean;
  glowColors: string[];
  animationDuration: number;
  delay?: number;
}

function MinimalPricingCard({
  metaLabel,
  icon,
  title,
  price,
  priceNote,
  features,
  ctaText,
  featured = false,
  glowColors,
  animationDuration,
  delay = 0,
}: PricingCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="h-full"
    >
      <GlowBorderCard
        width="100%"
        height="100%"
        borderRadius="24px"
        animationDuration={animationDuration}
        gradientColors={glowColors}
        borderWidth="1.07em"
        blurAmount="0.14em"
        inset="-1em"
        className={
          featured
            ? "bg-[#120c08] shadow-[0_24px_60px_rgba(0,0,0,0.65),0_0_36px_-12px_rgba(224,184,133,0.16)]"
            : "bg-[#120c08] shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
        }
      >
        {/* Crisp Obsidian-Bronze Glass Surface (prevents inner glow smudge) */}
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`group relative m-[1.5px] flex h-full flex-1 flex-col justify-between overflow-hidden rounded-[22.5px] p-4 sm:p-8 transition-colors duration-300 ${
            featured
              ? "bg-gradient-to-b from-[#291d14] via-[#1e150e] to-[#130d09]"
              : "bg-gradient-to-b from-[#211710] via-[#18110c] to-[#110c08]"
          }`}
        >
          {/* Top hairline specular highlight */}
          <div
            className={`pointer-events-none absolute top-0 inset-x-10 h-[1px] bg-gradient-to-r from-transparent ${
              featured ? "via-[#ffe4bd]/50" : "via-[#f5deb3]/30"
            } to-transparent z-20`}
          />

          {/* Subtle interactive cursor spotlight */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(340px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 216, 155, ${
                featured ? "0.08" : "0.05"
              }), transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            {/* Minimal Header: Plain Title + Icon & Raw Tracked Label (No Pills) */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <span className={featured ? "text-[#ffd89b]" : "text-[#c89f6d]"}>
                  {icon}
                </span>
                <h3 className="font-serif text-lg sm:text-[26px] font-normal tracking-tight text-[#f5efe5]">
                  {title}
                </h3>
              </div>

              <span
                className={`font-mono text-[9.5px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.2em] ${
                  featured ? "text-[#e0b885]" : "text-[#9e9284]"
                }`}
              >
                {metaLabel}
              </span>
            </div>

            {/* Clean Price Line */}
            <div className="mt-3 sm:mt-6 flex flex-wrap items-baseline gap-2 sm:gap-3 border-y border-white/[0.08] py-2.5 sm:py-5">
              <span className="font-mono text-2xl sm:text-4xl font-bold tracking-tight text-white tabular-nums leading-none">
                {price}
              </span>
              <span className="text-[11px] sm:text-sm text-[#a69b8d]">
                {priceNote}
              </span>
            </div>

            {/* Minimal Feature List (No Fake Ticks) */}
            <ul className="mt-3 sm:mt-6 divide-y divide-white/[0.06] text-[12px] sm:text-sm text-[#ded5c8]">
              {features.map((feat) => (
                <li key={feat} className="py-1.5 sm:py-2.5 first:pt-0 last:pb-0 leading-snug sm:leading-relaxed">
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="relative z-10 mt-4 sm:mt-8 pt-0 sm:pt-2">
            <CreepyButton
              type="button"
              onClick={openRegisterModal}
              className="w-full min-h-[40px] sm:min-h-[48px]"
              coverClassName={
                featured
                  ? "bg-gradient-to-b from-[#fbf8f3] to-[#e8decb] text-[#18110b] font-semibold text-xs sm:text-sm shadow-[0_4px_20px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.9)]"
                  : "border border-white/[0.14] bg-[#221810] text-[#f5efe5] font-medium text-xs sm:text-sm shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
              }
            >
              <span className="flex items-center gap-2">
                <span>{ctaText}</span>
                <ArrowRight size={14} className="sm:h-[15px] sm:w-[15px]" />
              </span>
            </CreepyButton>
          </div>
        </div>
      </GlowBorderCard>
    </motion.div>
  );
}

export default function RegistrationPricing() {
  const steps = [
    { num: "01", title: "Entry", desc: "₹200 flat (1–4 members)." },
    { num: "02", title: "Team", desc: "Add leader & members." },
    { num: "03", title: "Brief", desc: "Submit project scope." },
    { num: "04", title: "GitHub", desc: "Link private repository." },
  ];

  return (
    <section id="registration" className="section-pad border-b border-white/[0.08] bg-cream">
      <div className="container-site">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto">
          <p className="eyebrow">Registration</p>
          <h2 className="section-title">
            Entry <span className="font-serif italic text-[#e0b885]">Format</span>
          </h2>
          <p className="section-copy mx-auto">
            Unified Squad format for 1 to 4 builders at a flat ₹200 fee.
          </p>
        </div>

        {/* Single Minimal Squad Pricing Card */}
        <div className="mt-6 sm:mt-12 max-w-[330px] sm:max-w-lg mx-auto">
          <MinimalPricingCard
            metaLabel="1–4 Members"
            icon={<Users size={18} />}
            title="Squad Entry"
            price={event.squadFee}
            priceNote="flat per entry (alone or squad)"
            features={[
              "Compete alone (1 builder) or with up to 4 collaborators",
              "Shared private GitHub repository & project submission",
              "100-point rubric evaluation & individual certificates",
            ]}
            ctaText="Register Now"
            featured={true}
            glowColors={squadGlowColors}
            animationDuration={5}
            delay={0.05}
          />
        </div>

        {/* Streamlined 4-Step Registration Process Flow (Single horizontal row across breakpoints) */}
        <div className="mt-8 sm:mt-14 max-w-3xl mx-auto text-center">
          <p className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.26em] text-[#e0b885] mb-3.5 sm:mb-8">
            Registration Checklist
          </p>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-6 md:gap-8">
            {steps.map((st) => (
              <div
                key={st.num}
                className="group flex flex-col items-center text-center transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="font-serif italic text-base sm:text-[26px] font-normal text-[#e0b885] leading-none">
                  {st.num}
                </span>
                <h4 className="mt-1 sm:mt-2 font-serif text-[13.5px] sm:text-xl font-normal text-[#faf5ee] transition-colors duration-200 group-hover:text-[#ffe4bd]">
                  {st.title}
                </h4>
                <p className="mt-0.5 sm:mt-1 max-w-[160px] text-[9.5px] sm:text-xs leading-[1.3] sm:leading-relaxed text-[#bfb2a2]">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
