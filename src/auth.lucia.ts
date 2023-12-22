import { lucia } from "lucia";
import { elysia } from "lucia/middleware";
import { planetscale } from "@lucia-auth/adapter-mysql";
import { db } from "./db.initialize";
import { Connection } from "@planetscale/database";

export const auth = lucia({
  env: "DEV",
  middleware: elysia(),
  adapter: planetscale(db as unknown as Connection, {
    key: "user_key",
    session: "user_session",
    user: "auth_user",
  }),
  getUserAttributes: (databaseUser) => {
    return {
      username: databaseUser.username,
    };
  },
});

export type Auth = typeof auth;
