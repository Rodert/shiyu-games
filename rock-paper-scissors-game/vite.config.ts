import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/rock-paper-scissors-game/',
  plugins: [react()],
  server: {
    port: 5201,
    open: true
  }
})
