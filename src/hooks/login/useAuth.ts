import { useEffect, useState } from "react"
import api from "../../api/authApi";

const useAuth = () => {
    // 초기 값을 localStorage에서 바로 가져옴
    const [ token, setToken ] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            api.defaults.headers.common["Authorization"] = `${token}`;
        } else {
            delete api.defaults.headers.common["Authorization"];
        }
    }, [token]);

    const login = (newToken: string) => {
        if (!newToken) {
            console.error("저장할 토큰이 없습니다!");
            return;
        }

        // Local Storage에 토큰 저장
        localStorage.setItem("token", newToken);
        setToken(newToken);

        // Axios 헤더 즉시 반영
        api.defaults.headers.common["Authorization"] = `${newToken}`;
    };

    return { token, login, isAuthenticated: !!token }; // 토큰이 존재하면 로그인 상태 ture
}

export default useAuth;