/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      heading: ["Staatliches", "sans-serif"],
    },
    colors: {
      primary: {
        default: {
          Solid: "#5F62C7",
          background: "#7751c7",
        },
        transparent: "rgba(66, 17, 169, 0.1)",
        frame: "#E6E8FF",
      },
      secondary: {
        default: "#BEDCFA",
        transparent: "rgba(190, 223, 255, 0.25)",
      },
      card: { DEFAULT: "#eff7ff" },
      text: {
        typo: "#453C57",
        white: "#FFFFFF",
        white_transparent: "rgba(255, 255, 255, 0.2)",
      },
      ux: {
        error: "#EC1C00",
        inactive: "#BEBEBE",
        success: "#B4E747",
      },
      transparent: "transparent",
    },
    extend: {
      transitionDuration: { 400: "400ms" },
    },
  },
  plugins: [],
};
