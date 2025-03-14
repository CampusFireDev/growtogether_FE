import useStudyNotice from "../../../hooks/mypage/useStudyNotice";
import StudyNotice from "./StudySchedule";

const StudyNoticeList = ({ studyId }: { studyId: number }): JSX.Element => {
    const { noticeList } = useStudyNotice(studyId);

    return (
        <ul className="flex flex-wrap gap-2">
            {noticeList.map((notice) => (
                <StudyNotice key={notice.noticeId} title={notice.title} author={notice.anthor} />
            ))}
        </ul>
    )
}

export default StudyNoticeList;