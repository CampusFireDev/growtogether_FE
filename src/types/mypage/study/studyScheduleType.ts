export interface ScheduleCreateRequest {
    title: string;
    startDate: string;
    startTime: string;
    totalTime: string;
}

export interface ScheduleCreateResponse {
    message: string;
}

export interface StudySchedule {
    scheduleId: number;
    title: string;
    start: string;
    end: string;
    totalTime: number;
    scheduleType: string;
    author: string;
}

export interface StudyScheduleByDate {
    date: string;
    schedule: StudySchedule[];
}

export interface StudyGetScheduleResponse {
    schedules: StudyScheduleByDate[];
}