// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ["event-source-polyfill"],
//   },
//   server: {
//     proxy: {
//       "/api": {
//       	target: 'http://13.125.21.225:8080',
//         changeOrigin: true,
//         secure: false,
//         // ws: true, // 찾아보니 websocket할 때 필요한 부분이라고 함
//       },
//       "/noti": {
//         target: 'http://13.125.21.225:8080',  // API가 있는 서버 주소로 설정
//         changeOrigin: true,
//         secure: false,
//         // ws: true, // 웹소켓을 사용할 때 필요
//       },
//       "/sse": {
//         target: 'http://13.125.21.225:8080',  // API가 있는 서버 주소로 설정
//         changeOrigin: true,
//         secure: false,
//         // ws: true, // 웹소켓을 사용할 때 필요
//         // headers: {
//         //   Connection: "keep-alive", // SSE 연결을 유지하기 위한 설정
//         //   CacheControl: "no-cache",
//         //   Accept: "text/event-stream",
//         // },
//       },
//     },
//   },
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 👇 이 두 개를 추가 설치해야 작동함
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["event-source-polyfill"],
    esbuildOptions: {
      define: {
        global: 'globalThis', // ✅ 브라우저에서 global 에러 방지
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  resolve: {
    alias: {
      // ✅ node core 모듈 polyfill
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      sys: 'util',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      path: 'rollup-plugin-node-polyfills/polyfills/path',
      querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
      punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
      url: 'rollup-plugin-node-polyfills/polyfills/url',
      string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
      http: 'rollup-plugin-node-polyfills/polyfills/http',
      https: 'rollup-plugin-node-polyfills/polyfills/http',
      os: 'rollup-plugin-node-polyfills/polyfills/os',
      assert: 'rollup-plugin-node-polyfills/polyfills/assert',
      constants: 'rollup-plugin-node-polyfills/polyfills/constants',
      _stream_duplex: 'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
      _stream_passthrough: 'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
      _stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
      _stream_writable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
      _stream_transform: 'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
      timers: 'rollup-plugin-node-polyfills/polyfills/timers',
      console: 'rollup-plugin-node-polyfills/polyfills/console',
      vm: 'rollup-plugin-node-polyfills/polyfills/vm',
      zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
      tty: 'rollup-plugin-node-polyfills/polyfills/tty',
      domain: 'rollup-plugin-node-polyfills/polyfills/domain',
      crypto: "crypto-browserify",
    },
  },
  define: {
    global: 'globalThis',
  },
  build: {
    rollupOptions: {
      // @ts-ignore
      plugins: [rollupNodePolyFill()],
    },
  },
  server: {
    proxy: {
      "/api": {
        target: 'http://13.125.21.225:8080',
        changeOrigin: true,
        secure: false,
      },
      "/noti": {
        target: 'http://13.125.21.225:8080',
        changeOrigin: true,
        secure: false,
      },
      "/sse": {
        target: 'http://13.125.21.225:8080',
        changeOrigin: true,
        secure: false,
      },
      "/ws-chat": {
        // WebSocket 프록시 설정
        target: "http://13.125.21.225:8080",
        ws: true, // 웹소켓용 프록시!
        changeOrigin: true,
        secure: false,
      },

      "/payment/ready": {
        target: 'http://13.125.21.225:8080',
      },

      "/payment/approve/callback": {
        target: 'http://13.125.21.225:8080',
      },

      "/payment/approve2": {
        target: 'http://13.125.21.225:8080',
      },

      "/member": {
        target: 'http://13.125.21.225:8080',
      },
    },
  },
});
