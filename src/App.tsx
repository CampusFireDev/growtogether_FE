import { BrowserRouter } from "react-router-dom";
import Router from './router/Router';
import "./App.css";
import { useEffect } from "react";
import api from "./api/authApi";
import useAuth from "./hooks/login/useAuth";

function App() {
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
      console.log("✅ 현재 Axios Authorization 헤더:", api.defaults.headers.common["Authorization"]);
      console.log(isAuthenticated ? "로그인됨 ✅ ": "로그인 필요 ❌")
  }, []);

  return (
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  )
}

export default App