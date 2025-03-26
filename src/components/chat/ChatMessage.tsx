import { ChatMessage } from "../../types/chat/chat";

const ChatMessageItem = ({ msg, isMine }: { msg: ChatMessage, isMine: boolean }) => {
	if (!msg) return null;

	const formatTime = (isoTime?: string) => {
		if (!isoTime) return "";
		const date = new Date(isoTime);
	
		const pad = (n: number) => n.toString().padStart(2, "0");
	
		const month = pad(date.getMonth() + 1);  // getMonth()는 0부터 시작
		const day = pad(date.getDate());
		const hours = pad(date.getHours());
		const minutes = pad(date.getMinutes());
	
		return `${month}-${day} ${hours}:${minutes}`;
	};

	return (
		<div className="mb-5">
			<div className={`flex flex-wrap ${isMine ? 'justify-end' : 'justify-start'}`}>
				<strong className="text-xs text-black4">{msg.sender}</strong>
				<div className={`flex w-full mt-1 items-end gap-2 ${isMine ? 'flex justify-end' : ''}`}>
					{isMine && (<span className="text-xs text-black6">{formatTime(msg.date)}</span>)}
					<div className={`inline-block text-sm p-2 rounded ${isMine ? 'bg-myBlue text-white' : 'bg-white5 text-black4'}`}>
						{msg.imageUrl && <img src={msg.imageUrl} alt="img" className="max-w-xs" />}
						{msg.message}
					</div>
					{!isMine && (<span>{formatTime(msg.date)}</span>)}
				</div>
			</div>
		</div>
	);
};

export default ChatMessageItem;