import { useState } from "react";
import useStudyGetSchedules from "./useStudyGetSchedules";
import { StudyGetScheduleResponse, StudyScheduleByDate } from "../../../types/mypage/study/studyScheduleType";

const useCalendar = (studyId: number) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const formattedDate = `${year}-${String(month).padStart(2, "0")}`;

    // 일정 가져오기
    const { data, loading, error } = useStudyGetSchedules(studyId, formattedDate);
    
    // ✅ 데이터를 날짜 기반으로 매핑하기 쉽게 변환
    const scheduleMap: Map<string, StudyScheduleByDate> = new Map();
    data?.schedules?.forEach((item) => {
        scheduleMap.set(item.date, item);
    });

    // 요일 설정
    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
        new Date(year, 0, i - 2).toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
    );

    const firstDayOfMonth = new Date(year, month - 1, 1);
    const startDay = new Date(firstDayOfMonth);
    startDay.setDate(1 - firstDayOfMonth.getDay());

    const lastDayOfMonth = new Date(year, month, 0);
    const endDay = new Date(lastDayOfMonth);
    endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

    const groupDatesByWeek = (start: Date, end: Date): Date[][] => {
        const weeks: Date[][] = [];
        let currentWeek: Date[] = [];
        let currentDate = new Date(start);

        while (currentDate <= end) {
            currentWeek.push(new Date(currentDate));
            if (currentWeek.length === 7 || currentDate.getDay() === 6) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        if (currentWeek.length > 0) weeks.push(currentWeek);
        return weeks;
    };

    const weeks = groupDatesByWeek(startDay, endDay);

    const goToPreviousMonth = () => setCurrentDate(new Date(year, month - 2, 1));
    const goToNextMonth = () => setCurrentDate(new Date(year, month, 1));
    const goToToday = () => setCurrentDate(new Date());

    return {
        year,
        month,
        daysOfWeek,
        weeks,
        scheduleMap, // ✅ 일정 데이터를 Map 형태로 전달
        loading,
        error,
        goToPreviousMonth,
        goToNextMonth,
        goToToday,
    };
};

export default useCalendar;
