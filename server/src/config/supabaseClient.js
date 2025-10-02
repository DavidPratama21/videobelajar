import { createClient } from "@supabase/supabase-js";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

const supabaseUrl = process.env.APP_SUPABASE_URL;
const supabaseKey = process.env.APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

let pool;
const isProduction = process.env.NODE_ENV === "production";
if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    // connectionString: process.env.APP_SUPABASE_URL,
    connectionString: process.env.SUPABASE_DB_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  });
  pool
    .connect()
    .then(() => console.log("berhasil konek"))
    .catch((e) => console.error("Error nih di test.js:", e));
} else {
  pool = new Pool({
    host: process.env.DBPOST_HOST,
    port: process.env.DBPOST_PORT,
    user: process.env.DBPOST_USER,
    password: process.env.DBPOST_PASSWORD,
    database: process.env.DBPOST_NAME,
  });
}

export { pool };
export default supabase;
