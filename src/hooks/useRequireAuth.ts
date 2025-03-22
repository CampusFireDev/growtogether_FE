import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRequireAuth = (error: string | null) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (error === "로그인이 필요합니다.") {
            alert("로그인이 필요합니다.");
            navigate("/login"); // 로그인 페이지로 이동
        }
    }, [error, navigate]);
};

export default useRequireAuth;
