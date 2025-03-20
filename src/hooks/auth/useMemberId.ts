import { jwtDecode, JwtPayload } from "jwt-decode";
import useAuth from "../login/useAuth";
import { useEffect, useState } from "react";

// JWTPayload 확장하여 memberId 포함
interface CustomJwtPayload extends JwtPayload {
    memberId: number;
}

/**
 * JWT 토큰 디코딩해서 사용자 memberId 가져오기
 * @returns memberId
 */

const useMemberId = () => {
    const { token } = useAuth(); // 토큰 상태 가져오기
    const [ memberId, setMemberId ] = useState<number | null>(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);
                setMemberId(decoded.memberId);
            } catch(e) {
                console.error("JWT 디코딩 오류: ", e);
            }
        }
    }, [token]);

    return memberId;
};

export default useMemberId;