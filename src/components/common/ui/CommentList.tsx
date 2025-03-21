import { useState, useEffect } from "react";
import { useContentType } from "../../../context/ContentTypeContext"
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import FormButton from "../../form/FormButton";
import TextArea from "../../form/TextArea";
import { CommentData } from "../../../types/comment";
import useComments from "../../../hooks/common/useComments";
import useMyPageInfo from "../../../hooks/mypage/useMyPageInfo";
import StatusHandler from "./StatusHandler";
import { formatDate } from "../../common/utils/formatDate";

interface CommentProps {
  postId: number;
}
const CommentList = ({ postId }: CommentProps): JSX.Element => {
  const { contentType } = useContentType();
  const [commentList, setCommentList] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null); // 댓글별로 답변창 열기
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정 중인 댓글 ID
  const [editContent, setEditContent] = useState(""); // 수정할 댓글 내용

  const { comments,loading, error, fetchComment, addComment, deleteComment, editComment } = useComments(postId);
  const { info } = useMyPageInfo();

  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

  const getCommentId = (comment: CommentData) => {
    return contentType === "bootcamp" ? comment.commentId : comment.studyCommentId;
  };

  const handleEditClick = (comment: CommentData) => {
    setEditingCommentId(getCommentId(comment));
    setEditContent(comment.content || comment.commentContent || ""); // 기존 댓글 내용 설정
    setReplyingTo(null)
  };

  const handleEditSave = async (commentId: number) => {
    if (!editContent.trim()) return;
    await editComment({
      commentId, 
      content: editContent,
      parentCommentId: null, 
    });
    setEditingCommentId(null); // 수정 완료 후 ID 초기화
  };

  const handleAddComment = async (parentId: number | null = null) => {
    if (!newComment.trim() && !replyComment.trim()) return;
   
    const commentData = {
      content: newComment || replyComment,
      parentCommentId: parentId,
      bootCampId: contentType === "bootcamp" ? postId : undefined,
      studyId: contentType === "study" ? postId : undefined,
    };
    try {
      await addComment(commentData);  
      await fetchComment();
    } catch (error) {
      console.error("댓글 추가 실패:", error);
    }
 
    setNewComment("");
    setReplyComment("");
    setReplyingTo(null); // 댓글 등록 후 답변창을 닫음
  };

  const renderComments = (comments: CommentData[], level: number = 0) => {
    return comments.map((comment) => {
      const key = `${getCommentId(comment)}-${level}`;
      const isOwnComment = comment.author === info?.nickName;
      const isDeleted = comment.isDeleted;
      const isEditing = editingCommentId === getCommentId(comment);

      return (
        <div key={key} className="relative flex flex-col justify-between">
          <div className="flex justify-between mb-10">
            <div className="flex items-center gap-2">
              <img src="/images/profile.png" alt="" className="w-7 h-7" />
              <span className="text-[13px] nexon-bold text-black6">{comment.author}</span>
              { isOwnComment && <img src="/images/owncomment.png" className="mr-2"></img> }
              <span className="text-[13px] nexon-medium text-black9">{formatDate(comment.createdAt)}</span>
            </div>
            <div className="absolute top-9 text-[12px] nexon-medium ml-[30px] text-black4 w-full pr-[200px]">
              {isEditing ? (
                <div className="flex items-center gap-3 ">
                  <TextArea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="flex-1" />
                  <div className="flex gap-1 text-[10px] justify-center">
                    <FormButton type="button" className="p-1 !w-[40px] !h-[30px]" onClick={() => handleEditSave(getCommentId(comment))}>저장</FormButton>
                    <FormButton type="button" className="p-1 !w-[40px] !h-[30px]" onClick={() => setEditingCommentId(null)}>취소</FormButton>
                  </div>
                </div>
              ) : (
                <p className="ml-2">{comment.content || comment.commentContent}</p>
              )}
            </div>


            <div className="flex justify-center items-center text-black6 text-[13px] gap-3">
              {!isDeleted && (
                <div className="flex justify-center items-center gap-1 cursor-pointer"
                  onClick={() => {
                    setReplyingTo(replyingTo === getCommentId(comment) ? null : getCommentId(comment));
                    setEditingCommentId(null);
                  }}
                >
                  <FaRegCommentDots /><p>답변</p>
                </div>
              )}
              {isOwnComment && !isDeleted && (
                <>
                  <div className="flex justify-center items-center gap-1 cursor-pointer"
                    onClick={() => handleEditClick(comment)}
                  >
                    <FiEdit /> <p>수정</p>
                  </div>
                  <div
                    className="flex justify-center items-center gap-1 cursor-pointer"
                    onClick={() => deleteComment(getCommentId(comment))} // 댓글 삭제
                  >
                    <IoTrashOutline /> <p>삭제</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 대댓글이 있으면 재귀적으로 렌더링 */}
          {comment.childComments && comment.childComments.length > 0 && (
            <div className="ml-5 relative">
              {comment.childComments.map((childComment) => (
                <div key={`${getCommentId(childComment)}-${level}`} className="flex items-start gap-2 mt-7">
                  <div className="mt-1 text-gray-500">
                    <PiArrowBendDownRightBold className="text-black9" />
                  </div>
                  <div className="flex-1">{renderComments([childComment], level + 1)}</div>
                </div>
              ))}
            </div>
          )}

          {/* 답변 입력창 */}
          {replyingTo === getCommentId(comment) && (
            <div className="flex gap-1 mt-5 text-[13px]">
              <TextArea
                placeholder="답변을 입력하세요"
                className="flex-1 "
                value={replyComment}
                onChange={(e) => setReplyComment(e.target.value)}
              />
              <FormButton
                type="submit"
                className="!w-[50px] h-auto !flex !items-center !justify-center"
                onClick={() => handleAddComment(getCommentId(comment))} // 댓글 ID를 인수로 넘겨줍니다.
              >
                답변 등록
              </FormButton>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <StatusHandler loading={loading} error={error}>
      <div className="mb-5">
        <div className="text-[15px] nexon-bold">
          <span className="mr-1">댓글</span>
        </div>
        <div className="flex gap-1">
          <TextArea placeholder="댓글을 입력하세요" className="flex-1 h-[100px] text-[13px]"
            value={newComment} onChange={(e) => setNewComment(e.target.value)}
          />
          <FormButton
            type="submit" className="!w-[80px] h-auto !flex !items-center !justify-center"
            onClick={() => handleAddComment()}
          >
            등록
          </FormButton>
        </div>
      </div>

      <div className="flex flex-col gap-8">{renderComments(commentList)}</div>
    </StatusHandler>
  );
};

export default CommentList;
