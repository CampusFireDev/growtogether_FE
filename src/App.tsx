import {useEffect} from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Router from './router/Router';
import "./App.css";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]); // location이 변경될 때마다 실행

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* 라우팅 변경 시 스크롤을 맨 위로 이동 */}
      <Router />
    </BrowserRouter>
  );
}

export default App;
