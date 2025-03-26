/**
 * 날짜 선택 메뉴
 */

import { useState, useEffect, useRef } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import Calendar from "../common/ui/Calendar"

interface SelectCalendarProps {
    type?: string;
    label?: string;
    labelFor?: string;
    labelClassName?: string;
    placeholder?: string;
    className?: string;
    className2?: string;
    singleDate?: boolean; //단일 날짜 선택
    multiDate?: boolean; // 다중 날짜 선택
    onChange?: (selectedDates: string[]) => void;
};
const SelectCalendar = ({ type, label, labelFor, labelClassName="", placeholder, className, className2, singleDate=false, multiDate=false, onChange }: SelectCalendarProps): JSX.Element =>{
    const [select, setSelect] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const calendarRef = useRef<HTMLDivElement | null>(null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 오늘 + 90일 후 날짜 
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 90);

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

    const handleDateSelect = (selectedDate: Date) => {
        if (selectedDate > maxDate) {
            alert("선택할 수 있는 날짜는 오늘로부터 90일 이내입니다.");
            return;
        }
        
        if (singleDate) {
            // 단일 날짜 선택 모드일 경우
            setStartDate(selectedDate);
            setEndDate(null);
            setSelect(false);
            // 상태 업데이트 후 onChange 호출
            onChange && onChange([formatDate(selectedDate)]);
        } else if (multiDate) {
            // 다중 날짜 선택 모드일 경우
            const isSelected = selectedDates.some(date => date.toDateString() === selectedDate.toDateString());
            let updatedSelectedDates;
            
            if (isSelected) {
                updatedSelectedDates = selectedDates.filter(date => date.toDateString() !== selectedDate.toDateString());
            } else {
                updatedSelectedDates = [...selectedDates, selectedDate];
            }
            
            setSelectedDates(updatedSelectedDates); 
            const formattedDates = updatedSelectedDates.map(date => formatDate(date));
            onChange && onChange(formattedDates);
        } else {
            // 범위 선택 모드일 경우
            if (!startDate || (startDate && endDate)) {
                setStartDate(selectedDate);
                setEndDate(null);
            } else {
                const newStart = selectedDate < startDate ? selectedDate : startDate;
                const newEnd = selectedDate < startDate ? startDate : selectedDate;
    
                setStartDate(newStart);
                setEndDate(newEnd);
                setSelect(false);
    
                onChange && onChange([formatDate(newStart), formatDate(newEnd)]);
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
            const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());
            const firstDate = sortedDates[0];
            const lastDate = sortedDates[dates.length - 1];
            return `${formatDate(firstDate)} ~ ${formatDate(lastDate)}`;
        }
        return formatDate(dates[0]);
      };

    const renderDate = () =>{
        if(singleDate && startDate){
            return formatDate(startDate); 
        } else if(multiDate && selectedDates.length > 0){
            return formatRange(selectedDates);
        } else if (startDate && endDate) {
            return formatRange([startDate, endDate]);
        } else if(startDate){
            return formatDate(startDate);
        }
        return placeholder || "";
    };

    return(
        <div className={`text-[13px] ${className}`}>
            {label && (
                <label htmlFor={labelFor} className={`block mb-2 ${labelClassName}`}>
                    {label}
                </label>
            )}
            <div className={`relative w-full h-[50px] pl-[15px] pr-[15px] border border-gray5
                rounded-[5px] flex items-center ${className2}`} onClick={handleSelect}
            >
                <div className="flex justify-between items-center gap-5 w-full">
                    <p className="text-nowrap" >{renderDate()}</p>
                    <IoCalendarOutline className="text-black font-bold"/>
                </div>
                
                <div ref={calendarRef} className="absolute top-12 left-0 w-full z-20" >
                    {select && 
                    <Calendar type={type} className="w-full" 
                        startDate={startDate} 
                        endDate={endDate}
                        selectedDates={selectedDates}
                        onDateSelect={handleDateSelect} 
                    />}
                </div>
            </div>
            {multiDate && 
            <div className="my-2 flex"> 
                총&nbsp;<p className="text-myBlue nexon-medium">{selectedDates.length}</p>번:&nbsp;
                <div>{` ${selectedDates.map(date => formatDate(date)).join(", ")}`}</div>
            </div>}
                
        </div>
    )
};

export default SelectCalendar;


