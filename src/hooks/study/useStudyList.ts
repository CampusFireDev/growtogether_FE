import axios from "axios";
import { useEffect, useState } from "react";
import { StudyData } from "../../types/study";
const useStudyList = (page: number) => {
    const [studyList, setStudyList] = useState<StudyData[]>([]);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 9; 

    useEffect(() => {
        const fetchStudyList = async() => {
            setLoading(true);
            try{
                const res = await axios.get(`/api/study?page=${page}&size=${itemsPerPage}`, {
                    headers: {
                        "Accept": "application/json"
                    }
                });
                window.scrollTo(0, 0);
                
                if (Array.isArray(res.data.studyList)) {
                    setStudyList(res.data.studyList);
                    setTotalElements(res.data.totalElements);
                    setTotalPages(res.data.totalPages);
                } else {
                    setStudyList([]); // 빈 배열로 초기화
                    setTotalElements(0);
                    setTotalPages(0);
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchStudyList();
    }, [page]);

    return { studyList, totalElements, totalPages, loading, error };
};

export default useStudyList;
