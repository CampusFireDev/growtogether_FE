export interface CommentData {
    commentId: number;
    studyCommentId: number;
    author: string;
    content: string;
    commentContent: string;
    createdAt: string;
    isDeleted: boolean;
    childComments: CommentData[];
    parentCommentId: number | null;
}