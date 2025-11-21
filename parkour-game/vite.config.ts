import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/parkour-game/',
  plugins: [react()],
  server: {
    port: 5189,
    open: true
  }
})
