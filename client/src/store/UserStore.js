import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

export const useStore = create((set, get) => ({
    // Form states
    email: "",
    password: "",
    name: "",
    phone: "",
    gender: "male",
    confirmPassword: "",
    avatar: null,

    setField: (field, value) =>
        set((state) => ({
            ...state,
            [field]: value,
        })),

    resetForm: () =>
        set({
            email: "",
            password: "",
            name: "",
            phone: "",
            gender: "male",
            confirmPassword: "",
        }),

    login: async (navigate) => {
        const { email, password, resetForm } = get();

        try {
            const res = await axios.post(`${api_url}/login`, {
                email,
                password,
            });
            // console.log(res);
            if (!res.data.user) {
                toast.error(res.data.message || "Login gagal");
                return;
            }
            const user = res.data.user;
            const token = res.data.token;

            localStorage.setItem("Login", true);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);

            toast.success("Login Success");
            resetForm();
            navigate("/");
        } catch (e) {
            toast.error(e.response?.data?.message || "Login gagal");
        }
    },

    register: async (navigate) => {
        const {
            name,
            email,
            gender,
            phone,
            password,
            confirmPassword,
            resetForm,
        } = get();

        if (password !== confirmPassword) {
            toast.warning("Password & Konfirm Password mesti sama");
            return;
        }

        try {
            if (
                !name ||
                !email ||
                !phone ||
                !gender ||
                !password ||
                !confirmPassword
            ) {
                toast.warning("Semua field wajib diisi!");
                return;
            }
            await axios.post(`${api_url}/register`, {
                name,
                email,
                gender,
                phone,
                password,
            });
            toast.success("Register Success");
            resetForm();
            navigate("/login");
        } catch (e) {
            toast.error(e.response?.data?.message || "Gagal Regis");
        }
    },

    logout: (navigate) => {
        localStorage.removeItem("Login");
        localStorage.removeItem("user");
        toast.info("Anda telah Log Out");
        if (navigate) navigate("/login");
    },

    updateProfile: async (id, onSuccess) => {
        const { name, email, phone, password, confirmPassword } = get();
        if (password && password !== confirmPassword) {
            toast.error("Password & Konfirmasi Password harus sama");
            return;
        }
        try {
            const { data } = await axios.put(`${api_url}/users/${id}`, {
                name,
                email,
                phone,
                password,
            });
            const userLs = JSON.parse(localStorage.getItem("user"));
            const updatedUser = { ...userLs, name, email };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            toast.success("Update Profile Success", { autoClose: 2500 });

            setTimeout(() => {
                if (onSuccess) onSuccess(name, email);
            }, 3000);
        } catch (e) {
            if (e.response?.data?.message?.includes("email")) {
                toast.error("Email sudah terdaftar!");
            } else {
                toast.error("Gagal mengupdate profil.");
            }
        }
    },

    setAvatarPreview: (file) => {
        if (file){
            const previewUrl = URL.createObjectURL(file)
            set({avatar: previewUrl})
        }
    },

    uploadAvatar: async(userId, file) => {
        if (!file) {
            toast.warning("Pilih dulu gambarnya")
            return
        }

        try{
            const formData = new FormData()
            formData.append("image", file)

            const token = localStorage.getItem("token")
            const user = JSON.parse(localStorage.getItem("user"))
            const method = user.avatar ? "put" : "post";
            const res = await axios[method](`${api_url}/users/${userId}/avatar`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const avatarUrl = `${api_url}${res.data.path}`

            // Update URL avatar di LS
            const updatedUser = {...user, avatar: avatarUrl}
            localStorage.setItem("user", JSON.stringify(updatedUser))

            toast.success("Foto profil berhasil di update")
            set({avatar: avatarUrl})
        }catch (e) {
            toast.error("Gagal di upload foto profilnya")
        }
    },
}));
