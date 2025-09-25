// src/store/UserStore.ts
import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  gender?: "male" | "female";
  avatar?: string | null;
}

interface UserState {
  // states
  user: User | null;
  token: string | null;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  gender: "male" | "female";
  avatar: string | File | null;

  // actions
  setField: <K extends keyof UserState>(field: K, value: UserState[K]) => void;
  resetForm: () => void;
  login: (navigate?: (path: string) => void) => Promise<void>;
  register: (navigate?: (path: string) => void) => Promise<void>;
  logout: (navigate?: (path: string) => void) => void;
  updateProfile: (
    id: number,
    onSuccess?: (user: User) => void
  ) => Promise<void>;
  setAvatarPreview: (file: File | null) => void;
  uploadAvatar: (userId: number, file: File | null) => Promise<void>;
}

export const userStore = create<UserState>((set, get) => ({
  // states
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  phone: "",
  gender: "male",
  avatar: null,

  // actions
  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),

  resetForm: () =>
    set({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      gender: "male",
      avatar: null,
    }),

  login: async (navigate) => {
    const { email, password, resetForm } = get();
    try {
      const res = await axios.post(`${api_url}/login`, {
        email,
        password,
      });

      if (!res.data.user) {
        toast.error(res.data.message || "Login gagal");
        return;
      }

      const { user, token } = res.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      set({ user, token });
      toast.success("Login Success");
      resetForm();
      if (navigate) navigate("/");
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Login gagal");
    }
  },

  register: async (navigate) => {
    const { name, email, phone, gender, password, confirmPassword, resetForm } =
      get();

    if (password !== confirmPassword) {
      toast.warning("Password & Konfirm Password mesti sama");
      return;
    }

    try {
      await axios.post(`${api_url}/register`, {
        name,
        email,
        phone,
        gender,
        password,
      });

      toast.success("Register Success");
      resetForm();
      if (navigate) navigate("/login");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data?.message || "Gagal Register");
      } else {
        toast.error("Gagal Register (unexpected error)");
      }
    }
  },

  logout: (navigate) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });

    toast.info("Anda telah Log Out");
    if (navigate) navigate("/login");
  },

  updateProfile: async (id, onSuccess) => {
    const { name, email, phone, password, confirmPassword, token, user } =
      get();

    if (password && password !== confirmPassword) {
      toast.error("Password & Konfirmasi Password harus sama");
      return;
    }

    try {
      const { data } = await axios.put(
        `${api_url}/users/${id}`,
        { name, email, phone, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser: User = { ...user!, name, email, phone };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      set({ user: updatedUser });
      toast.success("Update Profile Success", { autoClose: 2500 });

      if (onSuccess) onSuccess(updatedUser);
    } catch (e: any) {
      if (e.response?.data?.message?.includes("email")) {
        toast.error("Email sudah terdaftar!");
      } else {
        toast.error("Gagal mengupdate profil.");
      }
    }
  },

  setAvatarPreview: (file) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      set({ avatar: previewUrl });
    }
  },

  uploadAvatar: async (userId, file) => {
    if (!file) {
      toast.warning("Pilih dulu gambarnya");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const { token, user } = get();
      const method = user?.avatar ? "put" : "post";

      const res = await axios[method](
        `${api_url}/users/${userId}/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const avatarUrl = `${api_url}${res.data.path}`;
      const updatedUser: User = { ...user!, avatar: avatarUrl };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      set({ user: updatedUser, avatar: avatarUrl });

      toast.success("Foto profil berhasil di update");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data?.message || "Gagal upload foto profil");
      } else if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Gagal upload foto profil");
      }
    }
  },
}));
