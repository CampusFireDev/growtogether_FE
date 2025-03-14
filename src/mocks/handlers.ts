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

interface StudyJoin {
  studyMemberId: number;
  nickName: string;
  skills: string[];
  content: string;
  studyId: number;
}

let study_post = fakeData.study_post;
let boot_post = fakeData.boot_post;
let comment: Comment[] = fakeData.comment;
let studyJoinRequests: StudyJoin[] = fakeData.study_join_requests; // 참가 신청 데이터 추가
let studyMember = fakeData.study_member;
let studyNotice = fakeData.study_notice;

export const handlers = [
  http.get("/user/:id", ({ params }) => {
    const { id } = params
    console.log('Fetching user with ID "%s"', id)
  }),

  // 스터디 데이터 가져오기
  http.get("/study/:id?", async ({params}) => {
    const { id } = params;
    if(!id){
      return HttpResponse.json(study_post, {
        headers: { "Accept": "application/json" }
      });
    }
    const study = study_post.find((s) => s.id === Number(id));

    return HttpResponse.json(study,{
      headers: {
        "Accept": "application/json"
      }
    });
  }),

  // 부트캠프 데이터 가져오기 
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

  // 댓글 작성하기
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

  // 스터티 참가 신청 목록 가져오기
  http.get("/study/:studyId/join", async({ params }) => {
    const { studyId } = params;

    // studyId에 해당하는 참가 신청 목록 필터링
    const applications = studyJoinRequests.filter(
      (app) => app.studyId === Number(studyId)
    );

    return HttpResponse.json(applications, {
      headers: { "Accept": "application/json" }
    });
  }),

  // 스터디 참가 인원 목록 가져오기
  http.get("/study/:studyId/studyMember", async({ params }) => {
    const { studyId } = params;

    const applications = studyMember.filter(
      (app) => app.studyId === Number(studyId)
    );

    return HttpResponse.json(applications, {
      headers: { "Accept": "application/json" }
    });
  }),

  // 스터디 일정 가져오기
  http.get("/study/:studyId/notice", async({ params }) => {
    const { studyId } = params;

    const applications = studyNotice.filter(
      (app) => app.studyId === Number(studyId)
    );

    return HttpResponse.json(applications, {
      headers: { "Accept": "application/json" }
    });
  })

];
