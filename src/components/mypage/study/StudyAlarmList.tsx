import useStudyJoin from "../../../hooks/mypage/useStudyJoin";
import IconButton from "../../common/ui/IconButton";

const StudyAlarmList = ({ studyId }: { studyId: number }): JSX.Element => {
    const { applications, loading, error } = useStudyJoin(studyId);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p className="text-red-500">에러 발생: {error}</p>;

    return (
        <div>
            {applications.length === 0 ? (
                <ul className="hidden"></ul>
            ) : (
                <ul className="border-t border-gray5">
                    {applications.map((notice) => (
                        <li key={notice.studyMemberId} className="flex items-center justify-between px-[20px] py-[20px] bg-white9 border-b border-gray5">
                            <div className="flex items-center gap-3">
                                <div className="w-[32px] h-[32px] rounded-full bg-gray5 overflow-hidden"></div>
                                <p className="text-black4">
                                    <span className="text-myBlue nexon-medium">{notice.nickName}</span>
                                    님이 참가 요청을 보냈습니다.
                                </p>
                            </div>
                            <div className="flex items-center gap-5">
                                <IconButton
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                            <path d="M12.9998 16.034L13 13.3964C13.0001 11.9395 11.8488 10.7584 10.4285 10.7584H3.57177C2.15169 10.7584 1.00045 11.9392 1.00029 13.3959L1 16.034M9.57159 4.6036C9.57159 6.0604 8.4203 7.24137 7.00011 7.24137C5.57993 7.24137 4.42864 6.0604 4.42864 4.6036C4.42864 3.14679 5.57993 1.96582 7.00011 1.96582C8.4203 1.96582 9.57159 3.14679 9.57159 4.6036Z" stroke="#666666" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    }
                                    label="프로필 보기"
                                    color="gray"
                                />
                                <IconButton
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C9.09826 1 10.1375 1.25292 11.0625 1.7037M13.6875 3.625L7.5625 9.75L5.8125 8" stroke="#34A853" stroke-width="2" strokeLinecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    }
                                    label="수락하기"
                                    color="green"
                                />
                                <IconButton
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                                            <path d="M12 1.5L1 12.5M12 12.5L1 1.5" stroke="#E8463B" stroke-width="2" strokeLinecap="round"/>
                                        </svg>
                                    }
                                    label="거절하기"
                                    color="red"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default StudyAlarmList;