import { create } from "zustand";

const api_url = import.meta.env.VITE_API_URL;

export interface Tutor {
  id: number;
  avatar: string;
  name: string;
  role: string;
  workPlace: string;
}

interface TutorState {
  tutor: Tutor[]

  fetchTutor: () => Promise<void>
}

export const tutorStore = create<TutorState>((set, get) =>({
  tutor: [],

  fetchTutor: async () => {

  }
}))
