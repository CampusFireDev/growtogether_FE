interface PaginationProps {
    currentPage: number; // 현재 페이지 번호
    totalPages: number; // 전체 페이지 개수
    nextPage: () => void; // 다음 페이지로 이동하는 함수
    prevPage: () => void; // 이전 페이지로 이동하는 함수
    goToPage: (page: number) => void; // 특정 페이지로 이동하는 함수
}

const Pagination = ({ currentPage, totalPages, nextPage, prevPage, goToPage }: PaginationProps) => {
    return (
        <div className="mt-[50px]">
            <ul className="flex items-center justify-center gap-[6px]">
                <li>
                    <button
                        className="flex items-center justify-center w-[40px] h-[40px] text-[0px] rounded-full border border-gray5"
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.707107 4.94975L5.65685 0L6.36396 0.707107L1.41421 5.65685L6.36396 10.6066L5.65685 11.3137L0.707107 6.36396L0 5.65685L0.707107 4.94975ZM5.36433 4.94975L10.3141 0L11.0212 0.707107L6.07144 5.65685L11.0212 10.6066L10.3141 11.3137L5.36433 6.36396L4.65723 5.65685L5.36433 4.94975Z" fill="#444444"/>
                        </svg>
                        첫번째 페이지로 이동
                    </button>
                </li>
                <li>
                    <button 
                        className="flex items-center justify-center w-[40px] h-[40px] text-[0px] rounded-full border border-gray5"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.65685 0L0.707107 4.94975L0 5.65685L0.707107 6.36396L5.65685 11.3137L6.36396 10.6066L1.41421 5.65685L6.36396 0.707107L5.65685 0Z" fill="#444444"/>
                        </svg>
                        이전 페이지로 이동
                    </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                    <li key={index}>
                        <button
                            className={`flex items-center justify-center w-[40px] h-[40px] rounded-full
                                ${currentPage === index + 1 ? "bg-myBlue text-white nexon-bold": ""}
                            `}
                            onClick={() => goToPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        className="flex items-center justify-center w-[40px] h-[40px] text-[0px] rounded-full border border-gray5"
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                            <g transform="scale(-1, 1) translate(-7, 0)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.65685 0L0.707107 4.94975L0 5.65685L0.707107 6.36396L5.65685 11.3137L6.36396 10.6066L1.41421 5.65685L6.36396 0.707107L5.65685 0Z" fill="#444444"/>
                            </g>
                        </svg>
                        다음 페이지로 이동
                    </button>
                </li>
                <li>
                    <button
                        className="flex items-center justify-center w-[40px] h-[40px] text-[0px] rounded-full border border-gray5"
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <g transform="scale(-1, 1) translate(-12, 0)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.707107 4.94975L5.65685 0L6.36396 0.707107L1.41421 5.65685L6.36396 10.6066L5.65685 11.3137L0.707107 6.36396L0 5.65685L0.707107 4.94975ZM5.36433 4.94975L10.3141 0L11.0212 0.707107L6.07144 5.65685L11.0212 10.6066L10.3141 11.3137L5.36433 6.36396L4.65723 5.65685L5.36433 4.94975Z" fill="#444444"/>
                            </g>
                        </svg>
                        마지막 페이지로 이동
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;