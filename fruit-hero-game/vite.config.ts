import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/fruit-hero-game/',
  plugins: [react()],
  server: {
    port: 5190,
    open: true
  }
})
