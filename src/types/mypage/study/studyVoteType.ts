export interface StudyVoteResponse {
    voteId: number;
    title: string;
    voteType: "KICK" | "CHANGE";
  
    // 공통 아님. 아래는 조건부 필드
    // KICK 전용
    nickName?: string;
    profileImageUrl?: string;
  
    // CHANGE 전용
    content?: string;
    prevStartDate: string;  
    prevStartTime: string; 
    prevEndDate: string;    
    prevEndTime: string;      
    prevTotalTime: number;    
  
    changeStartDate: string;  
    changeStartTime: string;   
    changeEndDate: string;     
    changeEndTime: string;   
    changeTotalTime: number; 
  }