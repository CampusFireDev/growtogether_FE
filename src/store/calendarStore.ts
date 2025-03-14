import { create } from "zustand";

interface Schedule {
    id: number;
    date: string;
    title: string;
}

interface Attendee {
    id: number;
    name: string;
    // profileSrc: string;
}

interface CalendarStore {
    schedules: Schedule[];
    attendance: Record<string, Attendee[]>; // 날짜별 출석자 저장
}

export const useCalendarStore = create<CalendarStore>(() => ({
    schedules: [
      { id: 1, date: "2025-03-04", title: "회의"},
      { id: 2, date: "2025-03-04", title: "업무 일정"},
      { id: 3, date: "2025-03-05", title: "프로젝트 미팅"},
    ],
    attendance: {
      "2025-03-04": [
        { id: 1, name: "댕댕이"},
        { id: 2, name: "고맘미"},
      ],
      "2025-03-05": [{ id: 3, name: "멍뭉이"}],
    },
  }));