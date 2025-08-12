import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173
  },
  // 💡 이 부분 추가
  build: {
    rollupOptions: {
      input: './index.html',
    }
  },
  // 💡 이 부분도 추가
  base: '/',
})
