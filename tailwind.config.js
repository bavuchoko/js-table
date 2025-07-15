/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        deepGray : `#b3b3b3`,
        th : `#e5e5e5`,
      }
    },
  },
  plugins: [],
}