import axios from "axios";
import { useEffect, useState } from "react";

interface PointHistory {
    date: string;
    type: "REWARD" | "USE" | "CHARGE";
    amount: string;
}

const usePointHistory = () => {
    const [ points, setPoints ] = useState<PointHistory[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    // 포인트 내역 가져오기
    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const res = await axios.get("http://www.growtogether.store/api/points/history");
                setPoints(res.data);
            } catch(e) {
                setError("포인트 내역을 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchPoints();
    }, []);

    return { points, loading, error }
}

export default usePointHistory;