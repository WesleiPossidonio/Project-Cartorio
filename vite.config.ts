import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [reactRefresh()],
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
