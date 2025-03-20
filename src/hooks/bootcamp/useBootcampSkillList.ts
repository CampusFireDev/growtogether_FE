import { useEffect, useState } from "react";

const useBootcampSkillName = () => {
    const [ skillName, setSkillName ] = useState([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const data = async() =>{
            await fetch("/api/bootcamp/skillName", {
            headers: {"Accept": "application/json"}}
            )
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
        }
        data();
        
    }, []);

    return { skillName, loading, error };
};

export default useBootcampSkillName;