import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/fe-socket-test',
  plugins: [react()],
  build: {
	  assetsInlineLimit: 0,
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'ws://localhost:8080',
        ws: true,
      },
    },
    host: "0.0.0.0",
    port: 5173,
  }
})

