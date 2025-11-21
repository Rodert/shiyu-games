import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/space-shooter-game/',
  plugins: [react()],
  server: {
    port: 5198,
    open: true
  }
})
