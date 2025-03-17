import { useEffect, useState } from "react";
import { BootcampData } from "../../types/bootcamp";

const useBootcampPopularList = () => {
    const [bootcampPopularList, setBootcampPopularList] = useState<BootcampData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const res = await fetch("/api/bootcamp/top?strategyType=WeightStrategy&limit=5", {
                    cache: "no-store",
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

                const data = await res.json();
                if (!Array.isArray(data)) throw new Error("Invalid data format: Expected an array");
                
                setBootcampPopularList(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : "알 수 없는 오류 발생");
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return { bootcampPopularList, loading, error };
};

export default useBootcampPopularList;
