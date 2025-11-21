import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/tetris-game/',
  plugins: [react()],
  server: {
    port: 5174,
    open: true
  }
})
