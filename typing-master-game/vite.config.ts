import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/typing-master-game/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
