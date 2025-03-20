import Post from "../../../views/Post";
import { BootcampData } from "../../../types/bootcamp";
import { StudyData } from "../../../types/study";
import { CommentData } from "../../../types/comment";


interface GenericPostProps<T> {
    postType: "bootcamp" | "study";
    post: T;
    renderContent: (post: T) => JSX.Element;
    comments: CommentData[];
}

const GenericPost = <T extends BootcampData | StudyData>({ postType, post, renderContent, comments }:GenericPostProps<T>):JSX.Element =>{
    return(
       <Post post={post} postType={postType} postTitle={(post as any).title} 
            infoTitle={postType==="bootcamp"? "후기" : "모집 내용"} comments={comments}
        >
            {renderContent(post)} 
       </Post>
    );
};

export default GenericPost;