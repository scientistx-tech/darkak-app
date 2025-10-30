/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#00153B',
        secondary: {
          50: '#E6EFFF',
          100: '#BBD4FF',
          400: '#5694FF',
          500: '#003084',
        },
        background: '#FFFFFF',
      },
    },
  },
  plugins: [],
}