import useBootcampPopularList from "../../hooks/bootcamp/useBootcampPopularLists";
import BootcampCard from "./BootcampCard";
import Loading from "../common/ui/Loading";

const BootcampPopualrCardList = (): JSX.Element => {
    const { bootcampPopularList, loading, error } = useBootcampPopularList();

    if (loading) {
        return <div><Loading/></div>;
    }

    if (error) {
        return <div className="text-red-500">⚠️ 데이터 불러오기 실패: {error}</div>;
    }

    const popularBootcamp = Array.isArray(bootcampPopularList) ? bootcampPopularList.slice(0, 3) : [];

    return (
        <div className="grid grid-cols-3 gap-[18px]">
            {popularBootcamp.map((bootcamp, index) => (
                <BootcampCard key={bootcamp.id ?? index} bootcamp={bootcamp} showTechStack={false} />
            ))}
        </div>
    );
};
export default BootcampPopualrCardList;