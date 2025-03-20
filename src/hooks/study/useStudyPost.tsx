import { StudyData } from "../../types/study";

export const useStudyPost = async (id: number): Promise<StudyData> => {
    try {
        const response = await fetch(`/api/study/${id}`);

        if(!response.ok) {
            throw new Error(`Error fetching Study Post Data: ${response.status}`);
        }

        const data: StudyData = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error fetching Data:", error);
        throw error;
    }
}