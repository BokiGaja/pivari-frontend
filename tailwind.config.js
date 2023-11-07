/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      purple: '#3f3cbb',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
      blackBackground: '#27241D',
      maltYellow: '#efcc68',
    },
    extend: {
      fontFamily: {
        ristrettoBold: ['Ristretto W01 Bold'],
        ristrettoRegular: ['Ristretto Pro Rg'],
      },
    },
  },
  plugins: [],
};
