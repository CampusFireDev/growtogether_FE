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
                const res = await axios.get(`http://13.125.21.225:8080/member/oauth2/code/kakao/callback?code=${code}`);
    
                if (!res.data || !res.data.accessToken) {
                    alert("로그인 실패: 응답 데이터가 없습니다.");
                    return;
                }
    
                // 받은 토큰을 localStorage에 저장
                const accessToken = res.data.accessToken;
                localStorage.setItem("accessToken", accessToken);
    
                // API 요청 시 Authorization 헤더에 추가
                axios.defaults.headers.common["Authorization"] = accessToken;
    
                alert("로그 확인 후 '확인'을 누르면 이동합니다!");
    
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