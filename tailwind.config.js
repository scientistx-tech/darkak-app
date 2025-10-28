/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './app.(*)/**/*.{js,jsx,ts,tsx}',
    './node_modules/nativewind/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

