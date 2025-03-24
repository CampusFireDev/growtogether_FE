import axios from "axios";
import { useState } from "react";
import { useContentType } from "../../context/ContentTypeContext";
import useAuth from "../login/useAuth";

interface UseCreateProps {
    title: string;
    content: string;
    formData: any;
}
const useCreate = ({ title, content, formData }: UseCreateProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { contentType } = useContentType();
    const {token} = useAuth();

    const handleCreate = async () => {
        setLoading(true);
        setError(null);
        try {
            let response;
            const headers = token ? { Authorization: `${token}` } : {};
            if (contentType === "bootcamp") {
                const formDataToSend = new FormData();
                const jsonBlob = new Blob(
                    [
                        JSON.stringify({
                            title,
                            content,
                            bootCampName: formData.bootCampName,
                            startdate: formData.startdate,
                            enddate: formData.enddate,
                            learningLevel: formData.learningLevel || 0,
                            assistantSatisfaction: formData.assistantSatisfaction || 0,
                            programSatisfaction: formData.programSatisfaction || 0,
                            programCourse: formData.programCourse,
                            skillNames: formData.skillNames || [],
                        }),
                    ],
                );

                formDataToSend.append("bootCampReview", jsonBlob);
                response = await axios.post("/api/bootcamp", formDataToSend, { headers });
            } else if (contentType === "study") {
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
            }

            if (response) {
               console.log(`${contentType === "bootcamp" ? "부트캠프" : "스터디"} 등록 성공!`);
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
