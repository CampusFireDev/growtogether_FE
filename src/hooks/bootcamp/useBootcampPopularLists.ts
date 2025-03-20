import axios from "axios";
import { useEffect, useState } from "react";
import { BootcampData } from "../../types/bootcamp";

const useBootcampPopularList = () => {
    const [bootcampPopularList, setBootcampPopularList] = useState<BootcampData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        
        const fetchBootcampPopularList = async() => {
            try{
                const res = await axios.get("/api/bootcamp/top?strategyType=WeightStrategy&limit=5", {
                    headers: {
                        "Accept": "application/json"
                    }
                });
                setBootcampPopularList(res.data);
            } catch(error: any) {
                setError(error instanceof Error ? error.message : "알 수 없는 오류 발생");
            } finally {
                setLoading(false);
            }

        }
        fetchBootcampPopularList();
       
    }, []);

    return { bootcampPopularList, loading, error };
};

export default useBootcampPopularList;
