// types.ts
export interface Tutor {
  id: number;
  name: string;
  role: string;
  avatar: string;
  workPlace: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  studyField: string;
  duration: number;
  price: number;
  avgRating?: number;
  totalReviewers?: number;
  tutors?: Tutor[];
}

export type Filters = {
  studyFields: string[];
  prices: string[];
  durations: string[];
};
