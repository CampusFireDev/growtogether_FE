/**
 * 달력 컴포넌트
 */ 

import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CalendarProps {
    startDate?: Date | null;
    endDate?: Date | null;
    selectedDates?: Date[];
    onDateSelect?: (date: Date) => void;
    className?:string;
};

const date = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const Calendar = ({ startDate, endDate, selectedDates, onDateSelect, className }:CalendarProps):JSX.Element =>{
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [hoveredDate, setHoveredDate] = useState<number | null>(null);
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth+1, 0).getDate();

    const handleDateClick = (day: number) => {
        if (onDateSelect) {
            onDateSelect(new Date(currentYear, currentMonth, day)); 
        }
    };

    const prevMonth = (e:React.MouseEvent) =>{
        e.stopPropagation();
        setCurrentMonth((prev) => (prev === 0 ? 11: prev - 1));
        if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
    };
    const nextMonth = (e:React.MouseEvent) => {
        e.stopPropagation();
        setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
        if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
    };

    const handleMouseEnter = (day: number) => {
        setHoveredDate(day);
    };

    const handleMouseLeave = () => {
        setHoveredDate(null);
    };

    const generateCalendar = () =>{
        const days = [];
        for (let i = 0; i < firstDay; i++){
            days.push(<div key={`empty-${i}`} className=""></div>);
        };

        for (let i = 1; i <= lastDate; i++) {
            const dateObj = new Date(currentYear, currentMonth, i);
            const isToday = i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
            const isSunday = dateObj.getDay() === 0;
            const isStart = startDate && dateObj.toDateString() === startDate.toDateString();
            const isEnd = endDate && dateObj.toDateString() === endDate.toDateString();
            const isSelected = selectedDates?.some(date => date.toDateString() === dateObj.toDateString());
            const hoverStyle = hoveredDate === i ? "bg-gray5 rounded-full" : "";
            const textColor = isStart || isEnd || isSelected ? "text-white" : "text-black4";
            const bgColor = isStart || isEnd || isSelected ? "bg-myBlue rounded-full" : "";
            const sundayColor = isSunday && !isStart && !isEnd ? "text-red-500" : "";
            
            days.push(
                <div key={i} className={`flex justify-center items-center cursor-pointer lg:h-15 lg:w-16 px-2 py-1
                    ${hoverStyle} ${bgColor} ${textColor} ${sundayColor} ${isToday?"border-2 border-myBlue rounded-full": ""}`} 
                    onClick={() => handleDateClick(i)} onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave}
                    >
                    {i}
                </div>
            );
        };
        return days;
    };

    return(
        <div className={`${className} mx-auto border-2 border-gray5 rounded-[5px] drop-shadow-lg bg-white py-6 px-2 flex flex-col items-center`}>
            <div className="flex justify-center items-center">
                <button onClick={prevMonth} className="p-2 text-black6"><IoIosArrowBack /></button>
                <h2 className="nexon-medium text-black3 mx-5 text-[14px]">{`${currentYear}년 ${currentMonth+1}월`}</h2>
                <button onClick={nextMonth} className="p-2 text-black6"><IoIosArrowForward /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 py-3 text-[12px] lg:text-[14px]">
                {
                    date.map((d)=>(
                        <div key={d} className={`flex justify-center items-center lg:h-15 lg:w-16 ${d === "Su" ? "text-red-500" : "text-black8"}`}>{d}</div>
                    ))
                }
                {generateCalendar()}
            </div>
        </div>
    );
};

export default Calendar;