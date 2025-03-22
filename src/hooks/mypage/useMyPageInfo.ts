import { MyPageInfo } from "../../types/mypage/myPageInfo";
import useApi from "../useApi";
import useRequireAuth from "../useRequireAuth";

const useMyPageInfo = () => {
    const { data: info, loading, error } = useApi<MyPageInfo>("http://www.growtogether.store/api/mypage/info", true);

    useRequireAuth(error); // 로그인 필요하면 자동 이동

    return { info, loading, error };
};

export default useMyPageInfo;