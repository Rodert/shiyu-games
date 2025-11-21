import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/whack-mole/',
  plugins: [react()],
  server: {
    port: 5180,
    open: true
  }
})
