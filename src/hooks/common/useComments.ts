import axios from "axios";
import { useEffect, useState, useCallback} from "react";
import { useContentType } from "../../context/ContentTypeContext";
import { CommentData } from "../../types/comment";
import useAuth from "../login/useAuth";
const useComments = (id: number) => {
    const [comments, setComments] = useState<CommentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastIdx, setLastIdx] = useState<number >(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const { token } = useAuth();
    const { contentType } = useContentType();

    const headers = { 
        ...(token ? { Authorization: `${token}` } : {}), 
        "Content-Type": "application/json", 
    };

    useEffect(() => {
        fetchComment(0);
    }, [id, contentType]);

    console.log(lastIdx);

    // 댓글 리스트 불러오기
    const fetchComment = useCallback(
        async (lastIdx: number, size: number = 1) => {
            if (!hasMore) return;
            setLoading(true);

            try {
                const res = await axios.get(`/api/${contentType}/comments/${id}?lastIdx=${lastIdx}&size=${size}`, {
                    headers: { "Accept": "application/json" }
                });
                if (res.data && res.data.length > 0) {
                    setComments(prevComments => {
                        const newComments = res.data.filter((comment: any) =>
                            !prevComments.some(prevComment =>
                                contentType === "bootcamp" ? prevComment.commentId === comment.commentId : prevComment.studyCommentId === comment.studyCommentId
                            )
                        );
                        return [...prevComments, ...newComments];
                    });
    
                    // 마지막 댓글이 존재할 때만 lastIdx 업데이트
                    const lastComment = res.data[res.data.length - 1];
                    setLastIdx(contentType === "bootcamp" ? lastComment.commentId : lastComment.studyCommentId);
                } else {
                    setHasMore(false);
                }
            } catch (error: any) {
                setError(error instanceof Error ? error.message : "알 수 없는 오류 발생");
            } finally {
                setLoading(false);
            }
        },
        [id, contentType, loading, hasMore] 
    );

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
            await fetchComment(0);
            window.location.reload();
        } catch (error: any) {
            console.error("❌ 댓글 추가 중 오류 발생:", error.response?.data || error.message)
            setError(error instanceof Error ? error.message : "댓글 추가 중 오류 발생");
        }
    };

    // 댓글 삭제하기
    const deleteComment = async (commentId: number) => {
        try {
            const res  = await axios.delete(`/api/${contentType}/comments/${commentId}`, { headers });
            await fetchComment(0);
            window.location.reload();
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

            await fetchComment(0);
            window.location.reload();
        } catch (error: any) {
            setError(error instanceof Error ? error.message : "댓글 수정 중 오류 발생");
        }
    };

    return { comments, loading, error, fetchComment, addComment, deleteComment, editComment, hasMore };
};

export default useComments;

