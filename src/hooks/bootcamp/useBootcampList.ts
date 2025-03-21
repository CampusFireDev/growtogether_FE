import axios from "axios";
import { useEffect, useState } from "react";
import { BootcampData } from "../../types/bootcamp";
const useBootcampList = (page: number) => {
    const [ bootcampList, setBootcampList ] = useState<BootcampData[]>([]);
    const [ totalElements, setTotalElements] = useState<number>(0);
    const [ totalPages, setTotalPages] = useState<number>(0); 
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);
    const itemsPerPage = 9; 

    useEffect(() => {
        const fetchBootcampList = async () => {
            setLoading(true);
            try{
                const res = await axios.get(`/api/bootcamp?page=${page}&size=${itemsPerPage}`, {
                    headers:{
                        "Accept": "application/json"
                    }
                });
                window.scrollTo(0, 0);
                
                if(Array.isArray(res.data.reviews)){
                    setBootcampList(res.data.reviews);
                    setTotalElements(res.data.totalElements);
                    setTotalPages(res.data.totalPages);
                } else {
                    setBootcampList([]);
                    setTotalElements(0);
                    setTotalPages(0);
                }
            } catch(error: any){
                setError(error.message)
            } finally {
                setLoading(false);
            }
        };

        fetchBootcampList();
    }, [page]);

    return { bootcampList, totalElements, totalPages, loading, error };
}

export default useBootcampList;