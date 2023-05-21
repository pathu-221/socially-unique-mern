/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [ require('daisyui')],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {},
  },
}

