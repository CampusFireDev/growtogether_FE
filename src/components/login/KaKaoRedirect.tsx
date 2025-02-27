import { useEffect } from "react";
import { KAKAO_CONFIG } from "../../config";

const KaKaoRedirect = (): JSX.Element => {
    // 1. 현재 URL에서 code(인가코드) 가져오기
    const code = new URL(window.location.href).searchParams.get('code');

    // 2. Access Token 요청
    const getToken = async( code: string ) => {
        const tokenURL = 'https://kauth.kakao.com/oauth/token';
    
        const response = await fetch(tokenURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: KAKAO_CONFIG.KAKAO_REST_API_KEY,
                redirect_uri: KAKAO_CONFIG.KAKAO_REDIRECT_URI,
                code: code,
            })
        });
        return response.json();
    }

    // Access Token 요청
    useEffect(() => {
        if (code) {
            getToken(code).then((res) => {
                console.log(res.access_token);
            })
        }
    }, [code]);

    return <p>로그인 중</p>
}
export default KaKaoRedirect;