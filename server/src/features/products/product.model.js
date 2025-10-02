import supabase from "../../config/supabaseClient.js";
import { pool } from "../../config/supabaseClient.js";

export async function getProducts({ search, sort, minPrice, maxPrice, studyField }) {
  let baseQuery = `
    SELECT
      p.id AS productid,
      p.name AS productname,
      p.description,
      p.price,
      p.image,
      p.studyfield,
      t.id AS tutorid,
      t.name AS tutorname,
      t.expertise AS tutorrole,
      t.photo AS tutorphoto,
      t.workplace AS tutorworkplace,
      COALESCE(ROUND(AVG(r.rating),2),0) AS avgrating,
      COALESCE(COUNT(r.id), 0) AS totalreviewers
    FROM products p
    LEFT JOIN product_tutor pt ON p.id = pt.product_id
    LEFT JOIN tutors t ON pt.tutor_id = t.id
    LEFT JOIN rates r ON p.id = r.product_id
    WHERE 1=1
  `;

  const params = [];
  let paramIndex = 1;

  if (search) {
    baseQuery += ` AND (p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`;
    params.push(`%${search}%`);
    paramIndex++;
  }

  if (studyField) {
    baseQuery += ` AND p.studyfield = $${paramIndex}`;
    params.push(studyField);
    paramIndex++;
  }

  if (minPrice) {
    baseQuery += ` AND p.price >= $${paramIndex}`;
    params.push(minPrice);
    paramIndex++;
  }

  if (maxPrice) {
    baseQuery += ` AND p.price <= $${paramIndex}`;
    params.push(maxPrice);
    paramIndex++;
  }

  baseQuery += `
    GROUP BY
      p.id, p.name, p.description, p.price, p.image, p.studyfield,
      t.id, t.name, t.expertise, t.photo, t.workplace
  `;

  switch (sort) {
    case "name_asc":
      baseQuery += ` ORDER BY p.name ASC`;
      break;
    case "name_desc":
      baseQuery += ` ORDER BY p.name DESC`;
      break;
    case "price_asc":
      baseQuery += ` ORDER BY p.price ASC`;
      break;
    case "price_desc":
      baseQuery += ` ORDER BY p.price DESC`;
      break;
  }

  const { rows } = await pool.query(baseQuery, params);
  return rows;
}

export async function getProduct(id) {
  const { data, error } = await supabase
    // .from("products")
    // .select(
    //   `
    //   id, name, description, price, image, studyfield,
    //   tutors (id, name, expertise, photo, workplace),
    //   rates (rating)
    // `
    // )
    // .eq("id", id)
    .from("product_with_tutor_reviews")
    .select("*")
    .eq("productid", id)
    .single();

  if (error) throw new Error(error.message);
  return data
  // return {
  //   ...data,
  //   avgRating: data.rates?.length
  //     ? data.rates.reduce((a, r) => a + r.rating, 0) / data.rates.length
  //     : 0,
  //   totalReviewers: data.rates?.length || 0,
  // };
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
