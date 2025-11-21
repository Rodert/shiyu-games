import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/rhythm-game/',
  plugins: [react()],
  server: {
    port: 5196,
    open: true
  }
})
