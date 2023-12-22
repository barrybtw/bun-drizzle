import { drizzle } from "drizzle-orm/planetscale-serverless";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import { connect } from "@planetscale/database";

const connection = connect({
  host: Bun.env.DATABASE_HOST,
  username: Bun.env.DATABASE_USERNAME,
  password: Bun.env.DATABASE_PASSWORD,
});
const db = drizzle(connection);

await migrate(db, { migrationsFolder: "drizzle" });
