import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Loading from "../components/common/ui/Loading"
import Post from "../views/Post";
import TechStackList from "../components/common/ui/TechStackList";
import PostInfo from "../components/common/ui/PostInfo";

interface PostData {
  id: number;
  type: string,
  title: string;
  content: string;
  descripition: string;
  maxSize: number;
  bootcampName: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  viewCount: number;
  studyStatus: string;
}

const StudyPost = ():JSX.Element =>{
  const { id } = useParams<{ id?: string }>(); // URL에서 `id` 가져옴
  const [post, setPost] = useState<PostData | null>(null);
    
  useEffect(() => {
    console.log("Fetching data from /study");

    fetch(`/study/${id}`, {
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
      setPost(data); // 응답 데이터를 post 상태로 설정
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
      <Post post={post} postType="study" postTitle={post.title} infoTitle="모집 내용">
          <div className="text-[14px] lg:text-[17px] text-nowrap grid grid-rows-3 grid-cols-[70px_1fr_60px_1fr_70px_1fr] lg:grid-cols-[90px_1fr_70px_1fr_90_1fr] gap-y-3 gap-x-7 items-center border-b border-gray5 py-5">
            <PostInfo label="스터디 목적" value={`${post.type}`} />
            <PostInfo label="모집 인원" value={`${post.maxSize} 명`} />
            <PostInfo label="모집 마감일" value={post.endDate} />
            <PostInfo label="보증금" value={""} />
            <PostInfo label="참여 시간" value={""} />
            <PostInfo label="시작 예정일" value={`${post.startDate}`} />
            <PostInfo label="사용 언어" value={<TechStackList stacks={post.techStack} />} valueClassName="col-span-5"/>
        </div>
      </Post>
    </>
  )
}

export default StudyPost;