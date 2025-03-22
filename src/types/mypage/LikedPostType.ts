interface BasePost {
    id: number;
    title: string;
    author: string;
    profileImageKey: string | null;
    content: string;
    likeCount: number;
    viewCount: number;
    commentCount: number;
}

interface BootcampPost extends BasePost {
    bootCampName: string;
    startdate: string;
    enddate: string;
    learningLevel: number;
    assistantSatisfaction: number;
    programSatisfaction: number;
    skillNames: string[];
}

interface StudyPost extends BasePost {

}

export interface LikedPostsResponse {
    reviews: BootcampPost[];
    totalPages: number;
    totalElements: number;
}