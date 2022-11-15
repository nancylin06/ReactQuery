/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans-serif' : 'Poppins'
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
