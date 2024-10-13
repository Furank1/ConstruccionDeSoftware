/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {      colors: {
      primary: '#BF15B4',     // Color fucsia
      secondary: '#F2F2EB',   // Color crema claro
      accent: '#F2D479',      // Color amarillo pastel
      highlight: '#D9A362',   // Color naranja pastel
      dark: '#A64724',        // Color terracota
    }},
  },
  plugins: [],
}

