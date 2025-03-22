import axios from "axios";
import { useEffect, useState } from "react"
import useAuth from "../login/useAuth";
import { MyLikesData } from "../../types/mylikes";

const useMyLikes = () => {
    const { token } = useAuth();
    const [ myLikes, setMyLikes ] = useState<MyLikesData>({
        page: 0,
        reviews: [],
        size: 0,
        totalElements: 0,
        totalPages: 0
    });
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const fethLikes = async () => {
            try {
                const res = await axios.get("/api/mypage/myLikes", {
                    headers: { Authorization: `${token}` },
                    withCredentials: true,
                });
                setMyLikes(res.data);
            } catch(error) {
                console.log(error);
                setError("회원정보를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fethLikes();
    }, [token]);

    return { myLikes, loading, error }
};

export default useMyLikes;