/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      rotate: {
        '315': '315deg',
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#d6c48f",

          "secondary": "#a4cbb4",

          "accent": "#fdba74",

          "neutral": "#2e282a",

          "base-100": "#e4d8b4",

          "info": "#2463eb",

          "success": "#16a249",

          "warning": "#db7706",

          "error": "#dc2828",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

