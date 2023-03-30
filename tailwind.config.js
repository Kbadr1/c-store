/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
};
