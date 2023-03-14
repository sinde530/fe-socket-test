import { defineConfig } from 'vite'
import tsconfigPaths from "vite-tsconfig-paths"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/fe-socket-test',
  plugins: [react(), tsconfigPaths()],
  build: {
	  assetsInlineLimit: 0,
  }
})

