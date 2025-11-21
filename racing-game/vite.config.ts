import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/racing-game/',
  plugins: [react()],
  server: {
    port: 5194,
    open: true
  }
})
