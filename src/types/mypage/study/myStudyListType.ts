export interface MyStudyResponse {
    studyId: number;
    title: string;
    content: string;
    viewCount: number;
    maxParticipant: number;
    studyClosingDate: string;
    studyStartDate: string;
    studyEndDate: string;
    studyStatus: "RECRUIT" | "IN_PROGRESS" | "COMPLETED";
    participant: number;
    type: "PROJECT" | "STUDY";
    studyCount: number;
    skillNames: string[];
    author: string;
    createdAt: string;
}

export type MyStudyListResponse = MyStudyResponse[]