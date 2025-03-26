import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../../types/chat/chat";
import SockJS from  "sockjs-client/dist/sockjs";
import { CompatClient, Stomp } from "@stomp/stompjs";

const useChat = (
    studyId: number,
    token: string,
    onMessage: (msg: ChatMessage) => void
  ) => {
    const clientRef = useRef<CompatClient | null>(null);
    const [isConnected, setIsConnected] = useState(false); // 연결 여부 상태
  
    useEffect(() => {
      const socket = new SockJS("https://www.growtogether.store/ws-chat");
      const client = Stomp.over(socket);
  
      client.connect(
        { Authorization: `${token}`, studyId: String(studyId) },
        () => {
            setIsConnected(true); // 연결 완료

            client.subscribe(`/topic/study/${studyId}`, (message) => {
                const body: ChatMessage = JSON.parse(message.body);
                onMessage(body);
            });
        }
      );
  
      clientRef.current = client;
  
      return () => {
        client.disconnect(() => console.log("Disconnected"));
      };
    }, [studyId, token]);
  
    const sendMessage = (msg: ChatMessage) => {
        if (!isConnected) {
            console.warn("STOMP 연결이 아직 안 됐습니다.");
            return;
        }

        clientRef.current?.send(
            `/app/study/${studyId}/send`,
            {},
            JSON.stringify(msg)
        );
  };
  
    return { sendMessage };
  };
  
  export default useChat;