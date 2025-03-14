import { useEffect, useState } from "react"

interface StudyMemberList {
    nickName: string;
    status: string;   
}

const useStudyMemberList = (studyId: number) => {
    const [memberList, setMemberList] = useState<StudyMemberList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!studyId) return;

        const timer = setTimeout(() => {
            fetch(`/study/${studyId}/studyMember`, {
                cache: "no-store",
                headers: {
                    "Accept": "application/json"
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((data: StudyMemberList[]) => {
                setMemberList(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(true);
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [studyId]);

    return { memberList, loading, error };
}

export default useStudyMemberList;