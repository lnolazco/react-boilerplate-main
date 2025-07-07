import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "./src/**/*.stories.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["TT Interphases Pro", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",
        "accent-ring": "rgb(var(--color-accent-ring) / <alpha-value>)",
        neutral: {
          50: "rgb(var(--color-neutral-50) / <alpha-value>)",
          100: "rgb(var(--color-neutral-100) / <alpha-value>)",
          200: "rgb(var(--color-neutral-200) / <alpha-value>)",
          300: "rgb(var(--color-neutral-300) / <alpha-value>)",
          400: "rgb(var(--color-neutral-400) / <alpha-value>)",
          500: "rgb(var(--color-neutral-500) / <alpha-value>)",
          600: "rgb(var(--color-neutral-600) / <alpha-value>)",
          700: "rgb(var(--color-neutral-700) / <alpha-value>)",
          800: "rgb(var(--color-neutral-800) / <alpha-value>)",
          900: "rgb(var(--color-neutral-900) / <alpha-value>)",
          950: "rgb(var(--color-neutral-950) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [
    plugin(({ addBase, addComponents }) => {
      addBase({
        ":root": {
          "--color-accent": "252 211 77",
          "--color-accent-hover": "251 191 36",
          "--color-accent-ring": "254 243 199",
          "--color-danger": "252 165 165",
          "--color-neutral-50": "250 250 250",
          "--color-neutral-100": "244 244 245",
          "--color-neutral-200": "228 228 231",
          "--color-neutral-300": "212 212 216",
          "--color-neutral-400": "161 161 170",
          "--color-neutral-500": "113 113 122",
          "--color-neutral-600": "82 82 91",
          "--color-neutral-700": "63 63 70",
          "--color-neutral-800": "39 39 42",
          "--color-neutral-900": "24 24 27",
          "--color-neutral-950": "9 9 11",
        },
      });

      addComponents({
        ".scrollbar-none": {
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
