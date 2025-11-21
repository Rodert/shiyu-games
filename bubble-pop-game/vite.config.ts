import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/bubble-pop-game/',
  plugins: [react()],
  server: {
    port: 5200,
    open: true
  }
})
