import { useEffect, useState } from "react";

interface StudyJoin {
    studyMemberId: number;
    nickName: string;
    skills: string[];
    content: string;
}

const useStudyJoin = (studyId: number) => {
    const [applications, setApplications] = useState<StudyJoin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!studyId) return;

        const timer = setTimeout(() => {
            fetch(`/study/${studyId}/join`, {
                cache: "no-store",
                headers: {
                    "Accept": "application/json"
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((data: StudyJoin[]) => {
                setApplications(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(true);
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [studyId]);

    return { applications, loading, error };
}

export default useStudyJoin;