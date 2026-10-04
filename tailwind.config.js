/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        satibax: {
          dark: '#3D4D45',
          light: '#8FA479',
          cream: '#F9F7F2',
          accent: '#553A49',
          green: '#8FA479',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Lato"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
