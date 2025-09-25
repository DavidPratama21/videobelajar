import { pool } from "../../config/database.js";

export async function getProducts({
  search,
  sort,
  minPrice,
  maxPrice,
  studyField,
}) {
  // let query = "SELECT * FROM products WHERE 1=1";
  let query = `
    SELECT
      p.id AS productId,
      p.name AS productName,
      p.description,
      p.price,
      p.image,
      p.studyField,
      t.id AS tutorId,
      t.name AS tutorName,
      t.role AS tutorRole,
      t.avatar AS tutorAvatar,
      t.workPlace AS tutorWorkPlace,
      r.value AS avgRating,
      r.amount AS totalReviewers
    FROM products p
    LEFT JOIN product_tutor pt ON p.id = pt.productId
    LEFT JOIN tutors t ON pt.tutorId = t.id
    LEFT JOIN rates r ON p.id = r.productId
    WHERE 1=1
  `;
  let values = [];

  if (search) {
    query += " AND (name LIKE ? OR description LIKE ?)";
    values.push(`%${search}%`, `%${search}%`);
  }

  if (studyField) {
    query += " AND p.studyField = ?";
    values.push(studyField);
  }

  if (minPrice) {
    query += " AND p.price >= ?";
    values.push(Number(minPrice));
  }

  if (maxPrice) {
    query += " AND p.price <= ?";
    values.push(Number(maxPrice));
  }

  switch (sort) {
    case "name_asc":
      query += " ORDER BY p.name ASC";
      break;
    case "name_desc":
      query += " ORDER BY p.name DESC";
      break;
    case "price_asc":
      query += " ORDER BY p.price ASC";
      break;
    case "price_desc":
      query += " ORDER BY p.price DESC";
      break;
  }
  const [rows] = await pool.query(query, values);

  // NEW
  const productsMap = {};
  rows.forEach((row) => {
    if (!productsMap[row.productId]) {
      productsMap[row.productId] = {
        id: row.productId,
        name: row.productName,
        description: row.description,
        price: row.price,
        image: row.image,
        studyField: row.studyField,
        avgRating: row.avgRating ? Number(row.avgRating) : 0,
        totalReviewers: row.totalReviewers ? Number(row.totalReviewers) : 0,
        tutors: [],
      };
    }
    if (row.tutorId) {
      productsMap[row.productId].tutors.push({
        id: row.tutorId,
        name: row.tutorName,
        role: row.tutorRole,
        avatar: row.tutorAvatar,
        workPlace: row.tutorWorkPlace,
      });
    }
  });

  return Object.values(productsMap);
}

export async function getProduct(id) {
  const [rows] = await pool.query(`SELECT * FROM products WHERE id = ?`, [id]);
  return rows[0];
}

export async function createProduct({
  name,
  description,
  image,
  studyField,
  duration,
  price,
}) {
  const [result] = await pool.query(
    `INSERT INTO products (name, description, image, studyField, duration, price) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, image, studyField, duration, price]
  );
  return getProduct(result.insertId);
}

export async function updateProduct(id, name, description, price) {
  await pool.query(
    `UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?`,
    [name, description, price, id]
  );
  return getProduct(id);
}

export async function deleteProduct(id) {
  await pool.query("DELETE FROM products WHERE id = ?", [id]);
}
