/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				dark: "#2F3B50",
				"dark-focus": "#151A23",
			},
			fontFamily: {
				sans: ["Roboto, sans-serif"],
			},
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#3d70b2",
					secondary: "#D90B1C",
					accent: "#1FB2A5",
					neutral: "#191D24",
					"base-100": "#2A303C",
					info: "#3ABFF8",
					success: "#36D399",
					warning: "#FBBD23",
					error: "#F87272",
				},
			},
		],
	},

	plugins: [require("daisyui")],
};
