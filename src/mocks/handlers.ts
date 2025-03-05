// src/mocks/handlers.ts
//https://mswjs.io/docs/migrations/1.x-to-2.x/
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/user/:id", ({ params }) => {
    const { id } = params
    console.log('Fetching user with ID "%s"', id)
  }),

  http.get("/study", async () => {
    return HttpResponse.json([
      {
        type: "STUDY",
        title: "테스트",
        description: "매주 수요일 7시에 진행하는 스터디입니다.",
        maxSize: 5,
        startDate: "2025-02-21",
        endDate: "2025-03-6",
        techStack: ["React", "Spring"],
        viewCount: 1,
        studyStatus: 'OPEN',
        writer: '고먐미'
      },
      {
        type: "STUDY",
        title: "Spring Boot 스터디 모집Spring Boot 스터디 모집Spring Boot 스터디 모집Spring Boot 스터디 모집Spring Boot 스터디 모집Spring Boot 스터디 모집",
        description: "매주 수요일 7시에 진행하는 스터디입니다.",
        maxSize: 5,
        startDate: "2025-02-21",
        endDate: "2025-03-7",
        techStack: ["React", "Spring"],
        viewCount: 2,
        studyStatus: 'OPEN',
        writer: '고먐미'
      },
      {
        type: "STUDY",
        title: "Spring Boot 스터디 모집",
        description: "매주 수요일 7시에 진행하는 스터디입니다.",
        maxSize: 5,
        startDate: "2025-02-21",
        endDate: "2025-03-8",
        techStack: ["React", "Spring"],
        viewCount: 3,
        studyStatus: 'PROGESS',
        writer: '고먐미'
      },
      {
        type: "PROJECT",
        title: "Spring Boot 스터디 모집",
        description: "매주 수요일 7시에 진행하는 스터디입니다.",
        maxSize: 5,
        startDate: "2025-02-21",
        endDate: "2025-03-9",
        techStack: ["React", "Spring"],
        viewCount: 4,
        studyStatus: 'COMPLETE',
        writer: '고먐미'
      },
      {
        type: "PROJECT",
        title: "Spring Boot 스터디 모집",
        description: "매주 수요일 7시에 진행하는 스터디입니다.",
        maxSize: 5,
        startDate: "2025-02-21",
        endDate: "2025-03-30",
        techStack: ["React", "Spring"],
        viewCount: 5,
        studyStatus: 'COMPLETE',
        writer: '고먐미'
      },
      {
        type: "PROJECT",
        title: "Spring Boot 스터디 모집",
        description: "매주 수요일 7시에 진행하는 스터디입니다.",
        maxSize: 5,
        startDate: "2025-02-21",
        endDate: "2025-03-30",
        techStack: ["React", "Spring"],
        viewCount: 6,
        studyStatus: 'COMPLETE',
        writer: '고먐미'
      },
      {
        type: "PROJECT",
        title: "Spring Boot 스터디 모집",
        description: "매주 수요일 7시에 진행하는 스터디입니다.",
        maxSize: 5,
        startDate: "2025-02-21",
        endDate: "2025-03-30",
        techStack: ["React", "Spring"],
        viewCount: 7,
        studyStatus: 'COMPLETE',
        writer: '고먐미'
      },
      {
        type: "PROJECT",
        title: "Spring Boot 스터디 모집",
        description: "매주 수요일 7시에 진행하는 스터디입니다.",
        maxSize: 5,
        startDate: "2025-02-21",
        endDate: "2025-03-30",
        techStack: ["React", "Spring"],
        viewCount: 8,
        studyStatus: 'COMPLETE',
        writer: '고먐미'
      },
      {
        type: "PROJECT",
        title: "Spring Boot 스터디 모집",
        description: "매주 수요일 7시에 진행하는 스터디입니다.",
        maxSize: 5,
        startDate: "2025-02-21",
        endDate: "2025-03-30",
        techStack: ["React", "Spring"],
        viewCount: 2223,
        studyStatus: 'COMPLETE',
        writer: '고먐미'
      },
      {
        type: "PROJECT",
        title: "Spring Boot 스터디 모집",
        description: "매주 수요일 7시에 진행하는 스터디입니다.",
        maxSize: 5,
        startDate: "2025-02-21",
        endDate: "2025-03-30",
        techStack: ["React", "Spring"],
        viewCount: 2223,
        studyStatus: 'COMPLETE',
        writer: '고먐미'
      },
      {
        type: "PROJECT",
        title: "Spring Boot 스터디 모집",
        description: "매주 수요일 7시에 진행하는 스터디입니다.",
        maxSize: 5,
        startDate: "2025-02-21",
        endDate: "2025-03-30",
        techStack: ["React", "Spring"],
        viewCount: 2223,
        studyStatus: 'COMPLETE',
        writer: '고먐미'
      },
    ],{
      headers: {
        "Accept": "application/json"
      }
    });
  })
];
