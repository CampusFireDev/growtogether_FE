import { StudyMemberResponse } from "../../../types/mypage/study/studyMemberType";
import useApi from "../../useApi";

const useStudyJoin = (studyId: number) => {
    const url = `https://www.growtogether.store/study/${studyId}/studyMember?types=PENDING`;
    const { data, loading, error } = useApi<StudyMemberResponse[]>(url, true, "GET");

    return { data, loading, error };
}

export default useStudyJoin;