import axios from "axios";
import { useEffect, useState } from "react";
import { useContentType } from "../../context/ContentTypeContext";
import { CommentData } from "../../types/comment";
import useAuth from "../login/useAuth";
const useComments = (id: number) => {
    const [comments, setComments] = useState<CommentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();
    const { contentType } = useContentType();

    const headers = { 
        ...(token ? { Authorization: `${token}` } : {}), 
        "Content-Type": "application/json", 
    };

    useEffect(() => {
        fetchComment();
    }, [id, contentType]);

    // 댓글 리스트 불러오기
    const fetchComment = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/${contentType}/comments/${id}?lastIdx=0&size=5`, {
                headers: { "Accept": "application/json" }
            });
            setComments(res.data);
        } catch (error: any) {
            setError(error instanceof Error ? error.message : "알 수 없는 오류 발생");
        } finally {
            setLoading(false);
        }
    };

    // 댓글 추가하기
    const addComment = async (commentData: { bootCampId?: number;  studyId?: number; content: string; parentCommentId: number | null }) => {
        try {
            let data: any;
            if(contentType === "bootcamp"){
                data = {
                    bootCampId: commentData.bootCampId,
                    content: commentData.content,
                    parentCommentId: commentData.parentCommentId ,
                };
            } else if(contentType === "study"){
                data = {
                    studyId: commentData.studyId, 
                    commentContent: commentData.content,
                    parentCommentId: commentData.parentCommentId ?? 0,
                };
            }
            const res = await axios.post(`/api/${contentType}/comments`, data, { headers });
            console.log("✅POST", res);
            // if (res.data === "댓글 작성이 완료되었습니다." || res.data === "" || res.data === null) {
            //     await fetchComment(); 
            // }
            await fetchComment();
        } catch (error: any) {
            console.error("❌ 댓글 추가 중 오류 발생:", error.response?.data || error.message)
            setError(error instanceof Error ? error.message : "댓글 추가 중 오류 발생");
        }
    };

    // 댓글 삭제하기
    const deleteComment = async (commentId: number) => {
        try {
            const res  = await axios.delete(`/api/${contentType}/comments/${commentId}`, { headers });
            await fetchComment();
            console.log("✅DELET", res);
        } catch (error: any) {
            setError(error instanceof Error ? error.message : "댓글 삭제 중 오류 발생");
        }
    };

    // 댓글 수정하기
    const editComment = async (commentData: { commentId: number; content: string; parentCommentId: number | null }) => {
        try {
            let data: any;
            if(contentType === "bootcamp"){
                data = {
                    content: commentData.content,
                };
            } else if(contentType === "study"){
                data = {
                    studyId: commentData.commentId, 
                    commentContent: commentData.content,
                    parentCommentId: commentData.parentCommentId ?? 0,
                };
            }
            const res = await axios.put(`/api/${contentType}/comments/${commentData.commentId}`, data, { headers });
            console.log("✅PUT", res);

            // 기존 댓글 리스트에서 수정된 댓글 반영
            await fetchComment();
        } catch (error: any) {
            setError(error instanceof Error ? error.message : "댓글 수정 중 오류 발생");
        }
    };

    return { comments, loading, error, fetchComment, addComment, deleteComment, editComment };
};

export default useComments;

