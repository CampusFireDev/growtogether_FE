import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";
import FormButton from "../../form/FormButton";
import TextArea from "../../form/TextArea";

interface CommentProps {
    postId: number;  // 댓글이 속한 포스트의 ID
}

interface CommentData {
    id: number;
    author: string;
    content: string;
    date: string;
    partentId: number | null;
}
  

const Comment = ({postId}: CommentProps):JSX.Element => {
    const [comment, setComments] = useState<CommentData[]>([]);
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState<number | null>(null);

    useEffect(() => {
        fetch(`/bootcamp/${postId}/comment`)
        .then((res) => res.json())
        .then((data) => setComments(data))
        .catch((err) => console.error("Failed to fetch comment:", err));
    }, [postId]);

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const commentData = {
            author: "사용자", // 실제 앱에서는 로그인된 사용자 정보 사용
            content: newComment,
            parentId: replyingTo,
        };

        fetch(`/bootcamp/${postId}/comment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentData),
        })
        .then((res) => res.json())
        .then((data) => {
          setComments([...comment, data]);
          setNewComment(""); // 입력창 초기화
        })
        .catch((err) => console.error("Failed to add comment:", err));
    };
    
    
    return(
        <>
            {/*댓굴 입력창*/}
            <div className="mb-5">
                <div className="text-[15px] nexon-bold">
                    <span className="mr-1">댓글</span>
                    <span className="text-myBlue">{comment.length}</span>
                </div>
                <div className="flex gap-1">
                    <TextArea placeholder="댓글을 입력하세요" className="flex-1 h-[100px] text-[13px]" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <FormButton type="submit" className="!w-[80px] h-auto !flex !items-center !justify-center" onClick={handleAddComment}>등록</FormButton>
                </div>
            </div>

            {/*댓굴*/}
            <div className="flex flex-col gap-13">
                {comment.map((comment) => (
                    <div key={comment.id} className="relative flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img src="/images/profile.png" alt="" className="w-7 h-7"/>
                            <span className="text-[13px] nexon-bold mr-5">{comment.author}</span>
                            <span className="text-[13px] nexon-medium text-black6">{comment.date}</span>
                        </div>
                        <p className="absolute top-9 text-[12px] nexon-medium ml-[40px]">{comment.content}</p>
                        <div  className="flex justify-center items-center text-black4 text-[13px] gap-3">
                            <div className="flex justify-center items-center gap-1" onClick={handleAddComment}>
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
                ))}
            </div>

            {/* <div className="flex flex-col gap-3">
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/images/profile.png" alt="" className="w-8 h-8 z-10"/>
                        <span className="text-[13px] nexon-bold mr-5">고먐미</span>
                        <span className="text-[13px] nexon-medium text-black6">2025.02.20</span>
                    </div>
                    <div  className="flex justify-center items-center text-black4 text-[13px] gap-3">
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
                <p className="text-[12px] nexon-medium ml-[40px]">혹시 이 부트캠프 졸업 후 다른 사람들이 어떤 회사에 취업했는지 알 수 있을까요?</p>
            </div> */}

            {/*대댓굴*/}
            {/* <div className="flex flex-col gap-3 mt-5 pl-10 relative">
                <div className="absolute left-[15px] top-[-60px] w-[35px] h-[80px] border-l-2 border-b-2  border-gray5 rounded-[10px] z-1"></div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/images/profile.png" alt="" className="w-8 h-8 z-10"/>
                        <span className="text-[13px] nexon-bold mr-5">Whatever</span>
                        <span className="text-[13px] nexon-medium text-black6">2025.02.21</span>
                    </div>
                    <div  className="flex justify-center items-center text-black4 text-[13px] gap-3">
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
                <p className="text-[12px] nexon-medium w-[450px] ml-[40px]">많은 사람들이 스타트업, 중소기업, 그리고 대기업 IT 부서 등에서 개발자로 취업하고 있어요. 
                    구체적으로는 카카오, 네이버, 삼성, LG, 그리고 스타트업 등에서 일하고 있는 졸업생들이 많습니다. 
                    또한, 프리랜서로 활동하거나 자기 프로젝트를 통해 창업한 사람들도 있습니다.
                </p>
            </div> */}
        </>
    )
}

export default Comment;


