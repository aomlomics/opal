/** @type {import('tailwindcss').Config} */

const sharedTheme = {
	"primary": "#64ABDC",  // Custom light blue - main NODE color
	"secondary": "#233D7F", // Custom dark blue - secondary NODE color
	"accent": "#37cdbe", // Legacy NGI teal
	"neutral": "#3d4451", // Nobody should ever remove this please -bayden
	"button-normal": "#64ABDC",    // Same as primary
	"button-hover": "#7DBAE5",     // Lighter variant
	"button-selected": "#4B95C3",  // Darker variant
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
					
					// Core backgrounds
					"background-main": "#FAFAFA",      // Slightly off-white for better eye comfort
					"div-base": "#F8FAFD",            // Subtle blue tint
					"div-elevated": "#E8F1FC",        // More noticeable blue tint
					"div-selected": "#D0E1FF",        // Stronger blue for better visibility
					
					// Text colors
					"text-main": "#2D3748",
					"text-muted": "#4A5568",
					"text-inverse": "#FFFFFF",
				}
			},
			{
				dark: {
					...require("daisyui/src/theming/themes")["dark"],
					...sharedTheme,
					
					// Background colors for different surface levels
					"background-main": "#1A1A1A",      // Main page background
					"background-raised": "#2D3748",    // Elevated elements like cards
					"background-selected": "#2C5282",  // Selected/active states
					
					// Text colors for different purposes
					"text-main": "#E2E8F0",           // Primary content
					"text-muted": "#A0AEC0",          // Secondary/supporting text
					"text-inverse": "#1A1A1A",        // Text on light backgrounds
					
					// Interactive element colors
					"interactive-default": "#2D3748",  // Default button/input state
					"interactive-hover": "#4A5568",    // Hover states
					"interactive-active": "#718096",   // Pressed states
				}
			}
		]
	}
}
