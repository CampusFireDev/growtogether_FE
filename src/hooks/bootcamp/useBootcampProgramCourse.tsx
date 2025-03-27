import { useEffect, useState } from "react";

interface ProgramCourse {
    value: string;
    label: string;
}
const useBootcampProgramCourse = () => {
    const [ programCourse, setProgramCourse ] = useState<ProgramCourse[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    const programCourseList = {
        "데브옵스": "DEVOPS",
        "데이터베이스": "DATABASE",    
        "백엔드": "BACKEND",
        "프론트엔드": "FRONTEND",
        "클라우드": "CLOUD"
    };

    useEffect(() => {
        const fetchCourses = async () =>{
            try{
                const res = await fetch("https://www.growtogether.store/api/bootcamp/programCourses",{
                    headers: {"Accept": "application/json"}
                }); 
                const data = await res.json();
                const formattedData = data.map((course: string) =>({
                    value: programCourseList[course as keyof typeof programCourseList],
                    label: course,
                }));
                setProgramCourse(formattedData);
                setLoading(false);
            }catch(error: any){
                console.error("API 호출 실패: ", error);
                setError(error.message);
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    return { programCourse, loading, error };
};

export default useBootcampProgramCourse;