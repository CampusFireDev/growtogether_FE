import StudyCard from "./StudyCard";
import useStudyList from "../../hooks/study/useStudyList";
import Pagination from "../common/ui/Pagination";
import usePagination from "../../hooks/common/usePagination";
import { useState } from "react";
import ListSearchBar from "../common/ui/ListSearchBar";

const BoardCardList = ():JSX.Element => {
    const { studyList, loading, error } = useStudyList();

    const itemsPerPage = 9; // 표시할 개수
    const { currentPage, totalPages, nextPage, prevPage, goToPage, startIndex, endIndex } = usePagination(studyList.length, itemsPerPage);
    
    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div className="text-red-500">⚠️ 데이터 불러오기 실패: {error}</div>;
    }

    // 현재 페이지에 해당하는 데이터만 가져오기
    const paginatedList = studyList.slice(startIndex, endIndex);

    return (
        <>
            <div className="grid grid-cols-3 gap-[18px]">
                {paginatedList.map((study, index) => (
                    <StudyCard key={index} study={study} />
                ))}
            </div>
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                nextPage={nextPage}
                prevPage={prevPage}
                goToPage={goToPage}
            />
        </>
    )
}
export default BoardCardList;