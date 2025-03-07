import { useEffect, useState } from "react";
import { BootcampData } from "../../types/bootcamp";

const useBootcampList = () => {
    const [ bootcampList, setBootcampList ] = useState<BootcampData[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetch("/bootcamp", {
                cache: "no-store",
                headers: {
                    "Accept": "application/json"
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((data: BootcampData[]) => {
                setBootcampList(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
        }, 500);
        
        return () => clearTimeout(timer);
    }, []);

    return { bootcampList, loading, error };
}

export default useBootcampList;