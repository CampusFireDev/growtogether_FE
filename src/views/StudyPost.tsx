import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { useContentType } from "../context/ContentTypeContext";
import { useStudyPost } from "../hooks/study/useStudyPost";
import { StudyData } from "../types/study";
import TechStackList from "../components/common/ui/TechStackList";
import PostInfo from "../components/common/ui/PostInfo";
import GenericPost from "../components/common/posts/GenericPost";

const StudyPost = ():JSX.Element =>{
  const { id } = useParams<{ id: string }>();
  const [studyData, setStudyData] = useState<StudyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setcontentType } = useContentType();

  useEffect(() =>{
    if (!id) return;
    setcontentType("study");

    const loadStudyData = async () => {
      try {
        const data = await useStudyPost(Number(id));
        setStudyData(data);
      } catch (err) {
        setError("Failed to load study data");
      } finally {
        setLoading(false);
      }
    };
    loadStudyData();
  }, [id]);

  if (loading) { return <div>Loading...</div>; }

  if (error) { return <div>{error}</div>; }
  
  if (!studyData) { return <div>No study data available.</div>; }
  
  return(
    <>
      <GenericPost post={studyData} 
        renderContent={(studyData:StudyData) =>
        (
          <div className="text-[14px] lg:text-[16px] text-nowrap grid grid-rows-3 
            grid-cols-[70px_1fr_60px_1fr_70px_1fr] lg:grid-cols-[90px_1fr_70px_1fr_90_1fr] 
            gap-x-7 items-center border-b border-gray5 py-5"
          >
          <PostInfo label="스터디 목적" value={`${studyData.type}`} />
          <PostInfo label="모집 인원" value={`${studyData.maxParticipant} 명`} />
          <PostInfo label="모집 마감일" value={studyData.studyClosingDate} />
          <PostInfo label="시작일" value={`${studyData.studyStartDate}`} />
          <PostInfo label="종료일" value={`${studyData.studyEndDate}`} />
          <PostInfo label="참여횟수" value={`${studyData.studyCount}`} />
          <PostInfo label="사용 언어" value={<TechStackList stacks={studyData.skillNames ?? []} />} valueClassName="col-span-5"/>
          </div>
        )}
      >
      </GenericPost>
    </>
  )
};

export default StudyPost;