// import { useEffect, useState } from "react"
// import useApi from "../useApi";

// interface StudyMemberList {
//     nickName: string;
//     status: string;   
// }

// const useStudyMemberList = ( studyId: number ) => {
//     // studyId가 없으면 보내지 않음
//     const { data: memberList, loading, error } = useApi<StudyMemberList[]>(
//         studyId ? `http://www.growtogether.store/study/${studyId}/studyMember` : "",
//         true
//     );

//     return { memberList: memberList || [], loading, error };
// }

// export default useStudyMemberList;