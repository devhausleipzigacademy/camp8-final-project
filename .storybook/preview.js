// Import our tailwind styles
import "../src/styles/globals.css";
import * as nextImage from "next/image";

Object.defineProperty(nextImage, "default", {
	configurable: true,
	value: (props) => <img {...props} />,
});
//  export const parameters = {   actions: { argTypesRegex: '^on[A-Z].*' } };

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
