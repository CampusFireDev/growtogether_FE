import { StudyGetScheduleResponse, StudySchedule } from "../../../types/mypage/study/studyScheduleType";
import useApi from "../../useApi"

const useStudyGetSchedule = (studyId: number, date: string) => {
    const url = studyId ? `http://www.growtogether.store/study/${studyId}/schedule?date=${date}` : "";
    const { data, loading, error } = useApi<StudySchedule>(url, true, "GET");

    console.log("현재 요청한 API URL: ", url);

    return { data, loading, error };
};

export default useStudyGetSchedule;