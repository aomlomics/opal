/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {},
  	plugins: [
		require("daisyui")
	],
	daisyui: {
		themes: [
			{
				light: {
					...require("daisyui/src/theming/themes")["light"],
					primary: "#0483CB", //Lochmara
					secondary: "#043484", //Catalina Blue
					accent: "#79BCE4", //Seagull
					neutral: "#BFD0E5" //Periwinkle Gray
				}
			},
			{
				dark: {
					...require("daisyui/src/theming/themes")["dark"],
					primary: "#0483CB", //Lochmara
					secondary: "#043484", //Catalina Blue
					accent: "#79BCE4", //Seagull
					neutral: "#BFD0E5", //Periwinkle Gray
					"base-content": "black",
				}
			}
		]
	}
}
