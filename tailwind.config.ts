import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#10b981",
          hover: "#059669",
        },
        secondary: {
          DEFAULT: "#6ee7b7",
          foreground: "#ffffff",
          hover: "#34d399",
        },
        background: "#ffffff",
        foreground: "#064e3b",
        border: "#d1fae5",
        ring: "rgba(16, 185, 129, 0.5)",
        input: {
          background: "#ffffff",
          border: "#a7f3d0",
          ring: "rgba(16, 185, 129, 0.2)",
        },
        card: {
          background: "#ffffff",
          border: "#d1fae5",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
