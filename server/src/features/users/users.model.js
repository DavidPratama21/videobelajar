import supabase from "../../config/supabaseClient.js";

// CREATE USER
export async function createUser({
  name,
  email,
  phone,
  gender,
  password,
  avatar = null,
}) {
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        name,
        email,
        phone,
        gender: gender || "male",
        password,
        avatar,
      },
    ])
    .select("id") // langsung return id user baru
    .single();

  if (error) throw new Error(error.message);
  return data.id;
}

// FIND USER BY EMAIL
export async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") throw new Error(error.message);
  return data || null;
}

// FIND USER BY ID
export async function findUserById(id) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") throw new Error(error.message);
  return data || null;
}

// UPDATE USER
export async function updateUser(data, id) {
  const allowedFields = ["name", "email", "phone", "avatar", "password"];

  // filter hanya field yang ada nilainya
  const updateData = {};
  for (const key of allowedFields) {
    if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
      updateData[key] = data[key];
    }
  }

  if (Object.keys(updateData).length === 0) return null;

  const { data: updated, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", id)
    .select("id");

  if (error) throw new Error(error.message);
  return updated?.length ? updated[0].id : null;
}
