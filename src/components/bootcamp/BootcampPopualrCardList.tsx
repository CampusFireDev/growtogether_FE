import useBootcampPopularList from "../../hooks/bootcamp/useBootcampPopularLists";
import BootcampCard from "./BootcampCard";
import StatusHandler from "../common/ui/StatusHandler";

const BootcampPopualrCardList = (): JSX.Element => {
    const { bootcampPopularList, loading, error } = useBootcampPopularList();

    const popularBootcamp = Array.isArray(bootcampPopularList) ? bootcampPopularList.slice(0, 3) : [];

    return (
        <StatusHandler loading={loading} error={error}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
                {popularBootcamp.map((bootcamp, index) => (
                    <BootcampCard key={bootcamp.id ?? index} bootcamp={bootcamp} showTechStack={false} />
                ))}
            </div>
        </StatusHandler>
    );
};
export default BootcampPopualrCardList;