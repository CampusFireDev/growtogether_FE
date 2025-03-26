import { useEffect, useRef, useState } from "react";
import ChatMessageItem from "./ChatMessage";
import { ChatHistoryResponse, ChatMessage } from "../../types/chat/chat";
import useChat from "../../hooks/chat/useChat";
import useStudyGetMembers from "../../hooks/mypage/study/useStudyGetMembers";
import axios from "axios";

const ChatPopup = ({ studyId, token, myNickname }: { studyId: number; token: string; myNickname: string }) => {
	const [ messages, setMessages ] = useState<ChatMessage[]>([]);
	const [ input, setInput ] = useState("");
	const [ file, setFile ] = useState<File | null>(null);
	const [ lastIndex, setLastIndex ] = useState<number | null>(null);

	const messagesEndRef = useRef<HTMLDivElement>(null);

	const [ isLoadingMore, setIsLoadingMore ] = useState(false); // 이전 메시지 불러오는 중 여부
	const [ hasMore, setHasMore ] = useState(true); // 더 불러올 메시지가 있는지

	const [ scrollToBottomNext, setScrollToBottomNext ] = useState(false);

	// 스터디 멤버 리스트 불러오기
	const { data: allMembers } = useStudyGetMembers(studyId, "LEADER,NORMAL");
	// 내 studyMemberId 찾기
	const myInfo = allMembers?.find(member => member.nickname === myNickname);
	const myStudyMemberId = myInfo?.studyMemberId;

	const { sendMessage } = useChat(studyId, token, (msg) => {
		if (msg) {
			setMessages((prev) => [...prev, msg]);
		}
	});

	useEffect(() => {
		if (scrollToBottomNext) {
			scrollToBottom();
			setScrollToBottomNext(false);
		}
	}, [messages]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const fetchChatHistory = async () => {
		try {
			const baseUrl = `https://www.growtogether.store/study/${studyId}/chat`;
			const url = lastIndex !== null
			? `${baseUrl}?lastIndex=${lastIndex}&size=10`
			: `${baseUrl}?size=10`;


			const res = await axios.get<ChatHistoryResponse>(url, {
				headers: {
					Authorization: `${token}`,
				},
			});

			const newMessages = res.data.chatMessages;

			if (!newMessages || newMessages.length === 0) {
				setHasMore(false); // 더 이상 불러올 메시지 없음
				return;
			}

			setMessages((prev) => [...newMessages, ...prev]); // 위에 쌓기
			setLastIndex(res.data.lastIndex);
		} catch(e) {
			console.error("채팅 내역 불러오기 실패", e);
		} finally {
			setIsLoadingMore(false);
		}
	};

	useEffect(() => {
		fetchChatHistory();
	}, [studyId]);

	const uploadImage = async (uploadFile: File) => {
		if (!uploadFile) return null;

		const formData = new FormData();
		formData.append("file", uploadFile);

		try {
			const res = await axios.post(
				"https://www.growtogether.store/member/profile/upload",
				formData,
				{ headers: { Authorization: `${token}` } }
			);
			return res.data.imageUrl;
		} catch (err) {
			alert("이미지 업로드 실패");
			return null;
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0];
		if (selected) {
			setFile(selected); // 상태는 유지
			handleSend(selected); // 선택하자마자 전송
		}
	};

	// 파일 등록 버튼 커스텀
	const inputRef = useRef<HTMLInputElement>(null);
	const handleClick = () => {
		inputRef.current?.click();
	}

	const handleSend = async (customFile?: File) => {
		if (!input.trim() && !customFile && !file) return;

		if (!myStudyMemberId) {
			alert("스터디 멤버 정보를 불러올 수 없습니다.");
			return;
		}

		const sendingFile = customFile || file;
		const imageUrl = sendingFile ? await uploadImage(sendingFile) : null;
		
		const msg: ChatMessage = {
			studyId,
			sender: myNickname,
			studyMemberId: Number(myStudyMemberId), // TODO: 실제 ID 대입 필요
			message: input,
			imageUrl,
			to: null,
		};

		setScrollToBottomNext(true); // 내가 보낼 때만 스크롤
		sendMessage(msg);

		setInput("");
		setFile(null);
	};

	

	return (
		<div className="w-full h-full bg-white flex flex-col overflow-hidden">
		<div className="fixed top-0 left-0 w-full py-3 px-3 bg-black4 text-white">
			<strong>
				<span className="text-myBlue">스터디 </span> 
				채팅방
			</strong>
		</div>
		<div className="flex-1 overflow-y-auto mt-[48px] p-4 pb-[87px]">
			{hasMore && (
				<button
					onClick={fetchChatHistory}
					disabled={isLoadingMore}
					className="w-full h-[40px] mb-4 border border-gray5 text-sm text-black6 rounded-[3px]"
				>
					{isLoadingMore ? "불러오는 중..." : "이전 메시지 더보기"}
				</button>
			)}
			{messages.map((msg, idx) => (
				<ChatMessageItem
					key={idx}
					msg={msg}
					isMine={msg.sender === myNickname} // 내가 보낸 메시지면 true
				/>
			))}
			<div ref={messagesEndRef} />
		</div>
		<div className="fixed bottom-0 left-0 w-full p-5 bg-white">
			<div className="relative">
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyUp={(e) => e.key === "Enter" && handleSend()}
					className="w-full h-[47px] pl-[15px] pr-[15px] bg-white border border-[#e5e5e5] rounded-[50px] text-sm"
					placeholder="메시지를 입력하세요"
				/>
				{/* 파일 보내기 */}
				<div className="absolute top-[12px] right-[55px]">
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						ref={inputRef}
						className="hidden"
					/>
					<button
						type="button"
						onClick={handleClick}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
							<path d="M18.4337 1.67676H4.56662C2.97387 1.67676 1.67725 2.97242 1.67725 4.56613V18.4342C1.67725 20.0269 2.97291 21.3235 4.56662 21.3235H18.4347C20.0274 21.3235 21.324 20.0279 21.324 18.4342V4.56613C21.3231 2.97242 20.0274 1.67676 18.4337 1.67676ZM20.1673 18.4332C20.1673 19.3887 19.3901 20.1668 18.4337 20.1668H4.56662C3.61116 20.1668 2.833 19.3896 2.833 18.4332V16.3431L7.49625 11.1614L13.7954 16.8874L17.2789 13.9846L20.1683 16.392L20.1673 18.4332ZM20.1673 14.8883L17.278 12.481L13.827 15.356L7.41479 9.52551L2.833 14.6162V4.56613C2.833 3.61067 3.6102 2.83251 4.56662 2.83251H18.4347C19.3901 2.83251 20.1683 3.60972 20.1683 4.56613L20.1673 14.8883Z" fill="#444444"/>
							<path d="M15.5451 10.3442C17.1379 10.3442 18.4345 9.04851 18.4345 7.4548C18.4345 5.8611 17.1388 4.56543 15.5451 4.56543C13.9524 4.56543 12.6558 5.8611 12.6558 7.4548C12.6558 9.04851 13.9514 10.3442 15.5451 10.3442ZM15.5451 5.72214C16.5006 5.72214 17.2788 6.49935 17.2788 7.45576C17.2788 8.41218 16.5016 9.18939 15.5451 9.18939C14.5887 9.18939 13.8115 8.41218 13.8115 7.45576C13.8115 6.49935 14.5887 5.72214 15.5451 5.72214Z" fill="#444444"/>
						</svg>
					</button>
				</div>
				{/* 메시지 전송 */}
				<button onClick={() => handleSend()} className="absolute top-[7px] right-[7px] flex items-center justify-center w-[33px] h-[33px] rounded-full text-[0px] bg-black4">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15 15" fill="none">
						<path d="M13.6414 1.35857L6.42103 8.57897M1.5898 4.95096L12.8334 1.05013C13.5258 0.809906 14.1901 1.47421 13.9499 2.16662L10.049 13.4102C9.78181 14.1805 8.70017 14.2016 8.40308 13.4423L6.61768 8.87965C6.52851 8.65177 6.34823 8.47149 6.12035 8.38232L1.55767 6.59692C0.798427 6.29983 0.819545 5.21819 1.5898 4.95096Z" stroke="white" strokeLinecap="round"/>
					</svg>
					전송
				</button>
			</div>
		</div>
		</div>
	);
};

export default ChatPopup;
