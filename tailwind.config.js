const { fontFamily } = require("tailwindcss/defaultTheme");

const unlockSuccessDuration = "2s 1";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        display: ["var(--font-unbounded)", ...fontFamily.sans],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(4px)" },
        },
        "unlock-success": {
          "0%": { opacity: 0, transform: "scale(1)" },
          "50%": { opacity: 0.8 },
          "100%": { opacity: 0, transform: "scale(5)" },
        },
        "unlock-success-1": {
          "0%": { opacity: 0.5, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(1)" },
        },
        "unlock-success-2": {
          "0%": { opacity: 0.2, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(1.5)" },
        },
        "unlock-success-3": {
          "0%": { opacity: 0.1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(2)" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "unlock-success": `unlock-success ${unlockSuccessDuration}`,
        "unlock-success-1": `unlock-success-1 ${unlockSuccessDuration}`,
        "unlock-success-2": `unlock-success-2 ${unlockSuccessDuration}`,
        "unlock-success-3": `unlock-success-3 ${unlockSuccessDuration}`,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
