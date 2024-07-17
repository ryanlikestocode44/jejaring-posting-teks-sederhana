/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'phone': '320px',
      // => @media (min-width: 250px) { ... }
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },

    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
      colors: {
        'first': '#fffcf2',
        'second': '#ccc5b9',
        'third': '#403d39',
        'fourth': '#252422',
        'fifth': '#eb5e28'
      }
    },
  },
  plugins: [],
}

