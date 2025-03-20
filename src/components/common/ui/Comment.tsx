import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import FormButton from "../../form/FormButton";
import TextArea from "../../form/TextArea";
import { CommentData } from "../../../../src/types/comment"

interface CommentProps {
    postId: number;  // 댓글이 속한 포스트의 ID
    comments: CommentData[];
}

const commentList = ({postId, comments}: CommentProps):JSX.Element => {
    const [commentList, setCommentList] = useState<CommentData[]>([]);
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState<number | null>(null);

    useEffect(() => {
        setCommentList(comments); 
    }, [comments]);
    
    const renderComments = (comments: CommentData[], level: number = 0) =>{
        return comments.map((comment) => (
            <div key={comment.commentId} className="relative flex flex-col justify-between">
                <div className="flex justify-between">

                    <div className="flex items-center gap-2">
                        <img src="/images/profile.png" alt="" className="w-7 h-7" />
                        <span className="text-[13px] nexon-bold mr-5 text-black6">{comment.nickname || comment.author}</span>
                        <span className="text-[13px] nexon-medium text-black9">{comment.createdAt}</span>
                    </div>
                    <p className="absolute top-9 text-[12px] nexon-medium ml-[40px] text-black4">{comment.content}</p>
                    <div className="flex justify-center items-center text-black6 text-[13px] gap-3">
                        <div className="flex justify-center items-center gap-1">
                            <FaRegCommentDots />
                            <p>답변</p>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            <FiEdit />
                            <p>수정</p>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            <IoTrashOutline />
                            <p>삭제</p>
                        </div>
                    </div>
                </div>

                {/* 대댓글이 있으면 재귀적으로 렌더링 */}
                {comment.childComments && comment.childComments.length > 0 && (
                    <div className="ml-5 my-4 relative">
                        {comment.childComments.map((childComment) => (
                            <div key={childComment.commentId} className="flex items-start gap-2 mt-8">
                                <div className="mt-1 text-gray-500">
                                    <PiArrowBendDownRightBold className="text-black9"/>
                                </div>
                                <div className="flex-1">{renderComments([childComment], level + 1)}</div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        ))
    };

    // useEffect(() => {
    //     fetch(`/bootcamp/${postId}/commentList`)
    //     .then((res) => res.json())
    //     .then((data) => setCommentList(data))
    //     .catch((err) => console.error("Failed to fetch commentList:", err));
    // }, [postId]);

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const parentId = replyingTo || null; // replyingTo가 설정되어 있으면 대댓글로 처리
        // 댓글 추가 API 호출
        addComment(postId, newComment, parentId);

        // 댓글 추가 후 상태 초기화
        setNewComment("");
        setReplyingTo(null); // 대댓글을 작성 중이라면 대댓글 입력창을 초기화
    };
    
    
    return(
        <>
            {/*댓굴 입력창*/}
            <div className="mb-5">
                <div className="text-[15px] nexon-bold">
                    <span className="mr-1">댓글</span>
                    {/* <span className="text-myBlue">{commentList.length}</span> */}
                </div>
                <div className="flex gap-1">
                    <TextArea placeholder="댓글을 입력하세요" className="flex-1 h-[100px] text-[13px]" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <FormButton type="submit" className="!w-[80px] h-auto !flex !items-center !justify-center" onClick={handleAddComment}>등록</FormButton>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                {renderComments(commentList)} {/* 댓글과 대댓글 렌더링 */}
            </div>

        </>
    )
}

export default commentList;


