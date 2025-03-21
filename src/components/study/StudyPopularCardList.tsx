import useStudyPopularList from "../../hooks/study/useStudyPopularList";
import StudyCard from "./StudyCard";
import StatusHandler from "../common/ui/StatusHandler";

const StudyPopularCardList = (): JSX.Element => {
    const { studyPopularList, loading, error } = useStudyPopularList();

    // 급상승 게시글: 상위 3개만 표시
    const popularStudy = Array.isArray(studyPopularList) ? studyPopularList.slice(0, 3) : [];

    return (
        <StatusHandler loading={loading} error={error}>
            <div className="grid grid-cols-3 gap-[18px]">
                {popularStudy.map((study, index) => (
                    <StudyCard key={index} study={study} showTechStack={false} />
                ))}
            </div>
        </StatusHandler>
    )
}
export default StudyPopularCardList;