import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { buildQueryParams } from "../utils/product";

const api_url = import.meta.env.VITE_API_URL;

// ==== TIPE DATA ====
interface Tutor {
  id: number;
  name: string;
  role: string;
  avatar: string;
  workPlace: string
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  studyField: string;
  duration: number;
  price: number;
  avgRating: number;
  totalReviewers: number;
  tutors: Tutor[]
}

interface FormData {
  name: string;
  description: string;
  image: string;
  studyField: string;
  duration: number;
  price: number;
}

export type Filters = {
  studyFields: string[];
  prices: string[];
  durations: string[];
};
// interface Filters {
//   search: string;
//   studyField: string;
//   minPrice: string;
//   maxPrice: string;
//   sort: string;
//   price: string;
//   duration: string;
// }

interface ProductState {
  products: Product[];
  formData: FormData;
  filters: Filters;
  search: string;
  sort: string;
  productEdit: Product | null;

  fetchProducts: () => Promise<void>;
  setProducts: (products: Product[]) => void;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  setSearch: (search: string) => void;
  setSort: (sort: string) => void;

  handleAdd: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleEdit: (product: Product) => void;
  handleUpdate: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  cancelEdit: () => void;
  handleDelete: (id: number) => Promise<void>;
}

// ==== STORE ====
export const productStore = create<ProductState>((set, get) => ({
  products: [],
  filters: {
    studyFields: [],
    prices: [],
    durations: [],
  },
  search: "",
  sort: "",
  formData: {
    name: "",
    description: "",
    image: "",
    studyField: "",
    duration: 0,
    price: 0,
  },
  productEdit: null,

  fetchProducts: async () => {
    try {
      const token = localStorage.getItem("token");
      const { filters } = get();

      const params = buildQueryParams(filters);

      const response = await axios.get<Product[]>(`${api_url}/products`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ products: response.data });
    } catch (e: any) {
      console.error("Error nya tu ini :", e.message);
    }
  },
  setProducts: (products) => set({ products }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  setSearch: (search) => set({ search }),
  setSort: (sort) => set({ sort }),
  resetFilters: () =>
    set({
      filters: { studyFields: [], prices: [], durations: [] },
    }),

  handleAdd: async (e) => {
    e.preventDefault();
    const newProduct = get().formData;
    try {
      const res = await axios.post<{ data: Product }>(
        `${api_url}/products`,
        newProduct
      );
      set((state) => ({
        products: [...state.products, res.data.data],
        formData: {
          name: "",
          description: "",
          image: "",
          studyField: "",
          duration: 0,
          price: 0,
        },
      }));
      toast.success("Produk berhasil di tambahin");
    } catch (e: any) {
      console.error("Error nya tu ini :", e.message);
    }
  },

  handleChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    }));
  },

  handleEdit: (product) => {
    set({
      productEdit: product,
      formData: {
        name: product.name,
        description: product.description,
        image: product.image,
        studyField: product.studyField,
        duration: product.duration,
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
        formData: {
          name: "",
          description: "",
          image: "",
          studyField: "",
          duration: 0,
          price: 0,
        },
      });
      alert("Produk berhasil diperbarui!");
    } catch (err: any) {
      console.error("Gagal update produk:", err.message);
    }
  },

  cancelEdit: () => {
    set({
      productEdit: null,
      formData: {
        name: "",
        description: "",
        image: "",
        studyField: "",
        duration: 0,
        price: 0,
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
    } catch (e: any) {
      toast.error("Gagal delete product:");
      console.error("Errornya karena :", e.message);
    }
  },
}));
