import { BootcampData } from './bootcamp';
import { StudyData } from "../types/study";

export interface MyLikesData{
    page: number;
    reviews: (BootcampData | StudyData)[];
    size: number;
    totalElements: number;
    totalPages: number;
};