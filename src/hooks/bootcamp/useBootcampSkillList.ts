import { useEffect, useState } from "react";

const useBootcampSkillName = () => {
    const [ skillName, setSkillName ] = useState([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(async () => {
            await fetch("/api/bootcamp/skillName", {
                cache: "no-store",
                headers: {
                    "Accept": "application/json"
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setSkillName(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("API 호출 실패: ", error);
                setError(error.message);
                setLoading(false);
            })
        }, 500);
        
        return () => clearTimeout(timer);
    }, []);

    return { skillName, loading, error };
}

export default useBootcampSkillName;