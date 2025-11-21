import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/shiyu-games/emoji-match-game/',
  plugins: [react()],
  server: {
    port: 5202,
    open: true
  }
})
