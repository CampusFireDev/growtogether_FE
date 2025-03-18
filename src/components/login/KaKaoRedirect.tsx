import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KaKaoRedirect = (): JSX.Element => {
    const navigate = useNavigate();

    // 1. 현재 URL에서 code(인가코드) 가져오기
    const code = new URL(window.location.href).searchParams.get('code');

    
    useEffect(() => {
        const handleLogin = async () => {
            if (!code) return;
    
            try {
                const res = await axios.get(`http://13.125.21.225:8080/oauth2/code/kakao?code=${code}`, {
                    withCredentials: true
                });

                const accessToken = res.headers["Authorization"];

                if (!accessToken || !accessToken.startsWith("Bearer ")) {
                    alert("로그인 실패: 올바른 토큰이 없습니다.");
                    navigate("/login");
                    return;
                }

                // 'Bearer ' 부분 제거
                const jwtToken = accessToken.replace("Bearer ", "");

                localStorage.setItem("accessToken", jwtToken);
                axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
                
                alert("로그인 성공! 메인 페이지로 이동합니다.");
                
                navigate("/");
            } catch (error) {
                console.log("카카오 로그인 실패: ", error);
            }
        };
    
        handleLogin();
    }, [code, navigate]);

    return <p>로그인 중</p>
}
export default KaKaoRedirect;