/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary": "#bd0f3b",
        "primary-dark": "#8a0b2b",
        "background-light": "#f8f6f6",
        "background-dark": "#221015",
        "sidebar-bg": "#2a0a12",
        "surface-dark": "#242830"
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      }
    },
  },
  plugins: [],
};
