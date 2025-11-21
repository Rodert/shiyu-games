import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/gomoku-game/',
  plugins: [react()],
  server: {
    port: 5183,
    open: true
  }
})
