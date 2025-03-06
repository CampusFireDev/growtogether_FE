// src/mocks/handlers.ts
//https://mswjs.io/docs/migrations/1.x-to-2.x/
import { http, HttpResponse } from "msw";
import fakeData from "../data/fakeData.json";



interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}
let comment: Comment[] = fakeData.comment;


export const handlers = [
  http.get("/user/:id", ({ params }) => {
    const { id } = params
    console.log('Fetching user with ID "%s"', id)
  }),

  http.get("/study/:id?", async () => {
    console.log('[MSW] Intercepted GET /api/posts');
    return HttpResponse.json({
      id: 1,
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
      techStack: ["Spring"],
      programSatisfaction: 4,
      learningLevel: 3,
      assistantSatisfaction: 5,
      viewCount: 57,
    },
    {
      headers: {
        "Accept": "application/json"
      }
    })
  }),


  // 댓글 가져오기
  http.get("/bootcamp/:id/comment", async() =>{
    console.log("[MSW] intercepted GET /comment");
    return HttpResponse.json(comment,{

      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  
  http.post("/bootcamp/:id/comment", async ({ request }) => {
    const body = (await request.json()) as { author: string; content: string };
    const { author, content } = body;

    if(!author || !content){
      return HttpResponse.json({ message: "작성자와 내용을 입력하세요."}, { status: 400});
    }

    const newComment: Comment = {
      id: comment.length + 1,
      author,
      content,
      date: new Date().toISOString().split("T")[0] //YYYY-MM-DD 형식
    };

    comment.push(newComment);

    return HttpResponse.json(newComment, { status: 201 });
  }),
];





