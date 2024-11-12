/** @type {import('tailwindcss').Config} */

const sharedTheme = {
    // primary: "#72ACAF", //NOAA Lochmara
    //secondary: "#03646A", // NGI Teal
    primary: "#64ABDC", //NODE Custom Light blue
    dark_blue: "#233D7F", //NODE Custom Dark blue
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