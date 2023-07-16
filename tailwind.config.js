/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				dark: "#2F3B50",
				"dark-focus": "#151A23",
			},
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#6BA4E9",
					secondary: "#D90B1C",
				},
			},
		],
	},

	plugins: [require("daisyui")],
};
