import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { IoEyeOutline } from "react-icons/io5";
import FormButton from "../components/form/FormButton";
import StudyTypeBadge from "../components/common/ui/StudyTypeBadge";
import TechStackList from "../components/common/ui/TechStackList";
import PostInfo from "../components/common/ui/PostInfo";
import Rating from "../components/common/ui/Rating";
import Loading from "../components/common/ui/Loading"
import LikeBtn from "../components/common/ui/LikeBtn";
import Comment from "../components/common/ui/Comment";

interface PostData {
    id: number;
    type: string,
    title: string;
    content: string;
    programCourse: string;
    bootcampName: string;
    bootcampStartDate: string;
    bootcampEndDate: string;
    learningLanguage: string[];
    programSatisfaction: number;
    learningLevel: number;
    assistantSatisfaction: number;
}

const Post = ():JSX.Element =>{
    const { id } = useParams<{ id?: string }>(); // URL에서 `id` 가져옴
    const [post, setPost] = useState<PostData | null>(null);
    
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
        <div className="w-full w-max-[1200px]">  
            <StudyTypeBadge type={post.type}/>
            <h2 className="nexon-bold text-[20px]">{post.bootcampName}</h2>
            <div className="border-y border-gray5 flex items-center justify-between">    
                <div className="flex items-center gap-2 text-black4 text-[13px] text-nowrap py-3">
                    <img src="/images/profile.png" alt="" className="w-6 h-6"/>
                    <span className="nexon-medium">닉네임 | 작성일</span>
                    <span>2025.02.03</span>
                </div>
                <div className="flex text-black6 items-center gap-1 ">
                    <IoEyeOutline className="w-4 h-4" />
                    <p className="text-[11px]">253</p>
                </div>
            </div>

            <div className="text-[14px] lg:text-[17px] text-nowrap grid grid-cols-2 gap-x-15 border-b border-gray5 py-5">
                {/* 왼쪽 열 */}
                <div className="flex flex-col gap-4 ">
                    <PostInfo label="참여기간" value={`${post.bootcampStartDate} ~ ${post.bootcampEndDate}`} labelWidth="90px" labelMaxWidth="100px" />
                    <PostInfo label="프로그램 과정" value={post.programCourse} labelWidth="90px" labelMaxWidth="100px" />
                    <PostInfo label="학습 언어" value={<TechStackList stacks={post.learningLanguage}/>} labelWidth="90px" labelMaxWidth="100px"/>
                </div>

                {/* 오른쪽 열 */}
                <div className="flex flex-col gap-4 ">
                    <PostInfo label="강의 만족도" value={<Rating rate={post.programSatisfaction}/>} labelWidth="100px" labelMaxWidth="120px"/>
                    <PostInfo label="취업 지원 만족도" value={<Rating rate={post.assistantSatisfaction}/>} labelWidth="100px" labelMaxWidth="120px"/>
                    <PostInfo label="학습 난이도" value={<Rating rate={post.learningLevel}/>} labelWidth="100px" labelMaxWidth="120px"/>
                </div>
            </div>

            {/* 후기 */}
            <div className="border-b border-gray5 py-5">
                <p className="nexon-bold text-black4 text-[14px] lg:text-[17px] mb-3">후기</p>
                <p className="nexon-bold text-[14px] lg:text-[17px] ">{post.title}</p>
                <p className="text-[13px] lg:text-[15px] my-2">{post.content}</p>
            </div>

            {/* 좋아요, 목록 */}
            <div className="flex justify-center items-center gap-3 my-5">
                <LikeBtn likeCount={60}/>
                <FormButton type="button" className="!w-[80px] !h-[50px] !flex !items-center !justify-center">목록</FormButton>
            </div>
            <Comment />
        </div>
    )
}

export default Post;