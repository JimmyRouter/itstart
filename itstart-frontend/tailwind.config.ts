import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff", // Light mode background
        foreground: "#171717", // Light mode text
        darkBackground: "#0a0a0a", // Dark mode background
        darkForeground: "#ededed", // Dark mode text
      },
    },
  },
  plugins: [],
} satisfies Config;

