import { useState } from "react";

interface SearchProps {
    searchTerm: string;
    onSearch: (searchTerm: string) => void;

};
const ListSearchBar = ({ searchTerm, onSearch }: SearchProps): JSX.Element => {
    const [inputValue, setInputValue] = useState(searchTerm); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); 
    };
    const handleSearch = () => {
        onSearch(inputValue); 
    };
    return (
        <div className="flex items-center gap-2">
            <input 
                type="text" 
                className="w-[220px] h-[45px] border border-gray5 rounded-[5px] px-[8px]" 
                placeholder="검색어를 입력해주세요." 
                value={inputValue}  
                onChange={handleInputChange}
            />
            <button className="w-[70px] h-[45px] bg-black6 text-white rounded-[5px] px-[8px] cursor-pointer" onClick={handleSearch}>검색</button>
        </div>
    )
};

export default ListSearchBar;