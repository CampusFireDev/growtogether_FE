import { useState } from "react";
import useAuth from "./login/useAuth"
import axios, { AxiosRequestConfig } from "axios";

/**
 * 데이터 변경 작업 시 (POST, PUT/PATCH, DELETE)
 */

const useApiMutation = <T> (
    method = "POST" // 기본값이 POST 다른것도 넘길 수 있음
) => {
    const { token } = useAuth(); // 토큰 값 가져오기

    const [ data, setData ] = useState<T | null>(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    const trigger = async (
        url: string,
        body?: any,
        config: AxiosRequestConfig = {}
    ) => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios({
                url,
                method,
                headers: {
                    Authorization: `${token}`, // 자동으로 포함
                    "Content-Type": "application/json",
                },
                data: body,
                withCredentials: true,
                ...config,
            });

            setData(res.data);
            return res.data;
        } catch (e: any) {
            setError("요청 중 오류가 발생했습니다.");
            console.error("📌 Mutation 요청 실패:", e.response?.data || e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return { trigger, data, loading, error };
};

export default useApiMutation;