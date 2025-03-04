// src/mocks/handlers.ts
//https://mswjs.io/docs/migrations/1.x-to-2.x/
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/user/:id", ({ params }) => {
    const { id } = params
    console.log('Fetching user with ID "%s"', id)
  }),

  http.get("/study", async () => {
    console.log('[MSW] Intercepted GET /api/posts');
    return HttpResponse.json({
      type: "STUDY",
      title: "Spring Boot 스터디 모집",
      description: "매주 수요일 7시에 진행하는 스터디입니다.",
      maxSize: 5,
      startDate: "2025-02-21",
      endDate: "2025-03-30",
      techStack: ["React", "Spring"],
      viewCount: 2223,
      studyStatus: 'OPEN'
    },
    {
      headers: {
        "Accept": "application/json"
      }
    })
  })
];
