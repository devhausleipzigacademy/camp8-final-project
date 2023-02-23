/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			primary: {
				default: {
					Solid: "#5F62C7",
					background: "#7751c7",
				},
				trans: "#4211A9",
				frame: "#E6E8FF",
			},
			secondary: {
				default: "#BEDCFA",
				trans: "",
			},
			text: {
				typo: "#453C57",
				white: "#FFFFFF",
				whitetrans: "#FFFFFF",
			},
			ux: {
				error: "#EC1C00",
				inactive: "#BEBEBE",
				success: "#B4E747",
			},
		},
	},
	plugins: [],
};

// /** @type {import('tailwindcss').Config}
// module.exports = {
// 	content: ["./src/**/*.{js,ts,jsx,tsx}"],
// 	theme: {
// 		fontFamily: {
// 			DEFAULT: [""],
// 		},
// 		colors: {
// 			primary: {
// 				DEFAULT: "bg-gradient-to-b from-purple-600 to-blue-600",
// 				transparent: "",
// 				background:
// 					"bg-[linear-gradient(165.25deg, rgba(0, 20, 255, 0.1) 12.95%, rgba(51, 0, 255, 0.1) 41.77%, rgba(54, 159, 255, 0.1) 64.82%, rgba(79, 190, 255, 0.1) 82.59%, rgba(172, 255, 180, 0.1) 97.03%), #FFFFFF;]",
// 			},
// 			secondary: {
// 				DEFAULT: "#BEDCFA",
// 				transparent: "",
// 			},
// 			white: {
// 				DEFAULT: "",
// 				transparent: "",
// 			},
// 			black: {
// 				DEFAULT: "",
// 			},
// 			ux: {
// 				error: "",
// 				inactive: "",
// 				success: "",
// 			},
// 		},
// 		extend: {},
// 	},
// 	plugins: [require("@tailwindcss/line-clamp")],
// };
