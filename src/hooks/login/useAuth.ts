import { useEffect, useState } from "react"
import api from "../../api/authApi";

const useAuth = () => {
    const [ token, setToken ] = useState<string | null>(null); // 토큰 상태 관리

    useEffect(() => {
        // Local Storage에서 토큰 가져오기
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            // 상태 업데이트
            setToken(storedToken);

            // Axios 헤더에도 즉시 반영
            api.defaults.headers.common["Authorization"] = `${storedToken}`;
        }
    }, []);

    const login = (newToken: string) => {
        if (!newToken) {
            console.error("저장할 토큰이 없습니다!");
            return;
        }

        // Local Storage에 토큰 저장
        localStorage.setItem("token", newToken);

        // Axios 헤더 즉시 반영
        api.defaults.headers.common["Authorization"] = `${newToken}`;
        
        // 상태 업데이트
        setToken(newToken);
    };

    return { token, login, isAuthenticated: !!token }; // 토큰이 존재하면 로그인 상태 ture
}

export default useAuth;