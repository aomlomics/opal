/** @type {import('tailwindcss').Config} */

const sharedTheme = {
	// primary: "#72ACAF", //NOAA Lochmara
	//secondary: "#03646A", // NGI Teal
	primary: "#64ABDC", //NODE Custom Light blue
	secondary: "#000000", // Black
	accent: "#79BCE4", // NOAA Seagull
	neutral: "#BFD0E5", // NOAA Periwinkle grey 
	"neutral-content": "whitesmoke",
};

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			dropShadow: {
				full: [
					"-0.3px -0.3px 0 rgba(0,0,0,0.5)",
					"0.3px -0.3px 0 rgba(0,0,0,0.5)",
					"-0.3px 0.3px 0 rgba(0,0,0,0.5)",
					"0.3px 0.3px 0 rgba(0,0,0,0.5)"
				]
			}
		}
	},
  	plugins: [
		require("daisyui")
	],
	daisyui: {
		themes: [
			{
				light: {
					...require("daisyui/src/theming/themes")["light"],
					...sharedTheme,
				}
			},
			{
				dark: {
					...require("daisyui/src/theming/themes")["dark"],
					...sharedTheme,
					"base-content": "black",
				}
			}
		]
	}
}
