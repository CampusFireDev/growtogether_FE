import { PointHistory } from "../../../types/mypage/point/pointType";
import useApi from "../../useApi";

const usePointHistory = () => {
    const url = `https://www.growtogether.store/api/points/history`;
    const { data: points, loading, error } = useApi<PointHistory[]>(url, true, "GET");

    return { points, loading, error }
}

export default usePointHistory;