import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 
import BootcampCardList from "../components/bootcamp/BootcampCardList";
import BootcampPopualrCardList from "../components/bootcamp/BootcampPopualrCardList";
import BootcampFilter from "../components/common/filters/BootcampFilter";
import ListSearchBar from "../components/common/ui/ListSearchBar";
import useBootcampList from "../hooks/bootcamp/useBootcampList";
import StatusHandler from "../components/common/ui/StatusHandler";
import useSearch from "../hooks/common/useSearch";
const BootCamp = ():JSX.Element=>{
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = useState<string>("new"); 
    const [searchParams, setSearchParams] = useSearchParams(); 
    const searchTerm = searchParams.get("search") || "";
    const { bootcampList, totalElements, totalPages, loading, error } = useBootcampList(page, sortType);
    const {searchList} = useSearch();

    const filteredBootcampList = searchTerm ? searchList.filter((bootcamp: any) => 
        bootcamp.title.toLowerCase().includes(searchTerm.toLowerCase()) ) 
        : bootcampList;
    const filteredTotalElements = searchTerm ? filteredBootcampList.length : totalElements;
    const filteredTotalPages = searchTerm ? Math.ceil(filteredTotalElements / 9) : totalPages;
    
    const handleSearch = (term: string) => {
        setSearchParams({ search: term, sort: sortType });
        setPage(1);
    };
    const handleSortChange = (sort: string) => {
        setSortType(sort);
        setPage(1); 
    };

    const handleReset = () => {
        setSortType("new"); // 🔹 정렬 초기화
        setSearchParams({ search: "" }); // 🔹 검색어 초기화
        setPage(1);
    };

    const searchFilter = !!searchTerm;

    useEffect(() => {
        setPage(1);
    }, [searchTerm, sortType]);
    
    return(
        <StatusHandler loading={loading} error={error}>
            <BootcampFilter onReset={handleReset} /> 
            <div className="pt-[110px] pb-[70px]">
                <div className="mb-[20px]">
                    <h3 className="nexon-bold text-[24px] text-black4">🔥 현재 급상승 중인 인기글</h3>
                </div>
                <BootcampPopualrCardList />
                <div className="flex justify-between items-center mb-[20px] mt-[60px]">
                    <h3 className="nexon-bold text-[24px] text-black4">부트캠프 후기 <span className="text-myBlue">{bootcampList.length}</span>개를 찾았어요.</h3>
                    <ListSearchBar searchTerm={searchTerm}  onSearch={handleSearch} onSortChange={handleSortChange} sortType={sortType}/>
                </div>
                <BootcampCardList 
                    bootcampList={bootcampList} 
                    filteredBootcampList={filteredBootcampList} 
                    searchFilter = {searchFilter}
                    totalPages={filteredTotalPages} 
                    page={page} 
                    setPage={setPage}
                />
            </div>
        </StatusHandler>
    )
}

export default BootCamp;