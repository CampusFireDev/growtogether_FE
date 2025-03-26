import { useState } from "react";
import useCalendar from "../../../hooks/mypage/study/useCalendar";
import StudyCalendarHeader from "./calendar/StudyCalendarHeader";
import StudyCalendarGrid from "./calendar/StudyCalendarGrid";
import { useParams } from "react-router-dom";
import StudyScheduleCreate from "./StudyScheduleCreate";

interface StudyCalendarProps {
    onDataSelect: (date: string) => void;
}

const StudyCalendar = ({ onDataSelect }: StudyCalendarProps) => {
    const { studyId } = useParams(); // URL에서 studyId 가져오기
    const studyIdNumber = studyId ? parseInt(studyId, 10) : 0;

    const { year, month, daysOfWeek, weeks, scheduleMap, goToPreviousMonth, goToNextMonth, goToToday } = useCalendar(studyIdNumber);
    
    const [ isPopupOpen, setIsPopupOpen ] = useState(false); // 팝업 상태 관리
    const [ isChatOpen, setIsChatOpen ] = useState(false);
    console.log(isChatOpen);

    const handleOpenChat = () => setIsChatOpen(true);

    return (
        <div>
            <StudyCalendarHeader
                onPrev={goToPreviousMonth} 
                onNext={goToNextMonth} 
                onToday={goToToday} 
                onOpenPopup={() => setIsPopupOpen(true)} 
                onOpenChat={handleOpenChat}
                year={year} 
                month={month} 
            />

            {isPopupOpen && <StudyScheduleCreate onClose={() => setIsPopupOpen(false)} />}

            {/* ✅ scheduleMap을 StudyCalendarGrid에 전달 */}
            <StudyCalendarGrid weeks={weeks} daysOfWeek={daysOfWeek} scheduleMap={scheduleMap} month={month} onClickDate={(dateStr: string) => onDataSelect(dateStr)}/>
        </div>
    );
};

export default StudyCalendar;