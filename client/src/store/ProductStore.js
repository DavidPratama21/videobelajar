import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const api_url = import.meta.env.VITE_API_URL;

export const useStore = create((set, get) => ({
    products: [],
    formData: {
        name: "",
        description: "",
        price: "",
    },
    filters: {
        search: "",
        bidangStudi: "",
        minPrice: "",
        maxPrice: "",
        sort: "",
    },
    productEdit: null,

    fetchProducts: async () => {
        try {
            const token = localStorage.getItem("token");
            const { filters } = get();
            const response = await axios.get(`${api_url}/products`, {
                params: filters,
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ products: response.data });
        } catch (e) {
            console.error("Error nya tu ini :", e.message);
        }
    },

    handleAdd: async (e) => {
        e.preventDefault();
        const newProduct = get().formData;
        try {
            const res = await axios.post(`${api_url}/products`, newProduct);
            set((state) => ({
                products: [...state.products, res.data.data],
                formData: { name: "", description: "", price: "" },
            }));
            toast.success("Produk berhasil di tambahin");
        } catch (e) {
            console.error("Error nya tu ini :", e.message);
        }
    },

    handleChange: (e) => {
        // console.log(e.target.name, e.target.value)
        const { name, value } = e.target;
        set((state) => ({
            formData: { ...state.formData, [name]: value },
        }));
    },

    handleEdit: (product) => {
        // e.preventDefault()
        set({
            productEdit: product,
            formData: {
                name: product.name,
                description: product.description,
                price: product.price,
            },
        });
    },

    handleUpdate: async (e) => {
        e.preventDefault();
        const { productEdit, formData, fetchProducts } = get();
        if (!productEdit) return;

        const { name, description, price } = formData;
        if (!name || !description || !price) {
            toast.warning("Semua field wajib diisi!");
            return;
        }

        try {
            await axios.put(`${api_url}/products/${productEdit.id}`, formData);
            await fetchProducts();
            set({
                productEdit: null,
                formData: { name: "", description: "", price: "" },
            });
            alert("Produk berhasil diperbarui!");
        } catch (err) {
            console.error("Gagal update produk:", err.message);
        }
    },

    cancelEdit: () => {
        set({
            productEdit: null,
            formData: {
                title: "",
                desc: "",
                price: "",
            },
        });
    },

    handleDelete: async (id) => {
        const confirmDelete = confirm("Yakin mau delete?");
        if (!confirmDelete) return;
        try {
            await axios.delete(`${api_url}/products/${id}`);
            set((state) => ({
                products: state.products.filter((p) => p.id !== id),
            }));
            toast.success("Sukses hapus produk");
        } catch (err) {
            toast.error("Gagal delete product:");
            console.error("Errornya karena :", e.message);
        }
    },

    setFilter: (name, value) =>
        set((state) => ({
            filters: { ...state.filters, [name]: value },
        })),
}));
