import { useEffect, useState } from "react";
import { StudyData } from "../../types/study";

const useStudyList = () => {
    const [studyList, setStudyList] = useState<StudyData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetch("/study", {
                cache: "no-store",
                headers: {
                    "Accept": "application/json"
                }
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data: StudyData[]) => {
                setStudyList(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("API 호출 실패: ", error);
                setError(error.message);
                setLoading(false);
            });
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return { studyList, loading, error };
};

export default useStudyList;
