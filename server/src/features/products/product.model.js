import supabase from "../../config/supabaseClient.js";

export async function getProducts({
  search,
  sort,
  minPrice,
  maxPrice,
  studyField,
}) {
  let query = supabase.from("products").select(`
    id, name, description, price, image, studyfield,
      tutors (id, name, expertise, photo, workplace),
      rates (rating)
    `);

  if (search) {
    // query = query
    //   .ilike("name", `%${search}%`)
    //   .ilike("description", `%${search}%`);
    // Note: Supabase `or` bisa dipakai kalau butuh kombinasi search
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }
  if (studyField) query = query.eq("studyfield", studyField);
  if (minPrice) query = query.gte("price", Number(minPrice));
  if (maxPrice) query = query.lte("price", Number(maxPrice));

  // sorting
  switch (sort) {
    case "name_asc":
      query = query.order("name", { ascending: true });
      break;
    case "name_desc":
      query = query.order("name", { ascending: false });
      break;
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
  }
  const { data, error } = await query;
  if (error) throw new Error(error.message);

  // hitung avg rating + total reviewers
  return data.map((p) => ({
    ...p,
    avgRating: p.rates?.length
      ? p.rates.reduce((a, r) => a + r.rating, 0) / p.rates.length
      : 0,
    totalReviewers: p.rates?.length || 0,
  }));
}

export async function getProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, name, description, price, image, studyfield,
      tutors (id, name, expertise, photo, workplace),
      rates (rating)
    `
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return {
    ...data,
    avgRating: data.rates?.length
      ? data.rates.reduce((a, r) => a + r.rating, 0) / data.rates.length
      : 0,
    totalReviewers: data.rates?.length || 0,
  };
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
