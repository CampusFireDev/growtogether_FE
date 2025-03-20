import useStudyPopularList from "../../hooks/study/useStudyPopularList";
import StudyCard from "./StudyCard";
import Loading from "../common/ui/Loading";

const StudyPopularCardList = (): JSX.Element => {
    const { studyPopularList, loading, error } = useStudyPopularList();

    if (loading) {
        return <div><Loading/></div>;
    }

    if (error) {
        return <div className="text-red-500">⚠️ 데이터 불러오기 실패: {error}</div>;
    }

    // 급상승 게시글: 상위 3개만 표시
    // const popularStudies = studyList.slice(0, 3);
    const popularStudy = Array.isArray(studyPopularList) ? studyPopularList.slice(0, 3) : [];

    return (
        <div className="grid grid-cols-3 gap-[18px]">
            {popularStudy.map((study, index) => (
                <StudyCard key={index} study={study} showTechStack={false} />
            ))}
        </div>
    )
}
export default StudyPopularCardList;