import useStudyGetSchedule from "../../../hooks/mypage/study/useStudyGetSchedule";
import StudySchedule from "./StudySchedule";

const StudyNoticeList = ({ studyId, date }: { studyId: number, date: string }): JSX.Element => {
    const { data } = useStudyGetSchedule(studyId, date);

    if (!Array.isArray(data) || data.length === 0) return <p>해당 날짜에 일정이 없습니다.</p>;

    return (
        <ul className="flex flex-wrap gap-2">
            {data.map((item, index) => (
                <StudySchedule key={index} title={item.title} author={item.author} scheduleId={item.scheduleId} />
            ))}
        </ul>
    )
}

export default StudyNoticeList;