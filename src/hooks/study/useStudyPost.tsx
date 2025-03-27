import axios from "axios";
import { StudyData } from "../../types/study";

export const useStudyPost = async (id: number): Promise<StudyData> => {
  try {
    const res = await axios.get(`https://www.growtogether.store/api/study/${id}`);
    
    const data: StudyData = res.data;
    console.log("✅", data);
    return data;

  } catch (error) {
    console.log("Error fetching Data:", error);
    throw error;
  }
};
