import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserModel from "./users.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "rahasia";

// Register
export async function register(req, res) {
  try {
    const { name, email, phone, gender, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Isi dulu datanya yang lengkap" });
    }

    const userExist = await UserModel.findUserByEmail(email);
    if (userExist) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    const hash = await bcrypt.hash(password, 10);
    const userId = await UserModel.createUser({
      name,
      email,
      phone: phone || null,
      gender,
      password: hash,
    });

    res.status(201).json({ message: "Registrasi berhasil", user_id: userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Isi Email & Password nya!" });
    }

    const user = await UserModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Email ga ketemu" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      message: "Login Success",
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get Me
export async function getMe(req, res) {
  try {
    const user = await UserModel.findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    res.json({
      id: user.user_id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update user
export async function updateUser(req, res) {
  try {
    // const id = req.params.id;
    const id = req.user.id;
    const { name, email, phone, avatar, password } = req.body;

    const existing = await UserModel.findUserByEmail(email);
    if (existing && existing.user_id != id) {
      return res.status(400).json({ message: "Email sudah dipakai user lain" });
    }

    const hash = password ? await bcrypt.hash(password, 10) : null;
    await UserModel.updateUser(
      { name, email, phone, avatar, password: hash },
      id
    );

    res.json({ success: true, message: "User berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
