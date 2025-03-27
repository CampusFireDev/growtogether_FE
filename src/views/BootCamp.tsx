import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 
import { useContentType } from "../context/ContentTypeContext";
import useBootcampList from "../hooks/bootcamp/useBootcampList";
import useSearch from "../hooks/common/useSearch";
import BootcampCardList from "../components/bootcamp/BootcampCardList";
import BootcampPopualrCardList from "../components/bootcamp/BootcampPopualrCardList";
import BootcampFilter from "../components/common/filters/BootcampFilter";
import ListSearchBar from "../components/common/ui/ListSearchBar";
import StatusHandler from "../components/common/ui/StatusHandler";
const BootCamp = ():JSX.Element=>{
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = useState<string>("new"); 
    const [searchParams, setSearchParams] = useSearchParams(); 
    const searchTerm = searchParams.get("search") || "";
    const {searchList} = useSearch();
    const { setcontentType } = useContentType();
    const [filters, setFilters] = useState<{ programCourse?: string; skillNames?: string[] }>({
        programCourse: "",
        skillNames: [],
    });
    const [formData, setFormData] = useState<{ programCourse: string; skillNames: string[] }>({
        programCourse: "",
        skillNames: [],
    });
    const { bootcampList, totalElements, totalPages, loading, error } = useBootcampList(page, sortType);

    const handleFilterChange = (newFilters: { programCourse?: string; skillNames?: string[] }) => {
        setFilters(newFilters);
    };
    
    const applyFilters = () => {
        setFilters(filters);
        setPage(1);
    };
    const handleSearch = (term: string) => {
        setSearchParams({ search: term, sort: sortType });
        setPage(1);
    };
    const handleSortChange = (sort: string) => {
        setSortType(sort);
        setPage(1); 
    };
    
    const handleReset = () => {
        setSortType("new"); 
        setFilters({ programCourse: "", skillNames: []});
        setFormData({ programCourse: "", skillNames: [] });
        setSearchParams({ search: "" }); 
        setPage(1);
    };
    
    const searchFilter = !!(searchTerm || filters.programCourse || filters.skillNames?.length)

    const filteredBootcampList = searchFilter
        ? searchList.filter((bootcamp: any) => {
            const matchesSearch = searchTerm ? bootcamp.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            const matchesProgram = filters.programCourse ? bootcamp.programCourse?.includes(filters.programCourse) : true;
            const matchesSkills = filters.skillNames?.length 
                ? filters.skillNames.some(skill => bootcamp.skillNames?.includes(skill)) 
                : true;
            return matchesSearch && matchesProgram && matchesSkills;
        })
        : bootcampList; // 검색어나 필터가 없으면 기본 bootcampList 사용



    const filteredTotalElements = searchFilter ? filteredBootcampList.length : totalElements;
    const filteredTotalPages = searchFilter ? Math.ceil(filteredTotalElements / 9) : totalPages;

    useEffect(() => {
        setPage(1);
        setcontentType("bootcamp");
    }, [searchTerm, sortType, setcontentType, setFilters]);
    
    return(
        <StatusHandler loading={loading} error={error}>
            <BootcampFilter onApplyFilters={applyFilters} 
                onFilterChange={handleFilterChange} onReset={handleReset} 
                onSortChange={handleSortChange} sortType={sortType} 
                formData={formData} setFormData={setFormData}
            /> 
            <div className="pt-[110px] pb-[70px]">
                {!searchFilter && 
                    <>
                        <div className="mb-[20px]">
                            <h3 className="nexon-bold text-[24px] text-black4">🔥 현재 급상승 중인 인기글</h3>
                        </div>
                        <BootcampPopualrCardList />
                    </>
                }
                <div className="flex justify-between items-center mb-[20px] mt-[60px]">
                    <h3 className="nexon-bold text-[24px] text-black4">부트캠프 후기 <span className="text-myBlue">{filteredTotalElements}</span>개를 찾았어요.</h3>
                    <ListSearchBar searchTerm={searchTerm}  onSearch={handleSearch} />
                </div>
                <BootcampCardList 
                    // bootcampList={bootcampList} 
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