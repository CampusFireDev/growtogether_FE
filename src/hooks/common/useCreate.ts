import { useState } from "react";
import axios from "axios";
import useAuth from "../login/useAuth";

interface UseCreateProps {
    type: string;
    title: string;
    content: string;
    formData: any;
}
const useCreate = ({ type, title, content, formData }: UseCreateProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    // const headers = {
    //     Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJlc3QxMDkwN0BuYXZlci5jb20iLCJtZW1iZXJJZCI6MzcsIm5pY2tOYW1lIjoiYmVzdCIsImlhdCI6MTc0MjM5NjAwOSwiZXhwIjoxNzQyNDgyNDA5fQ._fvWFHORuwUWTWkz5x-4Gl_KUkf-UaQYQ81volleg5A",
    // };
    const {token} = useAuth();

    const handleCreate = async () => {
        setLoading(true);
        setError(null);
        try {
            let response;
            const headers = token ? { Authorization: `${token}` } : {};
            if (type === "bootcamp") {
                const formDataToSend = new FormData();
                const jsonBlob = new Blob(
                    [
                        JSON.stringify({
                            title,
                            content,
                            bootCampName: formData.bootCampName,
                            startdate: formData.startdate,
                            enddate: formData.enddate,
                            learningLevel: formData.learningLevel,
                            assistantSatisfaction: formData.assistantSatisfaction,
                            programSatisfaction: formData.programSatisfaction,
                            programCourse: formData.programCourse,
                            skillNames: formData.skillNames,
                        }),
                    ],
                    { type: "application/json" }
                );

                formDataToSend.append("bootCampReview", jsonBlob);
                response = await axios.post("/api/bootcamp", formDataToSend, { headers });
            } else if (type === "study") {
                const data = {
                    title,
                    content,
                    maxParticipant: formData.maxParticipant || 0,
                    studyClosingDate: formData.studyClosingDate || "",
                    mainScheduleList: formData.mainScheduleList || [],
                    type: formData.type,
                    skillNames: formData.skillNames || [],
                };

                response = await axios.post("/api/study", data, { headers });
                console.log(">>>",data)
            }

            if (response) {
               console.log(`${type === "bootcamp" ? "부트캠프" : "스터디"} 등록 성공!`);
            }
        } catch (error: any) {
            setError(error.response?.data || error.message);
            console.log("등록 중 오류 발생!");
        } finally {
            setLoading(false);
        }
    };

    return { handleCreate, loading, error};
};

export default useCreate;
