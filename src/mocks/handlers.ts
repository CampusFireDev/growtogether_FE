// src/mocks/handlers.ts
//https://mswjs.io/docs/migrations/1.x-to-2.x/
import { http } from "msw";

export const handlers = [
  http.get("/user/:id", ({ params }) => {
    const { id } = params
    console.log('Fetching user with ID "%s"', id)
  })
];
