import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Elevated warm bronze-espresso surfaces
        cream: {
          DEFAULT: "#1a120c",
          canvas: "#160e0a",
          surface: "rgba(42, 29, 20, 0.75)",
          alt: "#1d140d",
          deep: "#231810",
        },
        // Warm Sand & Bronze palette
        sand: {
          DEFAULT: "#D9C3A3",
          light: "#EBDDCB",
          border: "rgba(150, 119, 86, 0.28)",
          "border-subtle": "rgba(150, 119, 86, 0.16)",
          muted: "#967756",
          dark: "#C4AA89",
        },
        // Warm Orange highlights & CTAs
        orange: {
          DEFAULT: "#F35A18",
          hover: "#DC4D0E",
          light: "#FF763B",
          subtle: "rgba(243, 90, 24, 0.12)",
          border: "rgba(243, 90, 24, 0.35)",
        },
        // High-contrast Typography for Dark Espresso Background
        espresso: {
          DEFAULT: "#F3ECE0",
          heading: "#F3ECE0",
          body: "#D9C3A3",
          muted: "#967756",
          soft: "#B59F85",
        },
        // Compatibility aliases
        ink: {
          DEFAULT: "#0d0a08",
          surface: "rgba(22, 17, 13, 0.72)",
          card: "rgba(22, 17, 13, 0.72)",
          elevated: "rgba(32, 24, 18, 0.85)",
        },
        silver: {
          DEFAULT: "#D9C3A3",
          light: "#F3ECE0",
          muted: "#967756",
          dark: "#3a2c1f",
          glass: "rgba(150, 119, 86, 0.12)",
          border: "rgba(150, 119, 86, 0.28)",
          "border-strong": "rgba(150, 119, 86, 0.5)",
        },
        lime: {
          DEFAULT: "#F35A18",
          hover: "#DC4D0E",
          dark: "#BA3C07",
          subtle: "rgba(243, 90, 24, 0.12)",
          border: "rgba(243, 90, 24, 0.35)",
        },
        panel: "rgba(22, 17, 13, 0.72)",
        line: "rgba(150, 119, 86, 0.25)",
        electric: "#F35A18",
        cyan: "#F35A18",
        violet: "#967756",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.4)",
        card: "0 8px 32px -4px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(243, 236, 224, 0.08)",
        "card-hover": "0 16px 48px -8px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(243, 236, 224, 0.16)",
        "orange-sm": "0 4px 18px -2px rgba(243, 90, 24, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
} satisfies Config;
