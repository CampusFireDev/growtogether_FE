import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

async function startApp() {
  // if (process.env.NODE_ENV === "development") {
  //   const { worker } = await import('./mocks/browser')
  //   await worker.start({
  //     onUnhandledRequest: "warn", // 문제 발생 시 경고 표시
  //     serviceWorker: {
  //       url: '/mockServiceWorker.js', // 서비스 워커 경로 확인
  //     }
  //   })
  //   console.log("[MSW] Worker started successfully")
  // }

  // MSW 초기화 후 앱을 렌더링
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

startApp();
