import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/math-challenge-game/',
  plugins: [react()],
  server: {
    port: 5203,
    open: true
  }
})
