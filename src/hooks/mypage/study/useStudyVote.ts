import { StudyVoteResponse } from "../../../types/mypage/study/studyVoteType";
import useApi from "../../useApi";

const useStudyVote = (studyId: number) => {
    const url = `https://www.growtogether.store/study/${studyId}/vote`;
    const { data, loading, error } = useApi<StudyVoteResponse[]>(url, true, "GET");

    console.log("data", data);

    return { data, loading, error };
}

export default useStudyVote;