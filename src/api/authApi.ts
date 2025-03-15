import axios from "axios"
import { API_URL } from "../config"

/**
 * 로그인 API 호출 함수
 */
export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL.API_BASE_URL}member/memberLogin`, { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
}