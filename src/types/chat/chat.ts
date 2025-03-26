export interface ChatMessage {
    studyId: number;
    sender: string;
    studyMemberId: number;
    message: string;
    imageUrl?: string | null;
    to?: string[] | null;
    date?: string;
}

export interface ChatHistoryResponse {
    lastIndex: number;
    lastDate: string;
    chatMessages: ChatMessage[];
}