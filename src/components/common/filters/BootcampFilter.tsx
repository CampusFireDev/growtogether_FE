import { useEffect } from "react";
import SkillMenu from "../../form/SkillMenu";
import SelectMenu from "../../form/SelectMenu";
import useBootcampProgramCourse from "../../../hooks/bootcamp/useBootcampProgramCourse";
import CommonSelect from "../ui/CommonSelect";

interface BootcampFilterProps {
    onFilterChange: (filters: { programCourse?: string; skillNames?: string[]; }) => void;
    onSortChange: (sortType: string) => void;
    onReset: () => void;
    onApplyFilters?: () => void;
    sortType: string;
    formData: { programCourse: string; skillNames: string[] }; // formData prop 추가
    setFormData: React.Dispatch<React.SetStateAction<{ programCourse: string; skillNames: string[] }>>; // setFormData prop 추가
};

const bootcampSelectOptions = [
    { value: "new", label: "최신순" },
    { value: "hot", label: "조회순" },
];

const BootcampFilter = ({ onFilterChange, onSortChange, onReset, onApplyFilters, sortType, formData, setFormData }:BootcampFilterProps ): JSX.Element => {
    const { programCourse = []} = useBootcampProgramCourse();

    useEffect(() => {
        onFilterChange({
            programCourse: formData.programCourse,
            skillNames: formData.skillNames,
        });

    }, [formData]);
    
    const handleProgramChange = (value: string) => {
        setFormData(prev => ({ ...prev, programCourse: value })); 
        onFilterChange({
            programCourse: value,
        })
    };

    const handleReset = () => {
        setFormData({ programCourse: "", skillNames: [] });
        onReset();
    };

    return (
        <div className="fixed flex justify-between items-center full-line max-w-[1200px] w-full py-[15px] bg-white">
            <div className="flex gap-2 text-[11px] sm:text-[15px] text-black4">
                <CommonSelect value={sortType} onChange={onSortChange} options={bootcampSelectOptions}/>
                <SkillMenu setFormData={setFormData} formData={formData} navLabel={true}/>
                <SelectMenu className="flex items-center !w-full !min-w-30 !h-[40px] text-[11px] sm:text-[15px] text-black4"
                    value={formData.programCourse} placeholder="프로그램 과정" options={programCourse} onChange={(event) => handleProgramChange(event.target.value)}
                />
            </div>
            <div className="flex items-center gap-2">
                <button className="btn-primary text-white text-[10px] flex justify-center items-center w-17 h-6 cursor-pointer rounded-full bg-black9/80" 
                        onClick={onApplyFilters} 
                    >
                        필터 적용
                    </button>
                <button className="flex items-center justify-center w-[37px] h-[37px] rounded-[5px] bg-black9 cursor-pointer" onClick={handleReset}>
                        <svg fill="currentColor" height="22" viewBox="-1.5 -2.5 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                            <path fill="white" d="m4.859 5.308 1.594-.488a1 1 0 0 1 .585 1.913l-3.825 1.17a1 1 0 0 1-1.249-.665L.794 3.413a1 1 0 1 1 1.913-.585l.44 1.441C5.555.56 10.332-1.035 14.573.703a9.381 9.381 0 0 1 5.38 5.831 1 1 0 1 1-1.905.608A7.381 7.381 0 0 0 4.86 5.308zm12.327 8.195-1.775.443a1 1 0 1 1-.484-1.94l3.643-.909a.997.997 0 0 1 .61-.08 1 1 0 0 1 .84.75l.968 3.88a1 1 0 0 1-1.94.484l-.33-1.322a9.381 9.381 0 0 1-16.384-1.796l-.26-.634a1 1 0 1 1 1.851-.758l.26.633a7.381 7.381 0 0 0 13.001 1.25z"/>
                        </svg>
                </button>
            </div>
        </div>
    )
};

export default BootcampFilter;