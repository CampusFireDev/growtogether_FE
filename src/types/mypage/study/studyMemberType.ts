export interface StudyMemberResponse { 
    studyMemberId: number;
    nickname: string;
    role: "LEADER" | "NORMAL" | string;
}