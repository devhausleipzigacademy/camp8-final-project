/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      heading: ["Staatliches", "sans-serif"],
    },
    colors: {
      primary: {
        default: {
          Solid: "#5F62C7",
        },
        transparent: "rgba(66, 17, 169, 0.1)",
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
    backgroundImage: {
      "grad-default":
        "linear-gradient(134.32deg, #7751C7 26.96%, #5F62C7 73.13%)",
      "grad-frame":
        "linear-gradient(179.79deg, #E6E8FF 0.18%, #EAE7FF 18.44%, #EBECFF 40.25%, #EBF4FF 60.18%, #EDF8FF 81.34%, #F4FDFB 99.82%)",
    },
    boxShadow: {
      primaryButtonShadow: "inset 3px 4px 0px rgba(54, 38, 83, 0.5);",
      secondaryButtonShadow: "inset 3px 4px 0px rgba(134, 100, 196, 0.3);",
    },
    extend: {
      transitionDuration: { 400: "400ms" },
      borderRadius: {
        listitem: ".5rem",
      },
    },
  },
  plugins: [],
};
