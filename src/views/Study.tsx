import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 
import { useContentType } from "../context/ContentTypeContext";
import useStudyList from "../hooks/study/useStudyList";
import StudyCardList from "../components/study/StudyCardList";
import StudyPopularCardList from "../components/study/StudyPopularCardList";
import ListSearchBar from "../components/common/ui/ListSearchBar";
import StudyFilter from "../components/common/filters/StudyFilter";
import StatusHandler from "../components/common/ui/StatusHandler";

interface StudyProps {
    isHome?: boolean; // isHome prop 추가
}

const Study = ({ isHome }: StudyProps):JSX.Element=>{
    const [page, setPage] = useState(1);
    const [selectedSort, setSelectedSort] = useState<string>("CREATED_AT");
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";
    const { setcontentType } = useContentType();
    
    const [filters, setFilters] = useState<{ studyPurpose?: string; skillNames?: string[]; selectedDates?: string[]; sortBy?: string }>({});
    const [tempFilters, setTempFilters] = useState(filters); 
    const { studyList, totalElements, totalPages, loading, error } = useStudyList(page, searchTerm, filters);

    // 모집중인 게시글만 필터링
    //const openStudyList = studyList.filter((study) => study.studyStatus === "RECRUIT" || [])

    const handleTempFilterChange = (newFilters: { studyPurpose?: string; skillNames?: string[]; selectedDates?: string[]; sortBy?: string}) => {
        setTempFilters(newFilters);
    };

    const applyFilters = () => {
        setFilters(tempFilters);
        setPage(1);
    };

    const handleSearch = (term: string) => {
        setSearchParams({ search: term });
        setPage(1);
    };

    const handleSortChange = (sort: string) => {
        setSelectedSort(sort); 
        setFilters((prev) => ({ ...prev, sortBy: sort }));
        setTempFilters((prev) => ({ ...prev, sortBy: sort }));
        setPage(1); 
    };

    const handleReset = () => {
        setSelectedSort("CREATED_AT");
        setSearchParams({ search: "" });
        setFilters({}); 
        setTempFilters({});
        setPage(1);
    };
    
    useEffect(() => {
        setPage(1);
        setcontentType("study");
    }, [searchTerm, setcontentType])

    return(
        <StatusHandler loading={loading} error={error}>
            {!isHome && 
            <StudyFilter onFilterChange={handleTempFilterChange} onReset={handleReset} 
                onApplyFilters={applyFilters} onSortChange={handleSortChange} selectedSort={selectedSort} 
            />}
            <div className="pt-[110px] pb-[70px]">
                {Object.keys(filters).length === 0 && (
                    <>
                        <div className="mb-[20px]">
                            <h3 className="nexon-bold text-[24px] text-black4">🔥 현재 급상승 중인 인기글</h3>
                        </div>
                        <StudyPopularCardList />
                    </>
                )}
                <div className="flex justify-between items-center mb-[20px] mt-[60px]">
                    <h3 className="nexon-bold text-2xl text-black4">총 게시글 <span className="text-myBlue">{totalElements}</span>개를 찾았어요.</h3>
                    <ListSearchBar searchTerm={searchTerm} onSearch={handleSearch}/>
                </div>
                <StudyCardList 
                    studyList={studyList} 
                    totalElements={totalElements} 
                    totalPages={totalPages} 
                    page={page} 
                    setPage={setPage}
                    isHome={isHome}
                />
            </div>
        </StatusHandler>
    )
};

export default Study;