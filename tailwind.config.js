/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1E1E26',
        secondary: '#1A1A21',
        terciary: '#16161C',
        quaternary: '#1E1E26',
        grey: '#2D2D3B',
        white: '#F9F9F9',
        
        gradientStart: '#F29682',
        highlight: '#EE69AC',
        gradientStop: '#CB4BCF',

      },
      fontFamily: {
        inter: ['Inter', "sans-serif"]
      }
    },
  },
  plugins: [],
}