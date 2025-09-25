import { create } from "zustand";
import React from "react";

// Definisikan tipe state + action
interface StoreState {
  isOpen: boolean;
  toggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const useStore = create<StoreState>((set) => ({
  isOpen: false,
  toggle: (e) => {
    e.preventDefault();
    set((state) => ({
      isOpen: !state.isOpen,
    }));
  },
}));
