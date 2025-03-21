import Post from "../../../views/Post";
import { useContentType } from "../../../context/ContentTypeContext"
import { BootcampData } from "../../../types/bootcamp";
import { StudyData } from "../../../types/study";

interface GenericPostProps<T> {
    post: T;
    renderContent: (post: T) => JSX.Element;
}

const GenericPost = <T extends BootcampData | StudyData>({post, renderContent }:GenericPostProps<T>):JSX.Element =>{
    const { contentType } = useContentType();
    return(
       <Post post={post} postTitle={(post as any).title} 
            infoTitle={contentType==="bootcamp"? "후기" : "모집 내용"} 
        >
            {renderContent(post)} 
       </Post>
    );
};

export default GenericPost;