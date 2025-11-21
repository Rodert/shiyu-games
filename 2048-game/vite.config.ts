import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/2048-game/',
  plugins: [react()],
  server: {
    port: 5176,
    open: true
  }
})
