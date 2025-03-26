import useApi from "../useApi";


interface MyStudyStatusResponse {
  studyMemberStatus: "LEADER" | "NORMAL" | "PENDING" | "KICK";
}

const useMyStudyStatus = (studyId: number) => {
  const types = ["LEADER", "NORMAL", "PENDING", "KICK"]
    .join(",");

  const url = `https://www.growtogether.store/study/${studyId}/studyMember?types=${types}`;
  const { data, loading, error } = useApi<MyStudyStatusResponse>(url, true, "GET");

  return { data, loading, error };
};

export default useMyStudyStatus;
