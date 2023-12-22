import { Config, defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/db.schema.ts",
  out: "drizzle",
}) satisfies Config;
