import axios, { AxiosRequestConfig, Method } from "axios";
import useAuth from "./login/useAuth";
import { useEffect, useState } from "react";

const useApi = <T>(
    url: string,
    requireAuth: boolean,
    method: Method = "GET",
    body: any = null,
    config: AxiosRequestConfig = {}
) => {
    const { token } = useAuth();

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (requireAuth && !token) {
            setError("로그인이 필요합니다.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await axios({
                    url,
                    method,
                    headers: { 
                        Authorization: `${token}`,
                        "Content-Type": "application/json",
                    },
                    data: body,
                    withCredentials: true,
                    ...config,
                });

                setData(res.data);
            } catch (e: any) {
                setError("데이터를 불러오는 중 오류가 발생했습니다.");
                console.error("📌 API 요청 실패:", e.response?.data || e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, token, method, body, requireAuth]);

    return { data, loading, error };
};

export default useApi;
