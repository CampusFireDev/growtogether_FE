import { useState, useEffect } from "react";
const usePagination = (page: number, totalPages: number) => {
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages > 0 ? totalPages : 1);
        }
    }, [totalPages, currentPage]);
    
   
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const goToPage = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return {
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
    }
}

export default usePagination;