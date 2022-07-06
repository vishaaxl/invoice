/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src//components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["custom", "sans-serif"],
      },
      colors: {
        background: "#141625",
        backgroundLight: "#1E2139",
        backgroundLightest: "#1E2139",
        font: "#FFFFFF",
        fontSecondary: "#8892b0",
        fontBeta: "#a8b2d1",
        fontGamma: "#ccd6f6",
        accent: "#7C5DFA",
        green: "#33D69F",
        greenLight: "#1F2C3F",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
