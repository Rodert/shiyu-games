import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/jump-game/',
  plugins: [react()],
  server: {
    port: 5178,
    open: true
  }
})
