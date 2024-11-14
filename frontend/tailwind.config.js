/** @type {import('tailwindcss').Config} */

const sharedTheme = {
	"primary": "#64ABDC",  // Your custom blue
	"secondary": "#233D7F", // Your dark blue/slate
	"accent": "#37cdbe",
	"neutral": "#3d4451",
}

// Legacy Colors
// primary: "#64ABDC", //NODE Custom Light blue
// dark_blue: "#233D7F", //NODE Custom Dark blue
// secondary: "#000000", // Black
// accent: "#79BCE4", // NOAA Seagull
// neutral: "#BFD0E5", // NOAA Periwinkle grey 
// "neutral-content": "whitesmoke",
// };


module.exports = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			// This is for darkening the Hero Image
			dropShadow: {
				full: [
					"-0.3px -0.3px 0 rgba(0,0,0,0.5)",
					"0.3px -0.3px 0 rgba(0,0,0,0.5)",
					"-0.3px 0.3px 0 rgba(0,0,0,0.5)",
					"0.3px 0.3px 0 rgba(0,0,0,0.5)"
				]
			},
			// Example of a CSS animation for the 'Welcome' text. Good for future reference
			animation: {
				'slide-in': 'slide-in 1s ease-out forwards',
			},
			keyframes: {
				'slide-in': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
			},
			// Standardized z-index values for layer priority
			zIndex: {
				// Base layer for default content
				'base': '1',
				
				// Content layers
				'content': '10', // Regular content
				'content-overlay': '20', // Overlays on content, like images or text overlays
				
				// UI elements
				'header': '100', // Header component
				'footer': '90', // Footer component
				'dropdown': '200', // Dropdown menus
				
				// Modals and overlays
				'modal': '1000', // Modal dialogs
				'modal-overlay': '999', // Overlay behind modals
				
				// Notifications
				'toast': '2000', // Toast notifications (usually in bottom right) 
				'alert': '2100', // Alerts or other high-priority notifications
			},

			// New typography system
			fontSize: {
				// Main display text (like "Welcome")
				'display': ['4.5rem', { // 72px
					lineHeight: '1.1',
					letterSpacing: '-0.02em',
					fontWeight: '700'
				}],
				
				// Headers
				'h1': ['3rem', {        // 48px
					lineHeight: '1.2',
					letterSpacing: '-0.01em',
					fontWeight: '700'
				}],
				'h2': ['2rem', {        // 32px
					lineHeight: '1.3',
					fontWeight: '500'
				}],
				'h3': ['1.5rem', {      // 24px
					lineHeight: '1.4',
					fontWeight: '500'
				}],
				
				// Body text
				'body-lg': ['1.125rem', { // 18px
					lineHeight: '1.6',
					fontWeight: '400'
				}],
				'body': ['1rem', {      // 16px
					lineHeight: '1.6',
					fontWeight: '400'
				}],
				
				// UI elements (buttons, labels, etc)
				'ui': ['0.875rem', {    // 14px
					lineHeight: '1.4',
					fontWeight: '500'
				}],
			},
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
					"base-100": "#f8f9fa",  // Very light grey for background
					"base-content": "#1a1a1a",  // Very dark grey for text
				}
			},
			{
				dark: {
					...require("daisyui/src/theming/themes")["dark"],
					...sharedTheme,
					"base-100": "#2a303c",  // Dark grey for background (not pure black)
					"base-content": "#e9ecef",  // Light grey for text (not pure white)
				}
			}
		]
	}
}
