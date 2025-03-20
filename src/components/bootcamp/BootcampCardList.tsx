import { useEffect } from "react";
import BootcampCard from "./BootcampCard";
import Pagination from "../common/ui/Pagination";
import usePagination from "../../hooks/common/usePagination";
import { BootcampData } from "../../types/bootcamp";


interface BootcampCardListProps {
    bootcampList: BootcampData[];
    totalElements: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
}

const BootcampCardList = ({ bootcampList, totalElements, totalPages, page, setPage, }: BootcampCardListProps): JSX.Element => {
    const { currentPage, nextPage, prevPage, goToPage} = usePagination(page, totalPages);

    useEffect(() => {
        if (page !== currentPage) {
            setPage(currentPage);
        }
    }, [currentPage, page, setPage]);

    return (
        <>
            <div className="grid grid-cols-3 gap-[18px]">
                {bootcampList.map((bootcamp, index) => (
                    <BootcampCard key={index} bootcamp={bootcamp} />
                ))}
            </div>
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                nextPage={nextPage }
                prevPage={prevPage}
                goToPage={goToPage}
            />
        </>
    )
}
export default BootcampCardList;