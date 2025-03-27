import axios from "axios";
import { useEffect, useState } from "react"
import useAuth from "../login/useAuth";

interface MyLikesData{
    people?: number;
    postId: number;
    title: string;
    type: string;
    skillName?: string[];
    bootcampSkillNames?: string[];
    programCourse: string;
    status?: string | null;
}
const useMyLikes = () => {
    const { token } = useAuth();
    const [ myLikes, setMyLikes ] = useState<MyLikesData[]>([]);

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    const headers = { 
        ...(token ? { Authorization: `${token}` } : {}), 
        "Content-Type": "application/json", 
    };

    useEffect(() => {
        fethLikes();
    }, [token]);
    
    const fethLikes = async () => {
        setLoading(true);
        try {
            const res = await axios.get("https://www.growtogether.store/api/mypage/liked-posts", { headers });
            const myLikes = res.data; 
            setMyLikes(myLikes);
        } catch(error) {
            console.log(error);
            setError("회원정보를 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleBootcampLike = async (postId: number) => {
        try {
            const res = await axios.post(`https://www.growtogether.store/api/bootcamp/${postId}/like`,{},{ headers });
            console.log(res);
            window.location.reload();
            fethLikes();
        } catch (error){
            console.log("> Bootcamp", error);
        }
    };
    const handleStudyLike = async (postId: number) =>{
        try {
            const res = await axios.post(`https://www.growtogether.store/api/study/bookmark/${postId}`,{},{ headers });
            console.log(res); //{data: '좋아요 상태가 변경되었습니다.', status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…}, …}
            window.location.reload();
            fethLikes();
        } catch(error){
            console.log("> Study",error);
        }
    };

    return { myLikes, handleBootcampLike, handleStudyLike, loading, error }
};

export default useMyLikes;