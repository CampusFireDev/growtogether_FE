import useStudyGetSchedule from "../../../hooks/mypage/study/useStudyGetSchedule";
import StudySchedule from "./StudySchedule";

const StudyNoticeList = ({ studyId, date }: { studyId: number, date: string }): JSX.Element => {
    const { data } = useStudyGetSchedule(studyId, date);

    if (!Array.isArray(data) || data.length === 0) return <p>해당 날짜에 일정이 없습니다.</p>;

    return (
        <ul className="flex flex-wrap gap-2">
            {data.map((item) => (
                <StudySchedule 
                    key={item.scheduleId}
                    scheduleId={item.scheduleId}
                    title={item.title}
                    start={item.start}
                    totalTime={item.totalTime}
                    author={item.author}
                />
            ))}
        </ul>
    )
}

export default StudyNoticeList;