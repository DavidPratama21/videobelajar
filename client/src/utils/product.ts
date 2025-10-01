import type { Filters, Product } from "../types";
// import { productStore } from "../store/ProductStore";

// const [products] = productStore()

// Mapping filter
export const priceFilters: Record<string, {min: number; max: number}> = {
  "0 - 500k": { min: 0, max: 500_000 },
  "500k - 1jt": { min: 500_000, max: 1_000_000 },
  "1jt ke atas": { min: 1_000_000, max: Infinity },
};
export const durationFilters: Record<string, {min: number; max: number}> = {
  "5h": { min: 0, max: 300 },
  "5h - 8h": { min: 301, max: 480 },
  "8h+": { min: 481, max: Infinity },
};
export const mapFilterToRange = (
  type: "price" | "duration",
  value: string
): { min: number; max: number } | null => {
  if (type === "price") return priceFilters[value] || null;
  if (type === "duration") return durationFilters[value] || null;
  return null;
};

// utils/product.ts
// export const buildQueryParams = (filters: Filters): string => {
// // export const buildQueryParams = (filters: Record<string, any>): string => {
//   const params = new URLSearchParams();

//   // studyField
//   if (filters.studyField) params.append("studyField", filters.studyField);

//   // search
//   if (filters.search) params.append("search", filters.search);

//   // price
//   if (filters.price) {
//     const range = mapFilterToRange("price", filters.price);
//     if (range) {
//       params.append("minPrice", String(range.min));
//       if (range.max !== Infinity) params.append("maxPrice", String(range.max));
//     }
//   }

//   // duration
//   if (filters.duration) {
//     const range = mapFilterToRange("duration", filters.duration);
//     if (range) {
//       params.append("minDuration", String(range.min));
//       if (range.max !== Infinity)
//         params.append("maxDuration", String(range.max));
//     }
//   }

//   // sort
//   if (filters.sort) params.append("sort", filters.sort);

//   return params.toString();
// };

export const filterProducts = (products: Product[], filters: Filters) => {
  const noFilter =
    (!filters.studyFields || filters.studyFields.length === 0) &&
    (!filters.prices || filters.prices.length === 0) &&
    (!filters.durations || filters.durations.length === 0);
  if (noFilter) return products;
  return products.filter((product) => {
    let valid = true;

    // studyField (multi)
    if (filters.studyFields?.length > 0) {
      valid = valid && filters.studyFields.includes(product.studyfield);
    }

    // price (multi)
    if (filters.prices?.length > 0) {
      const inPriceRange = filters.prices.some((price: string) => {
        const range = mapFilterToRange("price", price);
        return (
          range && product.price >= range.min && product.price <= range.max
        );
      });
      valid = valid && inPriceRange;
    }

    // duration (multi)
    if (filters.durations?.length > 0) {
      const inDurationRange = filters.durations.some((duration: string) => {
        const range = mapFilterToRange("duration", duration);
        return (
          range &&
          product.duration >= range.min &&
          product.duration <= range.max
        );
      });
      valid = valid && inDurationRange;
    }

    return valid;
  });
};

// Formatter
export const rupiahFormat = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};
export const kRupiahFormat = (value: number) => {
  if (value >= 1_000) {
    return `Rp. ${(value / 1_000).toLocaleString("id-ID")}k`;
  }
  return `${value.toLocaleString("id-ID")}`;
};
export const calculateDiscount = (price: number, discount: number): number => {
  if (discount <= 0) return price;
  return price - (price * discount) / 100;
};
export const priceWithDiscount = (price: number, discount: number): string => {
  const finalPrice = calculateDiscount(price, discount);
  return kRupiahFormat(finalPrice);
};
