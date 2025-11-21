import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/sliding-puzzle-game/',
  plugins: [react()],
  server: {
    port: 5184,
    open: true
  }
})
