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
  }),

  http.get("/bootcamp/:id", async ({params}) => { 
    const { id } = params;
    console.log(`[MSW] Intercepted GET /bootcamp/${id}`);
    return HttpResponse.json({
      id: 1,
      type: "BOOTCAMP",
      title:"부트캠프 솔직 후기",
      content: "정말 만족스러웠습니다.",
      programCourse: "백엔드",
      bootcampName: "제로베이스",
      bootcampStartDate: "2025-02-10",
      bootcampEndDate: "2025-05-10",
      learningLanguage: ["Spring"],
      programSatisfaction: 4,
      learningLevel: 3,
      assistantSatisfaction: 5
    },
    {
      headers: {
        "Accept": "application/json"
      }

    })

  })
];
