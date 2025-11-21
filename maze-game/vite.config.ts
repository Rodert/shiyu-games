import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/maze-game/',
  plugins: [react()],
  server: {
    port: 5177,
    open: true
  }
})
