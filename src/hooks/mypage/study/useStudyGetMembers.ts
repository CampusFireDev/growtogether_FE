import { StudyMemberResponse } from "../../../types/mypage/study/studyMemberType";
import useApi from "../../useApi";

const useStudyGetMembers = (studyId: number, types: string) => {
    const url = `https://www.growtogether.store/study/${studyId}/studyMember?types=${types}`;
    const { data, loading, error } = useApi<StudyMemberResponse[]>(url, true, "GET");

    return { data, loading, error };
}

export default useStudyGetMembers;