import Elysia from "elysia";

export const PingRouter = new Elysia({ prefix: "ping" });

PingRouter.get("/", (ctx) => {
  return "pong";
});
