import { StudyScheduleByDate } from "../../../../types/mypage/study/studyScheduleType";

interface StudyCalendarGridProps {
    weeks: Date[][];
    daysOfWeek: string[];
    scheduleMap: Map<string, StudyScheduleByDate>;
    onClickDate?: (dateStr: string) => void;
}

const StudyCalendarGrid = ({ weeks, daysOfWeek, scheduleMap, onClickDate }: StudyCalendarGridProps) => {
    return (
        <div className="grid grid-cols-7 border-b border-t border-gray5">
            {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="contents">
                    {week.map((date, index) => {
                        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
                        const scheduleForDay = scheduleMap.get(formattedDate)?.schedule || [];

                        return (
                            <div key={index} onClick={() => onClickDate?.(formattedDate)} className={`relative h-43 p-[10px] text-sm border-gray5 ${index !== 0 ? "border-l" : ""} ${weekIndex !== 0 ? "border-t" : ""} ${weekIndex === 0 ? "pt-9" : ""} `}>
                                {weekIndex === 0 && (
                                    <div className="absolute top-0 left-0 w-full pt-[12px] pb-[6px] text-xs text-gray-500 text-center">
                                        {daysOfWeek[index]}
                                    </div>
                                )}

                                <div className="nexon-medium text-black4 text-center">{date.getDate()}</div>

                                {/* 📌 일정 데이터 표시 */}
                                {scheduleForDay.slice(0, 3).map((schedule: StudyScheduleByDate["schedule"][0], idx: number) => (
                                    <div key={idx} className="mt-1 p-1 text-xs bg-blue-100 text-blue-700 rounded">
                                        {schedule.title}
                                    </div>
                                ))}
                                {scheduleForDay.length > 3 && (
                                    <p className="mt-1 p-1 text-xs text-black9">+{scheduleForDay.length}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default StudyCalendarGrid;
