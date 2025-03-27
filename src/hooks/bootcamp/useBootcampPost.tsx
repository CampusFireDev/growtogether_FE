import axios from "axios";
import { BootcampData } from "../../types/bootcamp";

export const useBootcampPost = async (id: number): Promise<BootcampData> => {
  try {
    const res = await axios.get(`https://www.growtogether.store/api/bootcamp/${id}`);
    
    const data: BootcampData = res.data;
    console.log("✅", data);
    return data;

  } catch (error) {
    console.log("Error fetching Data:", error);
    throw error;
  }
};

