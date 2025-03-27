import axios from "axios";
import { useState } from "react";

const useMemberPw = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    // 이메일 인증 요청
    const requestEmailVerification = async (email: string) => {
        setLoading(true);  
        try {
            const urlencoded = new URLSearchParams();
            urlencoded.append("email", email); 

            await axios.post(
                "https://www.growtogether.store/member/forgot-password",
                urlencoded, 
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded", 
                    },
                }
            );

            setSuccess(true);  
        } catch (error: any) {
            setError(error.message || "비밀번호 찾기 중 오류 발생");
        } finally {
            setLoading(false); 
        }
    };

    // 비밀번호 재설정 요청
    const resetPassword = async (resetToken: string, newPassword: string) => {
        setLoading(true);
        try {
            const urlencoded = new URLSearchParams();
            urlencoded.append("token", resetToken);
            urlencoded.append("newPassword", newPassword);

            const response = await axios.post("https://www.growtogether.store/member/reset-password", urlencoded, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded", 
                },
            });

            setSuccess(true); 
            return response.data; 
        } catch (error: any) {
            setError(error.message || "비밀번호 재설정 중 오류 발생");
        } finally {
            setLoading(false); 
        }
    }

    return { requestEmailVerification, resetPassword, loading, error, success };
};

export default useMemberPw;
