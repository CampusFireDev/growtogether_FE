
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
        ...(token ? { Authorization: `${token.token}` } : {}), 
        // "Content-Type": "application/json",
        // "Accept": "application/json",
    }; 

    // 이전에 읽지 않은 알람 로드
    const loadNotification = async () =>{
        try{
            const res = await axios.get("/noti/unread", {headers});
            if (res.data && Array.isArray(res.data)) {
                setNotification(res.data);
                setNotificationCount(res.data.length);
            }
        } catch (error: any) {
            console.error("🎯 알림 로딩 오류:", error.message);
            setError("알림을 로드하는 중 오류가 발생했습니다.");
        }
    };

    // 읽은 알람은 리스트에서 삭제 
    const readNotification= async (notiId: number) => {
        console.log("⚫",notiId)
        try{
            await axios.put(`/noti/${notiId}/read`,{},{headers});
            setNotification((prevNotifications) => 
                prevNotifications.filter((noti) => noti.id !== notiId)
            );
            setNotificationCount((prev) => prev - 1);
            loadNotification();
        } catch (error){
            console.log("✔️",error);
            setError("알람 읽는 처리 중 오류 발생하였습니다.");
        }
    };

    useEffect(() =>{
        if (!memberId) return;
        const BASE_URL = "http://13.125.21.225:8080"; // 백엔드 API 서버 주소
        const EventSource = EventSourcePolyfill;
        const eventSource = new EventSource(`${BASE_URL}/sse/subscribe/${memberId}`, {
            headers,
            withCredentials: true, // 쿠키를 포함하려면 설정
        } as EventSourcePolyfillInit);

        eventSource.onopen = async () => {
            console.log("⭐ SSE 연결 성공");
            setError(null); // 연결 성공시 오류 초기화
        };

        // eventSource.addEventListener("message", (event: any) => {
        //     const notificationData = event;
        //     console.log("📢 실시간 알림 수신:", notificationData);

        //     // setNotification((prev) => {
        //     //     if (!prev.some((noti) => noti.content === notificationData.content)) {
        //     //         return [...prev, notificationData];
        //     //     }
        //     //     return prev;
        //     // });
        // });
        // eventSource.addEventListener("notification", (event: any) => {
        //     const notificationData = event;
        //     console.log("📢 실시간 알림 수신:", notificationData);

        //     // setNotification((prev) => {
        //     //     if (!prev.some((noti) => noti.content === notificationData.content)) {
        //     //         return [...prev, notificationData];
        //     //     }
        //     //     return prev;
        //     // });
        // });
        eventSource.onmessage = async (event: any) => {
            const notificationData = event; 
            console.log("📢 실시간 알림 수신:", notificationData);
        };

        eventSource.onerror = async (error: any) => {
            console.error("🚨 SSE 연결 오류 발생:", error.message);
            // setError("실시간 알림 연결 오류")
            eventSource.close();
        };

        loadNotification();

        return () => {
            console.log("🔌 SSE 연결 해제");
            eventSource.close();
        };
    },[memberId, window.location.pathname]);

    return { notification, setNotification, notificationCount, readNotification, error,  }; 
};

export default useNotification;