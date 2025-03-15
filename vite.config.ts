import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
      	target: 'http://13.125.21.225:8080',
        changeOrigin: true,
        secure: false,
        // ws: true, // 찾아보니 websocket할 때 필요한 부분이라고 함
      },
    },
  },
})