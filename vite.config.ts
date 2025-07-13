/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext'
  },
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.ts'
  },
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    }
  }
});