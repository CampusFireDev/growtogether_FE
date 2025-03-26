import { MyStudyListResponse } from "../../../types/mypage/study/myStudyListType";
import useApi from "../../useApi";

const useMyStudyList = () => {
    const url = "https://www.growtogether.store/api/mypage/studies";
    const { data: studyList, loading, error } = useApi<MyStudyListResponse>(url, true, "GET");

    return { studyList, loading, error };
};

export default useMyStudyList;