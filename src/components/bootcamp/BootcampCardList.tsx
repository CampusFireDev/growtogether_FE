import useBootcampList from "../../hooks/bootcamp/useBootcampList";
import usePagination from "../../hooks/common/usePagination";
import Pagination from "../common/ui/Pagination";
import BootcampCard from "./BootcampCard";
import { BootcampData } from "../../types/bootcamp";
import Loading from "../common/ui/Loading";

interface BootcampCardListProps {
    bootcampList: BootcampData[];
}

const BootcampCardList = ({ bootcampList }: BootcampCardListProps): JSX.Element => {
    const { loading, error } = useBootcampList();

    const itemsPerPage = 9; // 표시할 개수
    const { currentPage, totalPages, nextPage, prevPage, goToPage, startIndex, endIndex } = usePagination(bootcampList.length, itemsPerPage);

    if (loading) {
        return <div><Loading/></div>;
    }

    if (error) {
        return <div className="text-red-500">⚠️ 데이터 불러오기 실패: {error}</div>;
    }    

    // 현재 페이지에 해당하는 데이터만 가져오기
    // const paginatedList = bootcampList.slice(startIndex, endIndex);

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
                nextPage={nextPage}
                prevPage={prevPage}
                goToPage={goToPage}
            />
        </>
    )
}
export default BootcampCardList;