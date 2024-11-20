/** @type {import('tailwindcss').Config} */

const sharedTheme = {
	"primary": "#64ABDC",    // Brand blue
	"secondary": "#233D7F",  // Dark blue accent
	"neutral": "#3d4451",    // Required by DaisyUI
	"map-colors": "#FF6B6B"  // Map accents
}

module.exports = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			// Typography system
			fontSize: {
				'display': ['4.5rem', { // 72px
					lineHeight: '1.1',
					letterSpacing: '-0.02em',
					fontWeight: '700'
				}],
				'h1': ['3rem', {        // 48px
					lineHeight: '1.15',  
					letterSpacing: '-0.01em',
					fontWeight: '700'
				}],
				'h2': ['2rem', {        // 32px
					lineHeight: '1.2',   
					fontWeight: '500'
				}],
				'h3': ['1.5rem', {      // 24px
					lineHeight: '1.3', 
					fontWeight: '500'
				}],
				'body-lg': ['1.125rem', { // 18px
					lineHeight: '1.4',  
					fontWeight: '400'
				}],
				'body': ['1rem', {      // 16px
					lineHeight: '1.5', 
					fontWeight: '400'
				}],
				'ui': ['0.875rem', {    // 14px
					lineHeight: '1.3',  
					fontWeight: '500'
				}],
			},

			// Dropshadow can darken / lighten an image (used in hero image)
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
					
					"base-100": "#F5F8FF",      // Was background-main
					"base-200": "#F8FAFD",      // Was div-base
					"base-300": "#E8F1FC",      // Was div-elevated
					"base-content": "#2D3748",   // Was text-main
					"secondary-content": "#4A5568", // Was text-muted
					"neutral-content": "#FFFFFF",   // Was text-inverse
					
					"info": "#EAF2FF",          // Was interactive-default
					"info-content": "#D3E4FF",   // Was interactive-hover
					"base-400": "#BDD4FF", // Was interactive-active
					
					"accent": "#7DBAE5",        // Was button-hover
					"accent-focus": "#4B95C3",   // Was button-selected
					"accent-content": "#E2E8F1", // Was button-text
				},
			},
			{
				dark: {
					...require("daisyui/src/theming/themes")["dark"],
					...sharedTheme,
					
					"base-100": "#141824",      // Was background-main
					"base-200": "#1E2337",      // Was div-base
					"base-300": "#232942",      // Was div-elevated
					"base-content": "#E2E8F0",   // Was text-main
					"secondary-content": "#A0AEC0", // Was text-muted
					"neutral-content": "#1A1A1A",   // Was text-inverse
					
					"info": "#2A3B6A",          // Was interactive-default
					"info-content": "#314780",   // Was interactive-hover
					"base-400": "#385396", // Was interactive-active
					
					"accent": "#7DBAE5",        // Was button-hover
					"accent-focus": "#4B95C3",   // Was button-selected
					"accent-content": "#E2E8F1", // Was button-text
				}
			}
		]
	}
}
