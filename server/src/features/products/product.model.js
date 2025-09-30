import { pool } from "../../config/database.js";
import supabase from "../../config/supabaseClient.js";

// export async function getProducts({
//   search,
//   sort,
//   minPrice,
//   maxPrice,
//   studyField,
// }) {
//   let query = `
//     SELECT
//       p.id AS productid,
//       p.name AS productname,
//       p.description,
//       p.price,
//       p.image,
//       p.studyfield,
//       t.id AS tutorid,
//       t.name AS tutorname,
//       t.expertise AS tutorrole,
//       t.photo AS tutorphoto,
//       t.workplace AS tutorworkplace,
//       COALESCE(ROUND(AVG(r.rating),2),0) AS avgrating,
//       COALESCE(COUNT(r.id), 0) AS totalreviewers
//     FROM products p
//     LEFT JOIN product_tutor pt ON p.id = pt.product_id
//     LEFT JOIN tutors t ON pt.tutor_id = t.id
//     LEFT JOIN rates r ON p.id = r.product_id
//     WHERE 1=1
//     GROUP BY
//     p.id, p.name, p.description, p.price, p.image, p.studyfield,
//     t.id, t.name, t.expertise, t.photo, t.workplace;
//   `;
//   let values = [];
//   if (search) {
//     values.push(`%${search}%`, `%${search}%`);
//     query += ` AND (p.name ILIKE $${
//       values.length - 1
//     } OR p.description ILIKE $${values.length})`;
//   }

//   if (studyField) {
//     values.push(studyField);
//     query += ` AND p.studyfield = $${values.length}`;
//   }
//   if (minPrice) {
//     values.push(Number(minPrice));
//     query += ` AND p.price >= $${values.length}`;
//   }
//   if (maxPrice) {
//     values.push(Number(maxPrice));
//     query += ` AND p.price <= $${values.length}`;
//   }

//   switch (sort) {
//     case "name_asc":
//       query += " ORDER BY p.name ASC";
//       break;
//     case "name_desc":
//       query += " ORDER BY p.name DESC";
//       break;
//     case "price_asc":
//       query += " ORDER BY p.price ASC";
//       break;
//     case "price_desc":
//       query += " ORDER BY p.price DESC";
//       break;
//   }

//   // PostGres
//   const result = await pool.query(query, values);
//   const rows = result.rows;

//   // NEW
//   const productsMap = {};
//   rows.forEach((row) => {
//     if (!productsMap[row.productid]) {
//       productsMap[row.productid] = {
//         id: row.productid,
//         name: row.productname,
//         description: row.description,
//         price: row.price,
//         image: row.image,
//         studyField: row.studyfield,
//         avgRating: row.avgrating ? Number(row.avgrating) : 0,
//         totalReviewers: row.totalreviewers ? Number(row.totalreviewers) : 0,
//         tutors: [],
//       };
//     }
//     if (row.tutorid) {
//       console.log()
//       productsMap[row.productid].tutors.push({
//         id: row.tutorid,
//         name: row.tutorname,
//         expertise: row.tutorrole,
//         photo: row.tutorphoto,
//         workPlace: row.tutorworkplace,
//       });
//     }
//   });

//   return Object.values(productsMap);
// }

export async function getProducts ({search, sort, minPrice, maxPrice, studyField }){
  let query = supabase.from("products")
}

export async function getProduct(id) {
  const result = await pool.query(`SELECT * FROM products WHERE id = $1`, [id]);
  return result.rows[0];
}


export async function createProduct({
  name,
  description,
  image,
  studyField,
  duration,
  price,
}) {
  const query = `
    INSERT INTO products (name, description, image, studyfield, duration, price) VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;
  const values = [name, description, image, studyField, duration, price];
  const result = await pool.query(query, values);
  const id = result.rows[0].id;
  return getProduct(id);
}

export async function updateProduct(id, name, description, price) {
  const query = `
    UPDATE products
    SET name = $1, description = $2, price = $3
    WHERE id = $4
  `;
  await pool.query(query, [name, description, price, id]);
  return getProduct(id);
}

export async function deleteProduct(id) {
  const query = `DELETE FROM products WHERE id = $1`;
  await pool.query(query, [id]);
}
