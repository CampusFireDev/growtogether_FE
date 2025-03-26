import { StudyVoteResponse } from "../../../types/mypage/study/studyVoteType";
import useApi from "../../useApi";

const useVoteDetail = (voteId: number | null) => {
  const url = voteId ? `https://www.growtogether.store/study/vote/${voteId}` : "";
  const { data, loading, error } = useApi<StudyVoteResponse>(url, !!voteId, "GET");
  return { data, loading, error };
};

export default useVoteDetail;
