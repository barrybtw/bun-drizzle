import Elysia from "elysia";
import { auth } from "../auth.lucia";

export const AuthRouter = new Elysia({ prefix: "auth" });

AuthRouter.get("/me", async (ctx) => {
  const user = auth.handleRequest(ctx);
  const session = await user.validate();
  if (!session) {
    ctx.set.status = 401;
    return "Unauthorized/Invalid session";
  }
  return session;
});

AuthRouter.post("/login", async (ctx) => {
  const Form = await ctx.request.formData();

  const username = Form.get("username");
  const password = Form.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    ctx.set.status = 400;
    return "Missing username or password";
  }

  try {
    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const sessionCookie = auth.createSessionCookie(session);
    ctx.cookie["Set-Cookie"].value = sessionCookie.serialize();
    ctx.cookie["Set-Cookie"].httpOnly = true;
    ctx.set.status = 302;
    ctx.set.headers.Location = "/";
    return;
  } catch (Error) {
    ctx.set.status = 400;
    return "Missing username or password";
  }
});

AuthRouter.post("/register", async (ctx) => {
  const Form = await ctx.request.formData();

  const username = Form.get("username");
  const password = Form.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    ctx.set.status = 400;
    return "Missing username or password";
  }

  try {
    const user = await auth.createUser({
      key: {
        providerId: "username",
        providerUserId: username.toLowerCase(),
        password: password,
      },
      attributes: {
        username: username,
      },
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const cookie = auth.createSessionCookie(session);
    ctx.headers["Set-Cookie"] = cookie.serialize();

    ctx.set.status = 302;
    ctx.set.headers.Location = "/";
    return;
  } catch (Error) {
    // do shit

    ctx.set.status = 400;
    return "Missing username or password";
  }
});

AuthRouter.post("/logout", async (ctx) => {
  const authRequest = auth.handleRequest(ctx);
  const session = await authRequest.validate();
  if (!session) {
    ctx.set.status = 401;
    return;
  }
  await auth.invalidateSession(session.sessionId);
  const sessionCookie = auth.createSessionCookie(null);
  ctx.headers["Set-Cookie"] = sessionCookie.serialize();
  ctx.set.status = 302;
  ctx.set.headers.Location = "/login";
  return;
});
