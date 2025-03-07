import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Loading from "../components/common/ui/Loading";
import Post from "../views/Post";
import TechStackList from "../components/common/ui/TechStackList";
import PostInfo from "../components/common/ui/PostInfo";
import Rating from "../components/common/ui/Rating";
import { BootcampData } from "../types/bootcamp";

const BootCampPost = ():JSX.Element =>{
  const { id } = useParams<{ id?: string }>(); // URL에서 `id` 가져옴
  const [post, setPost] = useState<BootcampData | null>(null);
    
  useEffect(() => {
    console.log("Fetching data from /bootcamp");

    fetch(`/bootcamp/${id}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    })
    .then((res) => {
      console.log("응답 상태: ", res.status);
      console.log("응답 Content-Type", res.headers.get("Content-Type"));

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("받은 데이터", data);
      setPost(data); 
    })
    .catch((error) => {
      console.error("API 호출 실패: ", error);
      if (error instanceof TypeError && error.message.includes("JSON")) {
        console.error("응답이 JSON이 아닙니다. HTML 응답일 가능성이 높습니다.");
      }
    });
  }, [id]); 

  if(!post){
      return <Loading />
  }
  return(
    <>
      <Post post={post} postType="bootcamp" postTitle={post.title} infoTitle="후기">
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
      </Post>
    </>
  )
};

export default BootCampPost;