import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
export const pool = new Pool({
  host: process.env.DBPOST_HOST,
  port: process.env.DBPOST_PORT,
  user: process.env.DBPOST_USER,
  password: process.env.DBPOST_PASSWORD,
  database: process.env.DBPOST_NAME,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

