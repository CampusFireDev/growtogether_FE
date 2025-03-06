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
    className?: string;
};

const SelectCalendar = ({ label, labelFor, labelClassName="", className}: SelectCalendarProps): JSX.Element =>{
    const [select, setSelect] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
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
        if(!startDate || (startDate && endDate)){
            setStartDate(selectedDate);
            setEndDate(null);
        } else{
            if(selectedDate < startDate){
                setEndDate(startDate);
                setStartDate(selectedDate);
            } else{
                setEndDate(selectedDate);
            }
            setSelect(false);
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

    return(
        <div className={`${className}`}>
            {label && (
                <label htmlFor={labelFor} className={`block mb-2 ${labelClassName}`}>
                    {label}
                </label>
            )}
            <div className="relative w-full h-[50px] pl-[15px] pr-[15px] border border-[#e5e5e5] rounded-[5px] flex items-center" 
                onClick={handleSelect}
            >
                <div className="flex justify-between items-center w-full">
                    <p className="text-nowrap">
                        {startDate ? `${formatDate(startDate)} ~ ${formatDate(endDate)}` : "참여기간을 선택해주세요."}
                    </p>
                    <IoCalendarOutline className="text-black font-bold"/>
                </div>
                
                <div ref={calendarRef} className="absolute top-12 left-0 w-full z-20" >
                    {select && <Calendar className="w-full" onDateSelect={handleDateSelect} startDate={startDate} endDate={endDate}/>}
                </div>
            </div>
        </div>
    )
};

export default SelectCalendar;