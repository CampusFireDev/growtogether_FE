import { useState, useEffect } from "react";
import SelectMenu from "../../form/SelectMenu";
import SelectCalendar from "../../form/SelectCalendar";
import SkillMenu from "../../form/SkillMenu";
import CommonSelect from "../ui/CommonSelect";

interface StudyFilterProps {
    onFilterChange: (filters: { studyPurpose?: string; skillNames?: string[]; selectedDates?: string[]; sortBy: string}) => void;
    onSortChange: (sortyBy: string) => void;
    onReset?: () => void;
    onApplyFilters: () => void;
    selectedSort: string;
};

const studyPurposeOptions = [
    { label: "프로젝트", value: "PROJECT" },
    { label: "스터디", value: "STUDY" },
];

const studySelectOptions = [
    { value: "CREATED_AT", label: "최신순" },
    { value: "VIEW_COUNT", label: "조회순" },
    { value: "DEADLINE", label: "모집 임박순" }
];
const StudyFilter = ({ onFilterChange, onSortChange, onReset, onApplyFilters, selectedSort }: StudyFilterProps): JSX.Element => {
    const [studyPurpose, setStudyPurpose] = useState<string | null>(null);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [formData, setFormData] = useState({skillNames: []});

    const handleStudyPurposeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;  
        setStudyPurpose(value);
    };

    const handleDateChange = (dates: string[]) => setSelectedDates(dates);

    useEffect(() => {
        onFilterChange({ 
            studyPurpose: studyPurpose || undefined, 
            skillNames: formData.skillNames,  
            selectedDates, 
            sortBy: selectedSort
        });
    }, [studyPurpose, formData.skillNames, selectedDates, selectedSort]);

    return (
        <div className="fixed flex justify-between items-center gap-4 full-line max-w-[1200px] w-full py-[15px] bg-white nexon-regular">
            <div className="flex w-full justify-center items-center gap-2 text-[11px] sm:text-[15px] text-black4">
                <CommonSelect value={selectedSort} onChange={onSortChange} options={studySelectOptions} className="w-[96px]"/>
                <SelectMenu 
                    className="flex items-center !w-full !min-w-30 !h-[40px] text-[11px] sm:text-[15px]" placeholder="스터디 목적" options={studyPurposeOptions} onChange={handleStudyPurposeChange}>
                </SelectMenu>
                <SkillMenu setFormData={setFormData} formData={formData} navLabel={true}/>
                <SelectCalendar singleDate={true} className2="flex items-center !w-59 lg:!w-160 !h-[40px] px-[12px] text-[11px] sm:text-[15px] text-black4 !m-0"
                    placeholder="참여 기간"onChange={handleDateChange}>
                </SelectCalendar>
            </div>
            <div className="flex items-center gap-2">
                <button className="btn-primary text-white text-[10px] flex justify-center items-center w-17 h-6 cursor-pointer rounded-full bg-black9/90" 
                    onClick={onApplyFilters} 
                >
                    필터 적용
                </button>
                <button className="flex items-center justify-center w-[37px] h-[37px] rounded-[5px] bg-black9 cursor-pointer" onClick={onReset}>
                    <svg fill="currentColor" height="22" viewBox="-1.5 -2.5 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                        <path fill="white" d="m4.859 5.308 1.594-.488a1 1 0 0 1 .585 1.913l-3.825 1.17a1 1 0 0 1-1.249-.665L.794 3.413a1 1 0 1 1 1.913-.585l.44 1.441C5.555.56 10.332-1.035 14.573.703a9.381 9.381 0 0 1 5.38 5.831 1 1 0 1 1-1.905.608A7.381 7.381 0 0 0 4.86 5.308zm12.327 8.195-1.775.443a1 1 0 1 1-.484-1.94l3.643-.909a.997.997 0 0 1 .61-.08 1 1 0 0 1 .84.75l.968 3.88a1 1 0 0 1-1.94.484l-.33-1.322a9.381 9.381 0 0 1-16.384-1.796l-.26-.634a1 1 0 1 1 1.851-.758l.26.633a7.381 7.381 0 0 0 13.001 1.25z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
};

export default StudyFilter;