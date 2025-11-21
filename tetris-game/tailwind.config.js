/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(0, 255, 65, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(0, 255, 65, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
