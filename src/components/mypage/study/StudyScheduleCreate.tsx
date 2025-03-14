import { useState } from "react";
import { InputField } from "../../login";
import axios from "axios";

const StudyScheduleCreate = ({ studyId = 1, onClose }: { studyId?: number; onClose: () => void }): JSX.Element => {
    const [title, setTitle] = useState(''); // 일정 제목 상태
    const [scheduleDate, setScheduleDate] = useState(''); // 일정 날짜 상태

    // POST 요청
    const handleSubmit = async () => {
        
        // 일정 제목, 날짜 입력 안했을 때
        if (!title || !scheduleDate) {
            alert("일정과 제목을 입력하세요.");
            return;
        }

        const newSchedule = {
            studyId,
            title,
            startDate: scheduleDate,
            author: "홍길동"
        };

        try {
            const response = await axios.post(`http://www.growtogether.store/api/${studyId}/schedule`, newSchedule);
            console.log("일정 등록 성공: ", response.data);
            alert('일정이 등록되었습니다.');

            onClose(); // 등록 후 팝업 닫기
        } catch (error) {
            console.log("일정 등록 실패: ", error);
            alert('일정 등록에 실패했습니다.')
        }
    }


    return (
        <>
            {/* 일정 등록 팝업 */}
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/50 z-[10]">
                <div className="w-[600px] bg-white rounded-[10px]">
                    {/* 상단 타이틀 */}
                    <div className="flex items-center justify-between px-[20px] py-[20px] border-b border-gray5">
                        <strong className="nexon-medium text-lg text-black4">일정 등록</strong>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1 text-sm text-black6" onClick={handleSubmit}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                                    <path d="M0.666748 3.14706H12.0001M4.91675 11.9706V6.67647M7.75008 11.9706V6.67647M9.16675 15.5H3.50008C2.71768 15.5 2.08341 14.7099 2.08341 13.7353V4.02941C2.08341 3.5421 2.40055 3.14706 2.79175 3.14706H9.87508C10.2663 3.14706 10.5834 3.5421 10.5834 4.02941V13.7353C10.5834 14.7099 9.94915 15.5 9.16675 15.5ZM4.91675 3.14706H7.75008C8.14128 3.14706 8.45842 2.75202 8.45842 2.26471V1.38235C8.45842 0.895043 8.14128 0.5 7.75008 0.5H4.91675C4.52555 0.5 4.20841 0.895043 4.20841 1.38235V2.26471C4.20841 2.75202 4.52555 3.14706 4.91675 3.14706Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                등록하기
                            </button>
                            <button className="flex items-center gap-1 text-sm text-black6" onClick={ onClose }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                                    <path d="M0.666748 3.14706H12.0001M4.91675 11.9706V6.67647M7.75008 11.9706V6.67647M9.16675 15.5H3.50008C2.71768 15.5 2.08341 14.7099 2.08341 13.7353V4.02941C2.08341 3.5421 2.40055 3.14706 2.79175 3.14706H9.87508C10.2663 3.14706 10.5834 3.5421 10.5834 4.02941V13.7353C10.5834 14.7099 9.94915 15.5 9.16675 15.5ZM4.91675 3.14706H7.75008C8.14128 3.14706 8.45842 2.75202 8.45842 2.26471V1.38235C8.45842 0.895043 8.14128 0.5 7.75008 0.5H4.91675C4.52555 0.5 4.20841 0.895043 4.20841 1.38235V2.26471C4.20841 2.75202 4.52555 3.14706 4.91675 3.14706Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                닫기
                            </button>
                        </div>
                    </div>
                    {/* 팝업 내용 */}
                    <div className="px-[20px] py-[20px]">
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