import { useState } from "react";
import { useSearchParams } from "react-router-dom"; 
import StudyCardList from "../components/study/StudyCardList";
import StudyPopularCardList from "../components/study/StudyPopularCardList";
import ListSearchBar from "../components/common/ui/ListSearchBar";
import StudyFilter from "../components/common/filters/StudyFilter";
import useStudyList from "../hooks/study/useStudyList";
import StatusHandler from "../components/common/ui/StatusHandler";

interface StudyProps {
    isHome?: boolean; // isHome prop 추가
}

const Study = ({ isHome }: StudyProps):JSX.Element=>{
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = useState<string>("new"); 
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";
    const { studyList, totalElements, totalPages, loading, error } = useStudyList(page);

    // 모집중인 게시글만 필터링
    const openStudyList = studyList.filter((study) => study.studyStatus === "RECRUIT" || [])

    
    const handleSearch = (term: string) => {
        setSearchParams({ search: term, sort: sortType });
        setPage(1);
    };
    const handleSortChange = (sort: string) => {
        setSortType(sort);
        setPage(1); 
    };
    
    const handleReset = () => {
        // setSortType("new"); // 🔹 정렬 초기화
        // setSearchParams({ search: "" }); // 🔹 검색어 초기화
        setPage(1);
    };

    return(
        <StatusHandler loading={loading} error={error}>
            {!isHome && <StudyFilter onReset={handleReset}/>}
            <div className="pt-[110px] pb-[70px]">
                <div className="mb-[20px]">
                    <h3 className="nexon-bold text-[24px] text-black4">🔥 현재 급상승 중인 모집글</h3>
                </div>
                <StudyPopularCardList/>
                <div className="flex justify-between items-center mb-[20px] mt-[60px]">
                    <h3 className="nexon-bold text-[24px] text-black4">모집 중인 게시글 <span className="text-myBlue">{openStudyList.length}</span>개를 찾았어요.</h3>
                    <ListSearchBar searchTerm={searchTerm}  onSearch={handleSearch} onSortChange={handleSortChange} sortType={sortType}/>
                </div>
                <StudyCardList 
                    studyList={studyList} 
                    totalElements={totalElements} 
                    totalPages={totalPages} 
                    page={page} 
                    setPage={setPage}
                />
            </div>
        </StatusHandler>
    )
}

export default Study;