// types.ts
export interface Tutor {
  id: number;
  name: string;
  expertise: string;
  photo: string;
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
// interface Filters {
//   search: string;
//   studyField: string;
//   minPrice: string;
//   maxPrice: string;
//   sort: string;
//   price: string;
//   duration: string;
// }

export interface FormData {
  name: string;
  description: string;
  image: string;
  studyField: string;
  duration: number;
  price: number;
}
