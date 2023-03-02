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
				},
				transparent: "rgba(66, 17, 169, 0.1)",
			},
			secondary: {
				default: "#BEDCFA",
				transparent: "rgba(190, 223, 255, 0.25)",
			},
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
		},
		/* Add the below as backgrounds via bg-gradinent-[Tailwind direction]-[colour background] ie "bg-gradient-bl-primary-background " */
		linearGradientColors: {
			primary: {
				background: ["#7751C7", "#5f62C7"],
				frame: [
					"#E6E8FF",
					"#EAE7FF",
					"#EBECFF",
					"#EBF4FF",
					"#EDF8FF",
					"#F4FDFB",
				],
			},
		},
		boxShadow: {
			primaryButtonShadow: "inset 3px 4px 0px rgba(54, 38, 83, 0.5);",
			secondaryButtonShadow:
				"inset 3px 4px 0px rgba(134, 100, 196, 0.3);",
		},
	},
	plugins: [require("tailwindcss-gradients")],
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
