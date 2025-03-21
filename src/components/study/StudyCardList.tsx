import { useEffect } from "react";
import StudyCard from "./StudyCard";
import Pagination from "../common/ui/Pagination";
import usePagination from "../../hooks/common/usePagination";
import { StudyData } from "../../types/study";

interface StudyCardListProps {
    studyList: StudyData[];
    totalElements: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
}

const StudyCardList = ({ studyList, totalElements, totalPages, page, setPage }: StudyCardListProps):JSX.Element => {

    const { currentPage, nextPage, prevPage, goToPage} = usePagination(page, totalPages);

    useEffect(() => {
        if (page !== currentPage) {
            setPage(currentPage);
        }
    }, [currentPage, page, setPage]);

    return (
        <>
            <div className="grid grid-cols-3 gap-[18px]">
                {studyList.map((study, index) => (
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
export default StudyCardList;