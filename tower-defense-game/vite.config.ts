import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/tower-defense-game/',
  plugins: [react()],
  server: {
    port: 5199,
    open: true
  }
})
