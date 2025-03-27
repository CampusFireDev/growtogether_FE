import axios from "axios";
import { useState, useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import useMemberId from "../auth/useMemberId";
import useAuth from "../login/useAuth";
import { NotificationData } from "../../types/notification";

interface EventSourcePolyfillInit extends EventSourceInit {
    headers?: { [key: string]: string };
}
const useNotification = () => {
    const memberId = useMemberId();
    const token = useAuth();
    const [notification, setNotification] = useState<NotificationData[]>([]);
    const [notificationCount, setNotificationCount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null)
    
    const headers = { 
        ...(token ? { Authorization: `${token.token}` } : {})}; 

    // 이전에 읽지 않은 알람 로드
    const loadNotification = async () =>{
        try{
            const res = await axios.get("https://www.growtogether.store/noti/unread", {headers});
            if (res.data && Array.isArray(res.data)) {
                setNotification(res.data);
                setNotificationCount(res.data.length);
            }
        } catch (error: any) {
            // console.error("🎯 알림 로딩 오류:", error.message);
            setError("알림을 로드하는 중 오류가 발생했습니다.");
        }
    };

    // 읽은 알람은 리스트에서 삭제 
    const readNotification= async (notiId: number) => {
        try{
            await axios.put(`/noti/${notiId}/read`,{},{headers});
            setNotification((prevNotifications) => 
                prevNotifications.filter((noti) => noti.id !== notiId)
            );
            window.location.reload();
            setNotificationCount((prev) => prev - 1);
            loadNotification();
        } catch (error){
            console.log(error);
            setError("알람 읽는 처리 중 오류 발생하였습니다.");
        }
    };

    useEffect(() =>{
        if (!memberId) return;
        const BASE_URL = "https://www.growtogether.store/"; // 백엔드 API 서버 주소
        const EventSource = EventSourcePolyfill;
        const eventSource = new EventSource(`${BASE_URL}sse/subscribe/${memberId}`, {
            headers,
            withCredentials: true, 
        } as EventSourcePolyfillInit);


        eventSource.onopen = async () => {
            // console.log("✅  SSE 연결 성공");
            setError(null); // 연결 성공시 오류 초기화
        };
        
        eventSource.addEventListener("notification", (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.type !== "connection" && data.type !== "heartbeat") {
                // console.log("📢 실시간 알림 수신:", data);

                // 알림 중복 체크 후 업데이트
                setNotification(prev => {
                    if (!prev.some(noti => noti.id === data.id)) {
                        return [data, ...prev];
                    }
                    return prev;
                });
                setNotificationCount(prev => prev + 1);
            }
        });

        // eventSource.onerror = async (error: any) => {
        //     console.error("🚨 SSE 연결 오류 발생:", error.message);
        //     // setError("실시간 알림 연결 오류")
        //     eventSource.close();
        // };

        loadNotification();
        
        return () => {
            // console.log("🔌 SSE 연결 해제");
            eventSource.close();
        };
    },[memberId, window.location.pathname]);

    return { notification, setNotification, notificationCount, readNotification, error,  }; 
};

export default useNotification;