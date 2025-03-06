import useBootcampList from "../../hooks/bootcamp/useBootcampList";
import BootcampCard from "./BootcampCard";

const BootcampPopualrCardList = (): JSX.Element => {
    const { bootcampList, loading, error } = useBootcampList();

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div className="text-red-500">⚠️ 데이터 불러오기 실패: {error}</div>;
    }

    // 급상승 게시글: 상위 3개만 표시
    const popularBootcamp = bootcampList.slice(0, 3);

    return(
        <div className="grid grid-cols-3 gap-[18px]">
            {popularBootcamp.map((bootcamp, index) => (
                <BootcampCard key={index} bootcamp={bootcamp} showTechStack={false} />
            ))}
        </div>
    )
}
export default BootcampPopualrCardList;