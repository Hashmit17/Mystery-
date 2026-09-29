import "dotenv/config";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN ?? process.env.DATABASE_AUTH_TOKEN;

if (!url || !url.startsWith("libsql://")) {
  throw new Error("Set TURSO_DATABASE_URL to your libsql:// Turso database URL first.");
}

if (!authToken) {
  throw new Error("Set TURSO_AUTH_TOKEN before initializing the production database.");
}

const client = createClient({ url, authToken });
const sql = await readFile(resolve("prisma/turso-init.sql"), "utf8");
const statements = sql
  .split(";")
  .map((statement) => statement.trim())
  .filter(Boolean);

for (const statement of statements) {
  await client.execute(statement);
}

async function ensureColumn(table: string, column: string, definition: string) {
  const result = await client.execute(`PRAGMA table_info("${table}")`);
  const exists = result.rows.some((row) => String(row.name) === column);
  if (!exists) {
    await client.execute(`ALTER TABLE "${table}" ADD COLUMN "${column}" ${definition}`);
    console.log(`Added ${table}.${column}`);
  }
}

await ensureColumn("Profile", "gender", "TEXT");
await ensureColumn("Preference", "interestedGenders", "TEXT NOT NULL DEFAULT '[]'");

console.log(`Initialized Turso schema (${statements.length} statements).`);
client.close();
