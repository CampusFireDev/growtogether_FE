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

interface StudyPost {
  id: number;
  type: string;
  title: string;
  description: string;
  maxSize: number;
  startDate: string;
  endDate: string;
  techStack: string[];
  viewCount: number;
  studyStatus: string;
}

let comment: Comment[] = fakeData.comment;
let study_post: StudyPost[] = fakeData.study_post;
let boot_post = fakeData.boot_post;

// http.get("/study/:id?", async ({ params }) => {
//   const { id } = params;
//   console.log('[MSW] Intercepted GET /api/posts');

//   if (!id) {
//     return HttpResponse.json(study_post, { // 전체 목록 반환
//       headers: { "Accept": "application/json" }
//     });
//   }

//   const study = study_post.find((s) => s.id === Number(id));

//   return HttpResponse.json(study,

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
  }),

  // 부트캠프
  http.get("/bootcamp", async () => {
    return HttpResponse.json([
      {
        programCourse: "backend",
        bootcampName: "제로베이스",
        title: "제로베이스 프론트엔드 초단기 취업 스쿨 4개월 후기 입니다.",
        author: "사용자1",
        likes: 15,
        createdAt: "2025-02-21",
        techStack: ["React", "Spring"],
        viewCount: 1,
        comments: 2
      },
      {
        programCourse: "backend",
        bootcampName: "프로그래머스",
        title: "프론트엔드 초단기 취업 스쿨",
        author: "사용자1",
        likes: 15,
        createdAt: "2025-02-21",
        techStack: ["React", "Spring"],
        viewCount: 1,
        comments: 2
      },
      {
        programCourse: "frontend",
        bootcampName: "제로베이스",
        title: "프론트엔드 초단기 취업 스쿨",
        author: "사용자1",
        likes: 15,
        createdAt: "2025-02-21",
        techStack: ["React", "Spring"],
        viewCount: 1,
        comments: 2
      },
      {
        programCourse: "backend",
        bootcampName: "앨리스 트랙",
        title: "프론트엔드 초단기 취업 스쿨",
        author: "사용자1",
        likes: 15,
        createdAt: "2025-02-21",
        techStack: ["React", "Spring"],
        viewCount: 1,
        comments: 2
      },
      {
        programCourse: "backend",
        bootcampName: "내일배움캠프",
        title: "프론트엔드 초단기 취업 스쿨",
        author: "사용자1",
        likes: 15,
        createdAt: "2025-02-21",
        techStack: ["React", "Spring"],
        viewCount: 1,
        comments: 2
      },
      {
        programCourse: "backend",
        bootcampName: "제로베이스",
        title: "프론트엔드 초단기 취업 스쿨",
        author: "사용자1",
        likes: 15,
        createdAt: "2025-02-21",
        techStack: ["React", "Spring"],
        viewCount: 1,
        comments: 2
      },
      {
        programCourse: "frontend",
        bootcampName: "제로베이스",
        title: "프론트엔드 초단기 취업 스쿨",
        author: "사용자1",
        likes: 15,
        createdAt: "2025-02-21",
        techStack: ["React", "Spring"],
        viewCount: 1,
        comments: 2
      },
    ],{
      headers: {
        "Accept": "application/json"
      }
    })
  }),
  http.get("/bootcamp/:id?", async ({params}) => { 
    const { id } = params;
    console.log(`[MSW] Intercepted GET /bootcamp/${id}`);
    const bootcamp = boot_post.find((b) => b.id === Number(id));

    if (!id) {
      return HttpResponse.json(boot_post, { // 전체 목록 반환
        headers: { "Accept": "application/json" }
      });
    }

    if (!bootcamp) {
      return HttpResponse.json({ message: "부트캠프를 찾을 수 없습니다." }, { status: 404 });
    }

    return HttpResponse.json(bootcamp,
    {
      headers: {
        "Accept": "application/json"
      }
    })
  }),


  // 댓글 가져오기
  http.get("/bootcamp/:id/comment", async() =>{
    console.log("[MSW] intercepted GET /comment");
    return HttpResponse.json(comment,
      {
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
