import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Keep Prisma CLI operations on local SQLite. The running app connects to
    // Turso through @prisma/adapter-libsql in src/lib/prisma.ts.
    url: process.env.LOCAL_DATABASE_URL ?? "file:./dev.db",
  },
});
