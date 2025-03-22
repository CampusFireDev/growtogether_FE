import { useEffect } from "react";
import useAuth from "../hooks/login/useAuth";
import api from "../api/authApi";
import Study from "../views/Study";
import Carousel from "../components/common/ui/Carousel";

const Home = ():JSX.Element =>{
    const {isAuthenticated } = useAuth();

    useEffect(() => {
        console.log("✅ 현재 Axios Authorization 헤더:", api.defaults.headers.common["Authorization"]);
    }, []);

    return (
        <>
        {isAuthenticated ? <p>로그인됨 ✅</p> : <p>로그인 필요 ❌</p>}
        <Carousel/>
        <Study isHome={true}/>
        </>
    )
}

export default Home;