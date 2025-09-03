import { create } from "zustand";

export const useStore = create((set) => ({
    isOpen: false,
    toggle: (e) => {
        e.preventDefault();
        set((state) => {
            const newValue = !state.isOpen;
            // console.log("Modal isOpen:", newValue);
            return { isOpen: newValue };
        });
    },
}));
