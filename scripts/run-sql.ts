import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import pg from "pg";

const { Client } = pg;

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const envPath = resolve(process.cwd(), file);
    if (!existsSync(envPath)) continue;

    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

async function main() {
  loadEnv();

  const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

  if (!databaseUrl) {
    console.error(
      "Missing DATABASE_URL in .env or .env.local\n\n" +
        "Get it from Supabase Dashboard → Project Settings → Database → Connection string (URI)\n" +
        "Use the 'Transaction' pooler URL and replace [YOUR-PASSWORD] with your database password."
    );
    process.exit(1);
  }

  const file = process.argv[2] || "supabase/schema.sql";
  const sqlPath = resolve(process.cwd(), file);

  if (!existsSync(sqlPath)) {
    console.error(`SQL file not found: ${sqlPath}`);
    process.exit(1);
  }

  const sql = readFileSync(sqlPath, "utf-8");
  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  console.log(`Connecting to Supabase...`);
  console.log(`Running: ${file}\n`);

  try {
    await client.connect();
    await client.query(sql);
    console.log("SQL executed successfully.");
  } catch (err) {
    console.error("SQL execution failed:");
    console.error(err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
