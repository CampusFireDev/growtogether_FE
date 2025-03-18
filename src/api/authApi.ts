import axios from "axios"
import { API_URL } from "../config"

/**
 * Axios 인스턴스 생성 
 */
const api = axios.create({
    baseURL: API_URL.API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * 모든 API 요청에 자동으로 토큰 추가
 */
api.interceptors.request.use((config) => {
    // Local Storage에서 토큰 가져오기
    const token = localStorage.getItem("token");

    // 모든 요청에 자동으로 Authorization 헤더 추가
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    // 요청 실패 시 에러 반환
    return Promise.reject(error);
});

/**
 * 로그인 API 호출 함수
 */

export const login = async (email: string, password: string) => {
    const response = await api.post(`${API_URL.API_BASE_URL}member/memberLogin`, { email, password });

    // 응답에서 토큰 추출
    const accessToken = response.data.accessToken;

    if (!accessToken) {
        console.error("토큰이 없습니다! API 응답 확인 필요");
        throw new Error("로그인 응답에 토큰이 없습니다.");
    }

    console.log("✅ 저장할 토큰:", accessToken);
    localStorage.setItem("token", accessToken); // Local Storage에 저장
    
    return response.data;
}

export default api;