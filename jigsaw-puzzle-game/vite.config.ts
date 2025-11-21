import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/jigsaw-puzzle-game/',
  plugins: [react()],
  server: {
    port: 5185,
    open: true
  }
})
