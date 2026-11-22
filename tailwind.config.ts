import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#090d18",
        panel: "#101729",
        line: "#202a43",
        electric: "#5b8cff",
        violet: "#8b5cf6",
        cyan: "#64d8d0",
      },
      boxShadow: { glow: "0 18px 60px rgba(91, 140, 255, 0.12)" },
    },
  },
  plugins: [],
} satisfies Config;
