import axios from "axios";
import { useEffect, useState } from "react";
import { CommentData } from "../../types/comment";

const useStudyComments = (id:number) => {
    const [studyComments, setStudyComments] = useState<CommentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        fetchComments();
    }, [id])

    const fetchComments = async() =>{
        setLoading(true);
        try {
            const res = await axios.get(`/api/study/comments/${id}?lastIdx=10&size=5`, {
                headers: {
                    "Accept": "application/json"
                }
            });
            setStudyComments(res.data);
        } catch (error: any) {
            setError(error instanceof Error ? error.message : "알 수 없는 오류 발생");
        } finally {
            setLoading(false);
        }
    };

    return { studyComments, loading, error}
};

export default useStudyComments;
