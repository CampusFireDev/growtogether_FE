import axios from "axios";
import { useEffect, useState } from "react";
import { BootcampData } from "../../types/bootcamp";
// import { useContentType } from "../../context/ContentTypeContext";
const useSearch = () => {
    const [searchList, setsearchList] = useState<BootcampData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // const { contentType } = useContentType();

    useEffect(() => {
        fetchSearch();
    }, []);

    // 검색 리스트 불러오기
    const fetchSearch = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/bootcamp/search", {
                headers: { "Accept": "application/json" }
            });
            setsearchList(res.data);
        } catch (error: any) {
            setError(error instanceof Error ? error.message : "알 수 없는 오류 발생");
        } finally {
            setLoading(false);
        }
    };


    return { searchList, loading, error };
};

export default useSearch;

