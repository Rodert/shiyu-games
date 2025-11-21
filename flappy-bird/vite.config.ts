import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/flappy-bird/',
  plugins: [react()],
  server: {
    port: 5175,
    open: true
  }
})
