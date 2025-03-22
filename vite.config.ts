import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["event-source-polyfill"],
  },
  server: {
    proxy: {
      "/api": {
      	target: 'http://13.125.21.225:8080',
        changeOrigin: true,
        secure: false,
        // ws: true, // 찾아보니 websocket할 때 필요한 부분이라고 함
      },
      "/noti": {
        target: 'http://13.125.21.225:8080',  // API가 있는 서버 주소로 설정
        changeOrigin: true,
        secure: false,
        // ws: true, // 웹소켓을 사용할 때 필요
      },
      "/sse": {
        target: 'http://13.125.21.225:8080',  // API가 있는 서버 주소로 설정
        changeOrigin: true,
        secure: false,
        // ws: true, // 웹소켓을 사용할 때 필요
        // headers: {
        //   Connection: "keep-alive", // SSE 연결을 유지하기 위한 설정
        //   CacheControl: "no-cache",
        //   Accept: "text/event-stream",
        // },
      },
    },
  },
})