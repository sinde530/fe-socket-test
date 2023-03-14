import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/fe-socket-test',
  plugins: [react()],
  build: {
	  assetsInlineLimit: 0,
  }
})

