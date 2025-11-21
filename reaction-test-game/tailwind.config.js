/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00ffff',
          pink: '#ff00ff',
          lime: '#00ff41',
          purple: '#9d00ff',
        }
      },
    },
  },
  plugins: [],
}
