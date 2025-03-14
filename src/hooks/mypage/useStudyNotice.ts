import { useEffect, useState } from "react";

interface StudyNotice {
    noticeId: number;
    title: string;
    anthor: string;
    noticeDate: string;
}

const useStudyNotice = (studyId: number) => {
    const [ noticeList, setNoticeList ] = useState<StudyNotice[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        if (!studyId) return;

        const timer = setTimeout(() => {
            fetch(`/study/${studyId}/notice`, {
                cache: "no-store",
                headers: {
                    "Accept": "application/json"
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((data: StudyNotice[]) => {
                setNoticeList(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(true);
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [studyId]);

    return { noticeList, loading, error };
}

export default useStudyNotice;