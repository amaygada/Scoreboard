/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Wrap the CSS variable in oklch() function
        primary: "oklch(var(--color-primary) / <alpha-value>)",
        accent: "oklch(var(--color-accent) / <alpha-value>)",
        background: "oklch(var(--color-background) / <alpha-value>)",
        border: "oklch(var(--color-border) / <alpha-value>)",
        highlight: "oklch(var(--color-highlight) / <alpha-value>)",
        text: "oklch(var(--color-text) / <alpha-value>)",
        plain: "oklch(var(--color-plain) / <alpha-value>)",
        alert: "oklch(var(--color-alert) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
