import useStudyList from "../../hooks/study/useStudyList";
import StudyCard from "./StudyCard";

const StudyPopularCardList = (): JSX.Element => {
    const { studyList, loading, error } = useStudyList();

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div className="text-red-500">⚠️ 데이터 불러오기 실패: {error}</div>;
    }

    // 급상승 게시글: 상위 3개만 표시
    const popularStudies = studyList.slice(0, 3);

    return (
        <div className="grid grid-cols-3 gap-[18px]">
            {popularStudies.map((study, index) => (
                <StudyCard key={index} study={study} showTechStack={false} />
            ))}
        </div>
    )
}
export default StudyPopularCardList;