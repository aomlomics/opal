/** @type {import('tailwindcss').Config} */

const sharedTheme = {
	primary: "#0483CB", //Lochmara
	secondary: "#043484", //Catalina Blue
	accent: "#79BCE4", //Seagull
	neutral: "#BFD0E5", //Periwinkle Gray
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
