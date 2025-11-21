import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/speed-tetris/',
  plugins: [react()],
  server: {
    port: 5181,
    open: true
  }
})
