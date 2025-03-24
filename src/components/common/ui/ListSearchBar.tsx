import { useState } from "react";
import CommonSelect from "./CommonSelect";

interface SearchProps {
    searchTerm: string;
    onSearch: (searchTerm: string) => void;
    onSortChange: (sortType: string) => void;
    sortType: string;
};
const ListSearchBar = ({ searchTerm, onSearch, onSortChange, sortType }: SearchProps): JSX.Element => {
    const [inputValue, setInputValue] = useState(searchTerm); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // 🔹 입력 값 업데이트
    };
    const handleSearch = () => {
        onSearch(inputValue); // 🔹 검색 버튼 클릭 시 검색 수행
    };
    return (
        <div className="flex items-center gap-2">
            <CommonSelect
                value={sortType}
                onChange={(value: string) => onSortChange(value)}
                options={[
                    { value: "new", label: "최신순" },
                    { value: "top", label: "조회순" },
                    // { value: "마감임박순", label: "마감임박순" }
                ]}
            />
            <input 
                type="text" 
                className="w-[220px] h-[45px] border border-gray5 rounded-[5px] px-[8px]" 
                placeholder="검색어를 입력해주세요." 
                value={inputValue}  
                onChange={handleInputChange}
            />
            <button className="w-[70px] h-[45px] bg-myBlue text-white rounded-[5px] px-[8px]" onClick={handleSearch}>검색</button>
        </div>
    )
};

export default ListSearchBar;