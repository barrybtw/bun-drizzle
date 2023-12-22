import { Elysia } from "elysia";
import { AuthRouter } from "./routes/auth";
import { PingRouter } from "./routes/ping";

const app = new Elysia();

app.get("/", (ctx) => {
  return "Hello Elysia!";
});

app.use(PingRouter);
app.use(AuthRouter);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
