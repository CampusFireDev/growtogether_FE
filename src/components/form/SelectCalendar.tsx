/**
 * 날짜 선택 메뉴
 */

import { useState, useEffect, useRef } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import Calendar from "../common/ui/Calendar"

interface SelectCalendarProps {
    label?: string;
    labelFor?: string;
    labelClassName?: string;
    placeholder?: string;
    className?: string;
    singleDate?: boolean; //단일 날짜 선택
    multiDate?: boolean; // 다중 날짜 선택
};
const SelectCalendar = ({ label, labelFor, labelClassName="", placeholder, className, singleDate=false, multiDate=false }: SelectCalendarProps): JSX.Element =>{
    const [select, setSelect] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const calendarRef = useRef<HTMLDivElement | null>(null);

    // 캘린더 외부 클릭 시 닫히게 처리
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setSelect(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleSelect = (e: React.MouseEvent) =>{
        e.stopPropagation();
        setSelect(!select);
    };

    const handleDateSelect = (selectedDate: Date) =>{
        if (singleDate) {
            // 단일 날짜 선택 모드일 경우
            setStartDate(selectedDate);
            setEndDate(null);
            setSelect(false);
        } else if(multiDate) {
            // 다중 날짜 선택 모드일 경우
            if(selectedDates.some(date => date.toDateString() === selectedDate.toDateString())){
                setSelectedDates(prev => prev.filter(date => date.toDateString() !== selectedDate.toDateString()))
            } else {
                setSelectedDates(prev => [...prev, selectedDate]);
            }
        } else {
            // 범위 선택 모드일 경우
            if (!startDate || (startDate && endDate)) {
                setStartDate(selectedDate);
                setEndDate(null);
            } else {
                if (selectedDate < startDate) {
                    setEndDate(startDate);
                    setStartDate(selectedDate);
                } else {
                    setEndDate(selectedDate);
                }
                setSelect(false);
            }
        }
    };

    const formatDate = (date: Date | null) =>{
        if(date){
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate()+1);
            return newDate.toISOString().split("T")[0]; // yyyy-mm-dd 형식
        }
        return "";
    };

    const formatRange = (dates: Date[]): string => {
        if (dates.length > 1) {
          const firstDate = dates[0];
          const lastDate = dates[dates.length - 1];
          return `${formatDate(firstDate)} ~ ${formatDate(lastDate)}`;
        }
        return formatDate(dates[0]);
      };

    const renderDate = () =>{
        if(singleDate && startDate){
            return formatDate(startDate); 
        } else if(multiDate && selectedDates.length > 0){
            return selectedDates.map(date => formatDate(date)).join(", ");
        } else if (startDate && endDate) {
            return formatRange([startDate, endDate]);
        } else if(startDate){
            return formatDate(startDate);
        }
        return placeholder || "";
    };

    return(
        <div className={`mb-3 ${className}`}>
            {label && (
                <label htmlFor={labelFor} className={`block mb-2 ${labelClassName}`}>
                    {label}
                </label>
            )}
            <div className="relative w-full h-[50px] pl-[15px] pr-[15px] border border-[#e5e5e5] rounded-[5px] flex items-center" 
                onClick={handleSelect}
            >
                <div className="flex justify-between items-center gap-5 w-full">
                    <p className="text-nowrap text-[13px]" >{renderDate()}</p>
                    <IoCalendarOutline className="text-black font-bold"/>
                </div>
                
                <div ref={calendarRef} className="absolute top-12 left-0 w-full z-20" >
                    {select && 
                    <Calendar className="w-full" 
                    onDateSelect={handleDateSelect} 
                    startDate={startDate} 
                    endDate={endDate}
                    
                    />}
                </div>
            </div>
        </div>
    )
};

export default SelectCalendar;


