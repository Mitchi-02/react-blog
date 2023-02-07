/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}" ],
  theme: {
    extend: {
      colors:{
        'mainBlue': '#00739b',
        'mainBlack': '#212121',
        'mainGrey': '#BFBFBF',
        'mainRed':'#FF4D4F',
        'mainGreen':'#14532D',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
