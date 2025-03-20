export interface CommentData {
    commentId: number;
    nickname: string;
    author: string;
    content: string;
    createdAt: string;
    isDeleted: boolean;
    childComments: CommentData[];
    parentId: number | null;
}