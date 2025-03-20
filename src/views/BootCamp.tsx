import { useState } from "react";
import BootcampCardList from "../components/bootcamp/BootcampCardList";
import BootcampPopualrCardList from "../components/bootcamp/BootcampPopualrCardList";
import BootcampFilter from "../components/common/filters/BootcampFilter";
import ListSearchBar from "../components/common/ui/ListSearchBar";
import useBootcampList from "../hooks/bootcamp/useBootcampList";
import Loading from "../../src/components/common/ui/Loading";

const BootCamp = ():JSX.Element=>{
    const [page, setPage] = useState(1);
    const { bootcampList, totalElements, totalPages, loading, error } = useBootcampList(page);

    if (loading) { return <div><Loading/></div>;}

    if (error) {return <div className="text-red-500">⚠️ 데이터 불러오기 실패: {error}</div>;}    

    return(
        <>
            <BootcampFilter />
            <div className="pt-[110px] pb-[70px]">
                <div className="mb-[20px]">
                    <h3 className="nexon-bold text-[24px] text-black4">🔥 현재 급상승 중인 인기글</h3>
                </div>
                <BootcampPopualrCardList />
                <div className="flex justify-between items-center mb-[20px] mt-[60px]">
                    <h3 className="nexon-bold text-[24px] text-black4">부트캠프 후기 <span className="text-myBlue">{bootcampList.length}</span>개를 찾았어요.</h3>
                    <ListSearchBar />
                </div>
                <BootcampCardList 
                    bootcampList={bootcampList} 
                    totalElements={totalElements} 
                    totalPages={totalPages} 
                    page={page} 
                    setPage={setPage}
                />
            </div>
        </>
    )
}

export default BootCamp;