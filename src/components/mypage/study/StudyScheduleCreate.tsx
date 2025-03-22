import { useState } from "react";
import { InputField } from "../../login";
import IconButton from "../../common/ui/IconButton";
import { useParams } from "react-router-dom";
import useApiMutation from "../../../hooks/useApiMutation";

const StudyScheduleCreate = ({ onClose }: { onClose: () => void }): JSX.Element => {
    const { studyId } = useParams<{ studyId: string }>();
    const id = Number(studyId); // 숫자로 변환

    // 일정 등록을 위한 상태 관리
    const [title, setTitle] = useState(''); // 일정 제목 상태
    const [scheduleDate, setScheduleDate] = useState(''); // 일정 날짜 상태
    const [scheduleTime, setScheduleTime] = useState("");
    const [totalTime, setTotalTime] = useState(60);

    // POST API 가져오기
    const { trigger } = useApiMutation();

    // 버튼 클릭 시 실행할 API 요청 함수
    const handleSubmit = async () => { 
        if (!title || !scheduleDate || !scheduleTime) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
    
        const requestData = {
            title,
            startDate: scheduleDate,
            startTime: scheduleTime,
            totalTime,
        };
    
        try {
            await trigger (`http://www.growtogether.store/study/${id}/schedule`, requestData);
            alert("일정이 성공적으로 등록되었습니다.");

            window.location.reload(); // 새로고침
        } catch (error: any) {
            alert("일정 등록 중 오류가 발생했습니다.");
        }
    };


    return (
        <>
            {/* 일정 등록 팝업 */}
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/50 z-[10]">
                <div className="w-[600px] bg-white rounded-[10px]">
                    {/* 상단 타이틀 */}
                    <div className="flex items-center justify-between px-[20px] py-[20px] border-b border-gray5">
                        <strong className="nexon-medium text-lg text-black4">일정 등록</strong>
                        <div className="flex items-center gap-5">
                            <IconButton
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C9.09826 1 10.1375 1.25292 11.0625 1.7037M13.6875 3.625L7.5625 9.75L5.8125 8" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                }
                                label="등록하기"
                                color="green"
                                onClick={ handleSubmit }
                            />
                            <IconButton
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                                        <path d="M0.666748 3.14706H12.0001M4.91675 11.9706V6.67647M7.75008 11.9706V6.67647M9.16675 15.5H3.50008C2.71768 15.5 2.08341 14.7099 2.08341 13.7353V4.02941C2.08341 3.5421 2.40055 3.14706 2.79175 3.14706H9.87508C10.2663 3.14706 10.5834 3.5421 10.5834 4.02941V13.7353C10.5834 14.7099 9.94915 15.5 9.16675 15.5ZM4.91675 3.14706H7.75008C8.14128 3.14706 8.45842 2.75202 8.45842 2.26471V1.38235C8.45842 0.895043 8.14128 0.5 7.75008 0.5H4.91675C4.52555 0.5 4.20841 0.895043 4.20841 1.38235V2.26471C4.20841 2.75202 4.52555 3.14706 4.91675 3.14706Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                }
                                label="닫기"
                                color="gray"
                                onClick={ onClose }
                            />
                        </div>
                    </div>
                    {/* 팝업 내용 */}
                    <div className="px-[20px] py-[20px]">
                        <div className="mb-5">
                            <InputField
                                label="일정 제목"
                                labelFor="nickname"
                                labelClassName="nexon-medium text-[15px] text-black4"
                                type="text"
                                id="scheduleTitle"
                                name="scheduleTitle" 
                                placeholder="일정 제목을 입력해주세요."
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <InputField
                                label="시작시간"
                                labelFor="scheduleStartTime"
                                labelClassName="nexon-medium text-[15px] text-black4"
                                type="text"
                                id="scheduleStartTime"
                                name="scheduleStartTime" 
                                placeholder="일정 시작시간을 입력해주세요."
                                onChange={(e) => setScheduleTime(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <InputField
                                label="진행시간"
                                labelFor="scheduleTotalTime"
                                labelClassName="nexon-medium text-[15px] text-black4"
                                type="text"
                                id="scheduleTotalTime"
                                name="scheduleTotalTime" 
                                placeholder="일정 진행시간을 입력해주세요."
                                onChange={(e) => setTotalTime(Number(e.target.value))}
                            />
                        </div>
                        <input
                            type="date"
                            placeholder="일정 날짜를 선택해주세요."
                            onChange={(e) => setScheduleDate(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default StudyScheduleCreate;