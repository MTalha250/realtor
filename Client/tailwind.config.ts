import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
        },
      },
      fontFamily: {
        slab: ["Montagu Slab", "sans-serif"],
        sans: ["Open Sans", "sans-serif"],
      },
      colors: {
        primary: "#11224D",
        primary2: "#193A6F",
        primary3: "#2C599D",
        primary4: "#5B84C4",
        secondary: "#F98125",
        secondary2: "#FB9B50",
        background: "#A4BADD",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
} satisfies Config;
