import { useState } from "react";
import ButtonStyle1 from "../../common/ui/ButtonStyle1";
import useStudyNotice from "../../../hooks/mypage/useStudyNotice";
import StudyScheduleCreate from "./StudyScheduleCreate";

const StudyCalendar = ({ studyId }: { studyId: number }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태 관리
    
    // 공지사항 불러오기
    const { noticeList } = useStudyNotice(studyId); 

    const year = currentDate.getFullYear(); // 현재 년 가져오기
    const month = currentDate.getMonth(); // 현재 달 가져오기
    // 요일 가져오기
    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
        new Date(year, 0, i - 2).toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
    );

    // 첫 날과 마지막 날 찾기
    const firstDayOfMonth = new Date(year, month, 1); // 현재 달의 첫 날

    // 달력 시작 날짜를 현재 달의 첫 날의 주의 일요일로 설정
    const startDay = new Date(firstDayOfMonth);
    startDay.setDate(1 - firstDayOfMonth.getDay());

    // 현재 달의 마지막 날
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // 달력 끝 날짜를 현재 달의 마지막 날의 주의 토요일로 설정
    const endDay = new Date(lastDayOfMonth);
    endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

    const groupDatesByWeek = (startDay: Date, endDay: Date): Date[][] => {
        const weeks: Date[][] = []; // 주 단위로 그룹화 된 날짜 배열들을 저장할 배열
        let currentWeek: Date[] = []; // 현재 처리 중인 주를 나타내는 배열
        let currentDate = new Date(startDay);

        // 시작 날짜부터 끝 날짜까지 반복
        while (currentDate <= endDay) {
            currentWeek.push(new Date(currentDate)); // 현재 날짜를 현재 주에 추가
            // 현재 주가 7일을 모두 채웠거나 현재 날짜가 토요일인 경우
            if (currentWeek.length === 7 || currentDate.getDay() === 6) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
            currentDate.setDate(currentDate.getDate() + 1); // 현재 날짜를 다음 날로 변경
        }

        // 마지막 주 처리
        if (currentWeek.length > 0) {
            weeks.push(currentWeek); // 남아 있는 날짜가 있다면 마지막 주로 추가
        }

        return weeks;
    }

    const weeks = groupDatesByWeek(startDay, endDay);    

    // 이전 달로 이동
    const goToPreviousMonth = () => setCurrentDate(new Date(year, month - 1, 1));

    // 다음 달로 이동
    const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    // 오늘 날짜 가져오기
    const today = new Date().toDateString();
    const goToToday = () => setCurrentDate(new Date(today));

    // 팝업 열기 함수
    const openPopup = () => setIsPopupOpen(true);

    // 팝업 닫기 함수
    const closePopup = () => setIsPopupOpen(false);

    return (
        <div>
            <div className="relative flex items-center justify-between py-[30px] px-[30px]">
                <div className="flex items-center gap-2">
                    <ButtonStyle1
                        className="bg-black6 text-white"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M5.625 7.37595V7.3125M9 7.37595V7.3125M12.375 7.37595V7.3125M10.8342 12.2283L9 15.75L7.3125 12.2283H3.9375C3.00552 12.2283 2.25 11.4727 2.25 10.5408V3.9375C2.25 3.00552 3.00552 2.25 3.9375 2.25H14.0625C14.9945 2.25 15.75 3.00552 15.75 3.9375V10.5408C15.75 11.4727 14.9945 12.2283 14.0625 12.2283H10.8342Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        }
                        label="채팅방 입장"
                    />
                    <ButtonStyle1
                        className="bg-myGreen text-white"
                        label="일정 등록"
                        onClick={openPopup}
                    />
                    { isPopupOpen && <StudyScheduleCreate onClose={closePopup} /> }
                </div>
                {/* 캘린더 버튼 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-5 z-[-1]">
                    <button onClick={goToPreviousMonth} className="flex items-center justify-center w-[40px] h-[40px] text-[0px] border border-gray5 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.33333 -0.000976562L0 5.49899L0.000119766 5.49911L4.74146e-05 5.49918L5.33338 10.9991L6.00005 10.3117L1.33326 5.49906L6 0.686519L5.33333 -0.000976562Z" fill="#444444"/>
                        </svg>
                        이전 달로 이동
                    </button>
                    <strong className="nexon-bold text-2xl text-black4">
                        {year}년 {month}월
                    </strong>
                    <button onClick={goToNextMonth} className="flex items-center justify-center w-[40px] h-[40px] text-[0px] border border-gray5 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.666667 -0.000976562L6 5.49899L5.99988 5.49911L5.99995 5.49918L0.66662 10.9991L-4.71489e-05 10.3117L4.66674 5.49906L7.0936e-08 0.686519L0.666667 -0.000976562Z" fill="#444444"/>
                        </svg>
                        다음 달로 이동
                    </button>
                </div>
                <div>
                    <button onClick={goToToday} className="nexon-medium h-[40px] px-[20px] text-sm text-black4 border border-gray5 rounded-[50px]">Today</button>
                </div>
            </div>

            {/* 캘린더 날짜 영역 */}
            <div className="grid grid-cols-7 border-b border-t border-gray5">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="contents">
                        {week.map((date, index) => {

                            return (
                                <div key={index} 
                                    className={`relative h-43 p-[10px] text-sm border-gray5 ${index !== 0 ? "border-l" : ""} ${weekIndex !== 0 ? "border-t" : ""} ${weekIndex === 0 ? "pt-9" : ""} `}
                                >
                                    {/* 첫 번째 주에만 요일 표시 */}
                                    {weekIndex === 0 && (
                                        <div className="absolute top-0 left-0 w-full pt-[12px] pb-[6px] text-xs text-gray-500 text-center ">
                                            {daysOfWeek[index]}
                                        </div>
                                    )}

                                    {/* 날짜 숫자 */}
                                    <div className="nexon-medium text-black4 text-center">
                                        {date.getDate()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default StudyCalendar;