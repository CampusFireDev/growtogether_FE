import { BootcampData } from "../../types/bootcamp";

export const useBootcampPost = async (id: number): Promise<BootcampData> => {
  try {
    const response = await fetch(`/api/bootcamp/${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching Bootcamp Post Data: ${response.status}`);
    }
    
    const data: BootcampData = await response.json();
    console.log("✅",data);
    return data;

  } catch (error) {
    console.log("Error fetching Data:", error);
    throw error;
  }
};

// import {BootcampData} from "../types/bootcamp"
// import axios from "axios";

// export const fetchBootcampPost = async(): Promise<BootcampData> =>{
//     try{
//         const response = await axios.get<BootcampData>("http://13.125.21.225:8080/api/bootcamp");
//         return response.data;
//     } catch(error){
//         console.log("Error fetching Bootcamp Post Data:", error);
//         throw error;
//     }
// }