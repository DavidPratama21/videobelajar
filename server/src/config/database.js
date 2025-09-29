import mysql from "mysql2";
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

// export const pool = mysql
//     .createPool({
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//         waitForConnections: true,
//         connectionLimit: 10,
//         queueLimit: 0,
//     })
//     .promise();
