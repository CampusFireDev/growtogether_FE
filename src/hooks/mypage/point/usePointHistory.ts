import { PointApiResponse } from "../../../types/mypage/point/pointType";
import useApi from "../../useApi";

const usePointHistory = () => {
    const url = `https://www.growtogether.store/api/points/history`;
    const { data, loading, error } = useApi<PointApiResponse>(url, true, "GET");

    return { points: data?.history, availablePoints: data?.availablePoints, loading, error };
}

export default usePointHistory;