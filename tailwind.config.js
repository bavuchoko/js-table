/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius:{
        'radius-l-tb' : '5px 0 0 5px',
        'radius-r-tb' : '0 5px 5px 0',
      },
      backgroundImage: {
        'dots': "radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        'dot': '10px 10px',
      },
      colors: {
        deepGray : `#b3b3b3`,
        th : `#e5e5e5`,
        hover:`#ececec`,
        clicked:`rgba(209, 234, 255, 0.73)`,
      }
    },
  },
  plugins: [],
}