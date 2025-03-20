import axios from "axios";
import { useEffect, useState } from "react"
import useAuth from "../login/useAuth";
import { useNavigate } from "react-router-dom";

interface MyPageInfo {
    nickName: string;
    profileImageUrl: string;
    points: number;
    githubUrl: string;
    skills: string[];
}

const useMyPageInfo = () => {
    const navigate = useNavigate();

    const { token } = useAuth();

    const [ info, setInfo ] = useState<MyPageInfo | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        // 로그인 안했을 때
        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/login"); // 로그인 페이지로 이동
            return;
        }

        const fetchInfo = async () => {
            try {
                const res = await axios.get("http://www.growtogether.store/api/mypage/info", {
                    headers: { Authorization: `${token}` },
                    withCredentials: true,
                });
                setInfo(res.data);
            } catch(e) {
                setError("회원정보를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchInfo();
    }, [token, navigate]);

    return { info, loading, error }
}

export default useMyPageInfo;