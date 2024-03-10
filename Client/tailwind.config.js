/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      fourK: "2560px",
      laptopL: "1440px",
      laptop: "1024px",
      tablet: "768px",
      tabletS: "524px",
      tabletM: "624px",
      mobileL: "425px",
      mobileM: "375px",
      mobileS: "320px",
      navBreakM: "547px",
    },
    extend: {
      borderRadius: {
        standard: "20px",
        "standard/2": "10px",
        "standard/4": "5px",
      },

      colors: {
        Teal: "#008080",
        Black: "#1f1e25",
        BlackSec: "#7B768E",
        bgWhiteSec: "#F8F9FA",
        bgWhite: "#fafafa",
        Primary: "#f05656",
        Blue: "#0091D5",
      },

      fontFamily: {
        openS: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
