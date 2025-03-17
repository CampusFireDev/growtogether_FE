/**
 * 게시글 컴포넌트
 */

import { Link } from "react-router-dom"
import { IoEyeOutline } from "react-icons/io5";
import FormButton from "../components/form/FormButton";
import StudyTypeBadge from "../components/common/ui/StudyTypeBadge";
import LikeBtn from "../components/common/ui/LikeBtn";
import Comment from "../components/common/ui/Comment";
import { BootcampData  } from "../types/bootcamp";
import { StudyData } from "../types/study";

interface PostProps {
  post: BootcampData | StudyData;
  postType: string;
  postTitle: string;
  infoTitle: string;
  children: React.ReactNode;
}

const Post = ({ post, postType, postTitle, infoTitle, children }: PostProps):JSX.Element =>{
  const isBootcampPost = (post: BootcampData | StudyData): post is BootcampData => {
    return (post as BootcampData).bootcampName !== undefined;
  };
  
  return(
    <div className="w-full max-w-[1200px] my-10">  
        <StudyTypeBadge type={post.type}/>
        <h2 className="nexon-bold text-[20px] my-3">{postTitle}</h2>
        <div className="border-y border-gray5 flex items-center justify-between">    
            <div className="flex items-center gap-2 text-black4 text-[13px] text-nowrap py-3">
                <img src="/images/profile.png" alt="" className="w-6 h-6"/>
                <span className="nexon-medium">{post.author} | 작성일</span>
                <span>{post.createdAt.split("T")[0]}</span>
            </div>
            <div className="flex text-black6 items-center gap-1 ">
                <IoEyeOutline className="w-4 h-4" />
                <p className="text-[11px]">{post.viewCount}</p>
            </div>
        </div>

        {/* 게시글 상세 정보*/}
        {children}
      
        {/* 후기 / 모집글 작성*/}
        <div className="border-b border-gray5 py-5">
          <p className="nexon-bold text-black4 text-[14px] lg:text-[17px] mb-3">{infoTitle}</p>
          <p className="nexon-bold text-[14px] lg:text-[17px] ">{post.title}</p>
          <p className="text-[13px] lg:text-[15px] my-2">{isBootcampPost(post) ? post.content : post.description}</p>
        </div>

        {/* 좋아요, 목록 버튼*/}
        <div className="flex justify-center items-center gap-3 my-5">
            <LikeBtn likeCount={post.likeCount}/>
            <Link to={`/${postType}`}>
              <FormButton type="button" className="!w-[80px] !h-[50px] !flex !items-center !justify-center">목록</FormButton>
            </Link>
        </div>

        {/* 댓글 창*/}
        <Comment postId={post.id}/>
    </div>
  )
}

export default Post;