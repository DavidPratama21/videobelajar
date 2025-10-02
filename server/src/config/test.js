import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();
const isProduction = process.env.NODE_ENV === "production";
const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

pool
  .connect()
  .then(() => console.log("berhasil konek"))
  .catch((e) => console.error("Error nih di test.js:", e));

// try {
//   const res = await pool.query("SELECT NOW()");
//   console.log("DB Connected:", res.rows[0]);
// } catch (err) {
//   console.error("DB Error:", err.message);
// }
