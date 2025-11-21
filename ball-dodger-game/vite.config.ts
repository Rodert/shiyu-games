import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/ball-dodger-game/',
  plugins: [react()],
  server: {
    port: 5192,
    open: true
  }
})
