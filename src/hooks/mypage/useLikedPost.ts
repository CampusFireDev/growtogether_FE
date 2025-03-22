import { useEffect, useState } from "react"
import { LikedPostsResponse } from "../../types/mypage/LikedPostType"
import axios from "axios";
import useAuth from "../login/useAuth";

const useLikedPost = () => {
    const { token } = useAuth();

    const [ likedPosts, setLikedPosts ] = useState<LikedPostsResponse>({
        reviews: [],
        totalPages: 0,
        totalElements: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLikedPosts = async () => {
            try {
                const res = await axios.get("http://www.growtogether.store/api/mypage/myLikes", {
                    headers: { Authorization: `${token}` },
                    withCredentials: true,
                });
                setLikedPosts(res.data);
            } catch(e) {
                setError("좋아요 누른 게시글을 불러오는 중 오류가 발생했습니다");
            } finally {
                setLoading(false);
            }
        };

        fetchLikedPosts();
    }, [token]);

    return { likedPosts, loading, error };
}

export default useLikedPost;