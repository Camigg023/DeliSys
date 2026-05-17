/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C0522A",     // terracota
        secondary: "#D4892A",   // ocre
        background: "#FDF8F2",  // crema
        card: "#FFFFFF",        // blanco
        sidebar: "#3A4A2E",     // verde oliva
        text: "#2C1810",        // café oscuro
        muted: "#7A6E67",       // gris cálido
        success: "#4A7C59",     // verde
        warning: "#D4892A",     // ocre alerta
        error: "#A03020",      // rojo
      },
    },
  },
  plugins: [],
};