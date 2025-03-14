import TechStackList from "../components/common/ui/TechStackList";
import PostInfo from "../components/common/ui/PostInfo";
import GenericPost from "../components/common/posts/GenericPost";
import { StudyData } from "../types/study";

const StudyPost = ():JSX.Element =>{
  
  return(
    <>
      <GenericPost postType="study" 
        renderContent={(post:StudyData) =>
        (
          <div className="text-[14px] lg:text-[17px] text-nowrap grid grid-rows-3 
            grid-cols-[70px_1fr_60px_1fr_70px_1fr] lg:grid-cols-[90px_1fr_70px_1fr_90_1fr] 
            gap-y-3 gap-x-7 items-center border-b border-gray5 py-5"
          >
          <PostInfo label="스터디 목적" value={`${post.type}`} />
          <PostInfo label="모집 인원" value={`${post.maxSize} 명`} />
          <PostInfo label="모집 마감일" value={post.endDate} />
          <PostInfo label="시작일" value={`${post.startDate}`} />
          <PostInfo label="종료일" value={`${post.endDate}`} />
          <PostInfo label="참여횟수" value={""} />
          <PostInfo label="사용 언어" value={<TechStackList stacks={post.techStack ?? []} />} valueClassName="col-span-5"/>
          </div>
        )}
      >
      </GenericPost>
    </>
  )
};

export default StudyPost;