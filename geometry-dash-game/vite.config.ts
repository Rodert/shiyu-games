import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/geometry-dash-game/',
  plugins: [react()],
  server: {
    port: 5193,
    open: true
  }
})
