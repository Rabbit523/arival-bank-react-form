/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'first-color': '#817CA5',
        'secondary-color': '#413C5F',
        'hover-color': '#C9C5E8',
        'btn-disabled': '#A39FC1',
        'btn-txt-second': '#8B85B1',
        'error': '#DA2121',
        'label': '#CECAEB',
        'icon': '#0B3FFF',
      },
      placeholderColor: {
        primary: '#C0BCDF',
      },
      maxWidth: {
        'custom': '400px'
      }
    },
  },
  variants: {
    extend: {
      placeholderColor: ['responsive', 'dark', 'focus', 'hover', 'active'],
      borderColor: ['focus'],
      backgroundColor: ['focus'],
    },
  },
  plugins: [],
}

