import { StudyGetScheduleResponse } from "../../../types/mypage/study/studyScheduleType";
import useApi from "../../useApi"

const useStudyGetSchedules = (studyId: number, date: string) => {
    const url = studyId ? `http://www.growtogether.store/study/${studyId}/schedules?date=${date}` : "";
    const { data, loading, error } = useApi<StudyGetScheduleResponse>(url, true, "GET");

    return { data, loading, error };
};

export default useStudyGetSchedules;