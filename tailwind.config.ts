import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "toast-hide": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "toast-slide-in-right": {
          "0%": { transform: "translateX(calc(100% + 1rem))" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "toast-hide": "toast-hide 200ms ease-in forwards",
        "toast-slide-in-right":
          "toast-slide-in-right 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },

  plugins: [require("tailwindcss-radix")()],
} satisfies Config;
