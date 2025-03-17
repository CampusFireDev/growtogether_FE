import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // 
import TechStackList from "../components/common/ui/TechStackList";
import PostInfo from "../components/common/ui/PostInfo";
import Rating from "../components/common/ui/Rating";
import GenericPost from "../components/common/posts/GenericPost";
import { BootcampData } from "../types/bootcamp";
import { useBootcampPost } from "../hooks/bootcamp/useBootcampPost";

const BootCampPost = ():JSX.Element =>{
  const { id } = useParams<{ id: string }>();
  const [bootcampData, setBootcampData] = useState<BootcampData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; 

    const loadBootcampData = async () => {
      try {
        const data = await useBootcampPost(Number(id)); 
        setBootcampData(data);
      } catch (err) {
        setError("Failed to load bootcamp data.");
      } finally {
        setLoading(false);
      }
    };

    loadBootcampData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (!bootcampData) {
    return <div>No bootcamp data available.</div>; 
  }
  
  return(
    <>
      <GenericPost postType="bootcamp" post={bootcampData}
        renderContent={(bootcampData: BootcampData) =>
        (
            <div className="text-[14px] lg:text-[17px] text-nowrap grid grid-rows-3 
              grid-cols-[70px_1fr_90px_1fr] lg:grid-cols-[90px_1fr_110px_1fr] 
              items-center border-b border-gray5 py-5 gap-y-3 gap-x-7"
            >
              <PostInfo label="참여기간" value={`${bootcampData.startdate} ~ ${bootcampData.enddate}`} />
              <PostInfo label="강의 만족도" value={<Rating rate={bootcampData.programSatisfaction ?? 0} readOnly={true}/>} />
              <PostInfo label="프로그램 과정" value={bootcampData.programCourse} />
              <PostInfo label="취업 지원 만족도" value={<Rating rate={bootcampData.assistantSatisfaction ?? 0} readOnly={true}/>} />
              <PostInfo label="학습 언어" value={<TechStackList stacks={bootcampData.skillNames ?? []} />} />
              <PostInfo label="학습 난이도" value={<Rating rate={bootcampData.learningLevel ?? 0} readOnly={true}/>} />
            </div>
        )}
      >
      </GenericPost>
    </>
  )
};

export default BootCampPost;


// import { useParams } from "react-router-dom"; 
// import TechStackList from "../components/common/ui/TechStackList";
// import PostInfo from "../components/common/ui/PostInfo";
// import Rating from "../components/common/ui/Rating";
// import GenericPost from "../components/common/posts/GenericPost";
// import { BootcampData } from "../types/bootcamp";
// import { useBootcampPost } from "../hooks/bootcamp/useBootcampPost";

// const BootCampPost = (): JSX.Element => {
//   const { id } = useParams<{ id: string }>();

//   const { bootcampData, loading, error } = useBootcampPost(Number(id)); // ✅ 훅을 최상단에서 호출

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!bootcampData) {
//     return <div>No bootcamp data available.</div>;
//   }

//   return (
//     <>
//       <GenericPost postType="bootcamp" post={bootcampData}
//         renderContent={(bootcampData: BootcampData) =>
//         (
//           <div className="text-[14px] lg:text-[17px] text-nowrap grid grid-rows-3 
//             grid-cols-[70px_1fr_90px_1fr] lg:grid-cols-[90px_1fr_110px_1fr] 
//             items-center border-b border-gray5 py-5 gap-y-3 gap-x-7"
//           >
//             <PostInfo label="참여기간" value={`${bootcampData.startdate} ~ ${bootcampData.enddate}`} />
//             <PostInfo label="강의 만족도" value={<Rating rate={bootcampData.programSatisfaction ?? 0} readOnly={true}/>} />
//             <PostInfo label="프로그램 과정" value={bootcampData.programCourse} />
//             <PostInfo label="취업 지원 만족도" value={<Rating rate={bootcampData.assistantSatisfaction ?? 0} readOnly={true}/>} />
//             <PostInfo label="학습 언어" value={<TechStackList stacks={bootcampData.skillNames ?? []} />} />
//             <PostInfo label="학습 난이도" value={<Rating rate={bootcampData.learningLevel ?? 0} readOnly={true}/>} />
//           </div>
//         )}
//       />
//     </>
//   );
// };

// export default BootCampPost;
