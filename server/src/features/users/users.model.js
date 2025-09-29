import { pool } from "../../config/database.js";

// CREATE USER
// export async function createUser({ name, email, phone, gender, password, avatar=null }) {
//   const [result] = await pool.query(
//     `INSERT INTO users (name, email, phone, gender, password, avatar) VALUES (?, ?, ?, ?, ?, ?)`,
//     [name, email, phone, gender || "male", password, avatar || null]
//   );
//   return result.insertId;
// }
export async function createUser({ name, email, phone, gender, password, avatar = null }) {
  const query = `
    INSERT INTO users (name, email, phone, gender, password, avatar)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;
  const values = [name, email, phone, gender || "male", password, avatar];
  const result = await pool.query(query, values);
  return result.rows[0].id;
}
// FIND USER
// export async function findUserByEmail(email) {
//   const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
//   return rows[0];
// }
export async function findUserByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0] || null;
}
// export async function findUserById(id) {
//   const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
//   return rows[0] || null;
// }
export async function findUserById(id) {
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

// UPDATE USER
// export async function updateUser(data, id) {
//   const fields = [];
//   const values = [];
//   const allowedFields = ["name", "email", "phone", "avatar", "password"];

//   for (const key of allowedFields) {
//     if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
//       fields.push(`${key} = ?`);
//       values.push(data[key]);
//     }
//   }

//   if (fields.length === 0) return null;

//   const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
//   values.push(id);

//   const [result] = await pool.query(query, values);
//   return result;
// }
export async function updateUser(data, id) {
  const fields = [];
  const values = [];
  const allowedFields = ["name", "email", "phone", "avatar", "password"];

  for (const key of allowedFields) {
    if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
      fields.push(`${key} = $${values.length + 1}`); // placeholder dinamis
      values.push(data[key]);
    }
  }

  if (fields.length === 0) return null;

  // Tambahkan id sebagai parameter terakhir
  values.push(id);
  const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $${values.length}`;

  const result = await pool.query(query, values);
  return result.rowCount; // jumlah row yang terupdate
}