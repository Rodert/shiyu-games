import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/rhythm-tap-game/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
