import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/memory-card-game/',
  plugins: [react()],
  server: {
    port: 5186,
    open: true
  }
})
