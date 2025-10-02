import { createClient } from "@supabase/supabase-js";
import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.APP_SUPABASE_URL,
  ssl:{rejectUnauthorized: false}
})

dotenv.config();
const supabaseUrl = process.env.APP_SUPABASE_URL;
const supabaseKey = process.env.APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
