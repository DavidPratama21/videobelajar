// types.ts
export interface Tutor {
  tutorid: number;
  tutorname: string;
  tutorrole: string;
  tutorphoto: string;
  tutorworkplace: string;
}

export interface Product {
  productid: number;
  productname: string;
  description: string;
  image: string;
  studyfield: string;
  duration: number;
  price: number;
  avgrating?: number;
  totalreviewers?: number;
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
