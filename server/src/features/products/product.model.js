import supabase from "../../config/supabaseClient.js";
import { pool } from "../../config/supabaseClient.js";

export async function getProducts({
  search,
  sort,
  minPrice,
  maxPrice,
  studyField,
}) {
  let query = `
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.image,
      p.studyfield,

      COALESCE(ROUND((
        SELECT AVG(r.rating) FROM rates r WHERE r.product_id = p.id
      ), 2), 0) AS avgrating,

      COALESCE((
        SELECT COUNT(r.id) FROM rates r WHERE r.product_id = p.id
      ), 0) AS totalreviews,

      COALESCE(
        (
          SELECT json_agg(
            DISTINCT jsonb_build_object(
              'id', t.id,
              'name', t.name,
              'expertise', t.expertise,
              'photo', t.photo,
              'workplace', t.workplace
            )
          )
          FROM product_tutor pt 
          JOIN tutors t ON pt.tutor_id = t.id
          WHERE pt.product_id = p.id
        ), '[]'
      ) AS tutors
    FROM products p WHERE 1=1
  `;

  const params = [];
  let paramIndex = 1;

  if (search) {
    query += ` AND (p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`;
    params.push(`%${search}%`);
    paramIndex++;
  }

  if (studyField) {
    query += ` AND p.studyfield = $${paramIndex}`;
    params.push(studyField);
    paramIndex++;
  }

  if (minPrice) {
    query += ` AND p.price >= $${paramIndex}`;
    params.push(minPrice);
    paramIndex++;
  }

  if (maxPrice) {
    query += ` AND p.price <= $${paramIndex}`;
    params.push(maxPrice);
    paramIndex++;
  }

  switch (sort) {
    case "name_asc":
      query += ` ORDER BY p.name ASC`;
      break;
    case "name_desc":
      query += ` ORDER BY p.name DESC`;
      break;
    case "price_asc":
      query += ` ORDER BY p.price ASC`;
      break;
    case "price_desc":
      query += ` ORDER BY p.price DESC`;
      break;
  }

  const { rows } = await pool.query(query, params).catch((e) => {
    console.error("Error DB:", e);
    throw e;
  });
  console.log(rows);
  return rows;
}

export async function getProduct(id) {
  const query = `
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.image,
      p.studyfield,

      COALESCE(ROUND((
        SELECT AVG(r.rating) FROM rates r WHERE r.product_id = p.id
      ), 2), 0) AS avgrating,

      COALESCE((
        SELECT COUNT(r.id) FROM rates r WHERE r.product_id = p.id
      ), 0) AS totalreviews,

      COALESCE(
        (
          SELECT json_agg(
            DISTINCT jsonb_build_object(
              'id', t.id,
              'name', t.name,
              'expertise', t.expertise,
              'photo', t.photo,
              'workplace', t.workplace
            )
          )
          FROM product_tutor pt 
          JOIN tutors t ON pt.tutor_id = t.id
          WHERE pt.product_id = p.id
        ), '[]'
      ) AS tutors
    FROM products p
    WHERE p.id = $1
  `;

  const result = await pool.query(query, [id]);
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
  const { data, error } = await supabase
    .from("products")
    .insert([
      { name, description, image, studyfield: studyField, duration, price },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateProduct(id, name, description, price) {
  const { data, error } = await supabase
    .from("products")
    .update({ name, description, price })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
}
