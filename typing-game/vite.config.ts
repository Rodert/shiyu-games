import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/typing-game/',
  plugins: [react()],
  server: {
    port: 5197,
    open: true
  }
})
