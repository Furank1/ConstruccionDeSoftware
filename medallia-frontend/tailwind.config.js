module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {      colors: {
      primary: '#BF15B4',     // Color fucsia
      secondary: '#F2F2EB',   // Color crema claro
      accent: '#F2D479',      // Color amarillo pastel
      highlight: '#D9A362',   // Color naranja pastel
      dark: '#A64724',        // Color terracota
    },
  fontFamily: {
    special: ['"Lobster"', 'cursive'],
    serif: ['"Playfair Display"', 'serif'],
    sans: ['"Open Sans"', 'sans-serif'],
    display: ['"Poppins"', 'sans-serif'],
    body: ['"Roboto"', 'sans-serif'],
    script: ['"Lobster"', 'cursive'],
    headline: ['"Nunito"', 'sans-serif'],
    text: ['"Lato"', 'sans-serif'],
    creative: ['"Raleway"', 'sans-serif'],
    classic: ['"Merriweather"', 'serif'],
  }
  },
  },
  plugins: [],
}

