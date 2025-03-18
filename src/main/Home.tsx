import { useEffect } from "react";
import useAuth from "../hooks/login/useAuth";
import api from "../api/authApi";


const Home = ():JSX.Element =>{
    const { token, isAuthenticated } = useAuth();

    useEffect(() => {
        console.log("✅ 현재 Axios Authorization 헤더:", api.defaults.headers.common["Authorization"]);
    }, []);

    return (
        <>
        {isAuthenticated ? <p>로그인됨 ✅</p> : <p>로그인 필요 ❌</p>}
        </>
    )
}

export default Home;