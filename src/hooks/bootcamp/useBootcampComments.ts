import axios from "axios";
import { useEffect, useState } from "react";
import { CommentData } from "../../types/comment";

const useBootcampComments = (id: number) => {
    const [bootcampComments, setBootcampComments] = useState<CommentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        fetchComments();
    }, [id])

    // 댓글 리스트 불러오기 (GET)
    const fetchComments = async() =>{
        setLoading(true);
        try {
            const res = await axios.get(`/api/bootcamp/comments/${id}?lastIdx=0&size=5`, {
                headers: {
                    "Accept": "application/json"
                }
            });

            setBootcampComments(res.data);
        } catch (error: any) {
            setError(error instanceof Error ? error.message : "알 수 없는 오류 발생");
        } finally {
            setLoading(false);
        }
    };

    // 댓글 추가힉 (POST)
    const addComment = async(id: number, content: string, parentId?: number) => {
        try{
            const res = await axios.post("/api/bootcamp/comments/",{
                id, content, parentId
            }, {
                headers: { "Content-Type": "application/json" }
            });
            setBootcampComments([res.data, ...bootcampComments]);
        } catch(error: any){
            setError(error instanceof Error ? error.message : "댓글 추가 중 오류 발생");
        }
    };

    // const editComment = async (commentId: number, content: string) => {
    //     try {
    //         await axios.put(`/api/bootcamp/comments/${id}/${commentId}`, {
    //             content
    //         }, {
    //             headers: { "Content-Type": "application/json" }
    //         });

    //         // 기존 댓글 리스트에서 수정된 댓글 반영
    //         setBootcampComments(bootcampComments.map(comment =>
    //             comment.commentId === commentId ? { ...comment, content } : comment
    //         ));
    //     } catch (error: any) {
    //         setError(error instanceof Error ? error.message : "댓글 수정 중 오류 발생");
    //     }
    // };

    // // 댓글 삭제하기 (DELETE)
    const deleteComment = async (commentId: number) => {
        try {
            await axios.delete(`/api/bootcamp/comments/${commentId}`);

            setBootcampComments(prevComments =>
                prevComments.map(comment =>
                    comment.commentId === commentId
                        ? { ...comment, isDeleted: true, content: "작성자에 의해 삭제된 댓글입니다." }
                        : comment
                )
            );
            
        } catch (error: any) {
            setError(error instanceof Error ? error.message : "댓글 삭제 중 오류 발생");
        }
    };



    return { bootcampComments, loading, error, addComment, deleteComment };
};

export default useBootcampComments;
