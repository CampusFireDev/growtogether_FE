import axios from "axios";
import { useEffect, useState } from "react";
import { StudyData } from "../../types/study";

const useStudyPopularList = () =>{
    const [studyPopularList, setStudyPopularList] = useState<StudyData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchPopularStudyList = async() =>{
            setLoading(true);
            try {
                const res = await axios.get("/api/study/popular", {
                    headers: {
                        "Accept": "application/json",
                    }
                });
                setStudyPopularList(res.data);
            } catch (error) {
                setError(error instanceof Error ? error.message : "알 수 없는 오류 발생");
            } finally {
                setLoading(false);
            }
        };

        fetchPopularStudyList(); 
    }, []);

    return {studyPopularList, loading, error};
};

export default useStudyPopularList;