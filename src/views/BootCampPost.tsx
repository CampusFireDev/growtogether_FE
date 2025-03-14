import TechStackList from "../components/common/ui/TechStackList";
import PostInfo from "../components/common/ui/PostInfo";
import Rating from "../components/common/ui/Rating";
import GenericPost from "../components/common/posts/GenericPost";
import { BootcampData } from "../types/bootcamp";

const BootCampPost = ():JSX.Element =>{
  
  return(
    <>
      <GenericPost postType="bootcamp" 
        renderContent={(post:BootcampData) =>
        (
            <div className="text-[14px] lg:text-[17px] text-nowrap grid grid-rows-3 
              grid-cols-[70px_1fr_90px_1fr] lg:grid-cols-[90px_1fr_110px_1fr] 
              items-center border-b border-gray5 py-5 gap-y-3 gap-x-7"
            >
              <PostInfo label="참여기간" value={`${post.bootcampStartDate} ~ ${post.bootcampEndDate}`} />
              <PostInfo label="강의 만족도" value={<Rating rate={post.programSatisfaction ?? 0} readOnly={true}/>} />
              <PostInfo label="프로그램 과정" value={post.programCourse} />
              <PostInfo label="취업 지원 만족도" value={<Rating rate={post.assistantSatisfaction ?? 0} readOnly={true}/>} />
              <PostInfo label="학습 언어" value={<TechStackList stacks={post.techStack ?? []} />} />
              <PostInfo label="학습 난이도" value={<Rating rate={post.learningLevel ?? 0} readOnly={true}/>} />
            </div>
        )}
      >
      </GenericPost>
    </>
  )
};

export default BootCampPost;