import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [svgr(), react()],
  resolve: {
    alias: [{
      find: "@protos",
      replacement: "/../",
    }]
  },
  test: {
    globals: true,
    css: true,
    reporters: ['verbose']
  },
})