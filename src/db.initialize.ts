import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

const connection = connect({
  host: Bun.env.DATABASE_HOST,
  username: Bun.env.DATABASE_USERNAME,
  password: Bun.env.DATABASE_PASSWORD,
});

export const db = drizzle(connection);
