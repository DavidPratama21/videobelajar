import { pool } from "../../config/database.js";

// CREATE USER
export async function createUser({ name, email, phone, gender, password, avatar=null }) {
  const [result] = await pool.query(
    `INSERT INTO users (name, email, phone, gender, password, avatar) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, phone, gender || "male", password, avatar || null]
  );
  return result.insertId;
}

// FIND USER
export async function findUserByEmail(email) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0];
}

export async function findUserById(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0] || null;
}

// UPDATE USER
export async function updateUser(data, id) {
  const fields = [];
  const values = [];
  const allowedFields = ["name", "email", "phone", "avatar", "password"];

  for (const key of allowedFields) {
    if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  }

  if (fields.length === 0) return null;

  const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  const [result] = await pool.query(query, values);
  return result;
}
