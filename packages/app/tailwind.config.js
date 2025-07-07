import tailwindConfig from "@repo/ui/tailwind.config.js";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [tailwindConfig],
  content: ["./index.html", "./src/**/*.{ts,tsx}", "../ui/src/**/*.{ts,tsx}"],
};
