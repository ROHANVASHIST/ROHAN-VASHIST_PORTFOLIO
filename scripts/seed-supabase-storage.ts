/**
 * Seeds local JSON data files into Supabase Storage.
 * Run after executing supabase/setup.sql in the dashboard.
 *
 * Usage: npx tsx scripts/seed-supabase-storage.ts
 */
import "dotenv/config";
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "portfolio";
const DATA_TYPES = ["profile", "projects", "resume", "services", "skills", "messages", "subscribers"];

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, key);

async function seed() {
  for (const type of DATA_TYPES) {
    const filePath = path.join(process.cwd(), "src/data", `${type}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`Skipping ${type}: local file not found`);
      continue;
    }

    const body = fs.readFileSync(filePath, "utf-8");
    const storagePath = `data/${type}.json`;

    const { error } = await supabase.storage.from(BUCKET).upload(
      storagePath,
      Buffer.from(body, "utf-8"),
      { upsert: true, contentType: "application/json" },
    );

    if (error) {
      console.error(`Failed to upload ${type}:`, error.message);
      process.exit(1);
    }

    console.log(`Uploaded ${storagePath}`);
  }

  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
