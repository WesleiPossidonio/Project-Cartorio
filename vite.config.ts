import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@react-pdf/renderer': resolve(
        __dirname,
        'node_modules/@react-pdf/renderer'
      ),
    },
  },
  optimizeDeps: {
    include: ['@react-pdf/renderer'],
  },
})
