import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/stickman-fight-game/',
  plugins: [react()],
  server: {
    port: 5195,
    open: true
  }
})
