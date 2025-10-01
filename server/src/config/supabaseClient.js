import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
const supabaseUrl = process.env.APP_SUPABASE_URL;
const supabaseKey = process.env.APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
