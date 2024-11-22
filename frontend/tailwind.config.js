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
				'display': ['4.5rem', {
					lineHeight: '1.1',
					letterSpacing: '-0.02em',
					fontWeight: '700'
				}],
				'h1': ['3rem', {
					lineHeight: '1.15',  
					letterSpacing: '-0.01em',
					fontWeight: '700'
				}],
				'h2': ['2rem', {
					lineHeight: '1.2',   
					fontWeight: '500'
				}],
				'h3': ['1.5rem', {
					lineHeight: '1.3', 
					fontWeight: '500'
				}],
				'body-lg': ['1.125rem', {
					lineHeight: '1.4',  
					fontWeight: '400'
				}],
				'body': ['1rem', {
					lineHeight: '1.5', 
					fontWeight: '400'
				}],
				'ui': ['0.875rem', {
					lineHeight: '1.3',  
					fontWeight: '500'
				}],
			},
			dropShadow: {
				full: [
					"-0.3px -0.3px 0 rgba(0,0,0,0.5)",
					"0.3px -0.3px 0 rgba(0,0,0,0.5)",
					"-0.3px 0.3px 0 rgba(0,0,0,0.5)",
					"0.3px 0.3px 0 rgba(0,0,0,0.5)"
				]
			},
			animation: {
				'slide-in': 'slide-in 1s ease-out forwards',
			},
			keyframes: {
				'slide-in': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
			},
			zIndex: {
				'base': '1',
				'content': '10',
				'content-overlay': '20',
				'header': '100',
				'footer': '90',
				'dropdown': '200',
				'modal': '1000',
				'modal-overlay': '999',
				'toast': '2000',
				'alert': '2100',
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
					
					"base-100": "#f2f6ff",      // Was background-main
					"base-200": "#e8eeff",      // Was div-base
					"base-300": "#cad8f9",     // Was div-elevated
					"base-content": "#2D3748",   // Was text-main
					"secondary-content": "#4A5568", // Was text-muted
					"neutral-content": "#FFFFFF",   // Was text-inverse

					"warning-content": "#1E2337", // used for background behind funding institutes logos on homepage
					
					"info": "#EAF2FF",          // Was interactive-default
					"info-content": "#D3E4FF",   // Was interactive-hover
					"base-400": "#BDD4FF", // Was interactive-active
					
					"accent": "#7DBAE5",        // Was button-hover
					"accent-focus": "#4B95C3",   // Was button-selected
					"accent-content": "#E2E8F1", // Was button-text

					// Component styling overrides
					btn: {
						"background-color": "primary",
						"border-color": "primary",
						color: "neutral-content",
						"&:hover": {
							"background-color": "accent",
							"border-color": "accent"
						}
					},
					card: {
						"background-color": "base-100",
						"border-color": "1px solid base-200",
						"box-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
						"&:hover": {
							"box-shadow": "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
						}
					}
				},
				dark: {
					...require("daisyui/src/theming/themes")["dark"],
					...sharedTheme,
					
					"base-100": "#141824",      // Was background-main
					"base-200": "#1E2337",      // Was div-base
					"base-300": "#232942",      // Was div-elevated
					"base-content": "#E2E8F0",   // Was text-main
					"secondary-content": "#A0AEC0", // Was text-muted
					"neutral-content": "#1A1A1A",   // Was text-inverse

					"warning-content": "#1E2337", // used for background behind funding institutes logos on homepage
					
					"info": "#2A3B6A",          // Was interactive-default
					"info-content": "#314780",   // Was interactive-hover
					"base-400": "#385396", // Was interactive-active
					
					"accent": "#7DBAE5",        // Was button-hover
					"accent-focus": "#4B95C3",   // Was button-selected
					"accent-content": "#E2E8F1", // Was button-text

					// Component styling overrides
					btn: {
						"background-color": "primary",
						"border-color": "primary",
						color: "neutral-content",
						"&:hover": {
							"background-color": "accent",
							"border-color": "accent"
						}
					},
					card: {
						"background-color": "base-100",
						"border-color": "1px solid base-200",
						"box-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
						"&:hover": {
							"box-shadow": "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
						}
					}
				}
			}
		]
	}
}
