import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/shadow-run-game/',
  plugins: [react()],
  server: {
    port: 5191,
    open: true
  }
})
