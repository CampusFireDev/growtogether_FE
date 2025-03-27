import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { StudyData } from "../../types/study";

interface StudyFilters {
    studyPurpose?: string;
    skillNames?: string[];
    selectedDates?: string[];
    sortBy?: string;
}

const useStudyList = (page: number, searchTerm?: string, filters?: StudyFilters) => {
    const [studyList, setStudyList] = useState<StudyData[]>([]);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 9;

    const prevFiltersRef = useRef<string>(JSON.stringify(filters)); 

    useEffect(() => {
        const fetchStudyList = async () => {
            setLoading(true);
            setError(null);
            try {
                const queryParams = new URLSearchParams();
                queryParams.append("page", String(page));
                queryParams.append("size", String(itemsPerPage));

                if (filters?.studyPurpose) queryParams.append("studyType", filters.studyPurpose);
                if (filters?.skillNames?.length) queryParams.append("skillStacks", filters.skillNames.join(","));
                if (filters?.selectedDates?.length) queryParams.append("date", filters.selectedDates.join(","));
                if (filters?.sortBy) queryParams.append("sortBy", filters.sortBy);

                const finalUrl = `https://www.growtogether.store/api/study?${queryParams.toString()}`;
                const res = await axios.get(finalUrl, {
                    headers: { "Accept": "application/json" }
                });

                window.scrollTo(0, 0);

                if (Array.isArray(res.data.studyList)) {
                    setStudyList(res.data.studyList);
                    setTotalElements(res.data.totalElements);
                    setTotalPages(res.data.totalPages);
                } else {
                    setStudyList([]);
                    setTotalElements(0);
                    setTotalPages(0);
                }
            } catch (error: any) {
                console.error("❌ API 요청 실패:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchStudySearchList = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`https://www.growtogether.store/api/study/search?page=${page}&size=9&title=${searchTerm}`);
                window.scrollTo(0, 0);

                if (Array.isArray(res.data.studyList)) {
                    setStudyList(res.data.studyList);
                    setTotalElements(res.data.totalElements);
                    setTotalPages(res.data.totalPages);
                } else {
                    setStudyList([]);
                    setTotalElements(0);
                    setTotalPages(0);
                }
            } catch (error: any) {
                console.error("❌ 검색 API 요청 실패:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const currentFilters = JSON.stringify(filters);

        if (searchTerm && searchTerm.trim() !== "") {
            // 검색어가 있을 때만 검색 API 호출
            fetchStudySearchList();
        } else if (!filters || Object.keys(filters).length === 0) {
            // 필터가 없을 때 기본 데이터를 가져오는 로직
            fetchStudyList(); 
        } else if (prevFiltersRef.current !== currentFilters || page !== 1) {
            prevFiltersRef.current = currentFilters; // 이전 값 업데이트
            fetchStudyList(); 
        }

    }, [page, searchTerm, filters]); 

    return { studyList, totalElements, totalPages, loading, error };
};

export default useStudyList;
