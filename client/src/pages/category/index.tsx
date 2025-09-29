import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/molecules/Card";
import Pagination from "../../components/molecules/Pagination";
import Filters from "./components/Filters";
import SortSearch from "../../components/molecules/SortSearch";
import { productStore } from "../../store/ProductStore";
import { filterProducts } from "../../utils/product";
import type { Product } from "../../types";

const Category = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setcurrentPage] = useState(1);
  const { fetchProducts, filters, setFilters, search, sort } =
    productStore();
  const products = productStore((state) => state.products)
  let filteredProducts = filterProducts(products as Product[], filters);

  if (search) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === "Harga Terendah") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }
  if (sort === "Harga Tertinggi") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }
  if (sort === "A to Z") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }
  if (sort === "Z to A") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  useEffect(() => {
    const studyField = searchParams.get("studyField");
    if (studyField) {
      setFilters({ studyFields: [studyField] });
    }
    fetchProducts();
  }, [searchParams, fetchProducts, setFilters]);
  const ITEMS_PER_PAGE = 6;

  // Pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <MainLayout>
      <div className="grid py-7 sm:py-16 px-5 sm:px-30 gap-6 sm:gap-9 sm:max-w-[1440px] sm:mx-auto">
        {/* Title & description */}
        <div className="grid gap-2.5">
          <h1 className="font-semibold text-2xl leading-[110%] text-dark-primary sm:text-[32px]">
            Koleksi Video Pembelajaran Unggulan
          </h1>
          <p className="text-sm leading-[140%] tracking-[0.2px] text-dark-secondary sm:text-base">
            Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
          </p>
        </div>
        <div className="grid sm:flex gap-6 sm:gap-10.5 sm:grid-cols-[repeat(auto-fit,auto-fit)]">
          <Filters />
          {/* List Cards - Sort & Search */}
          <div className="grid sm:h-fit sm:flex-[3] gap-6 sm:gap-8 sm:justify-items-end sm:w-full">
            {/* Sort & Search */}
            <SortSearch />
            {/* Cards */}
            <div className="grid sm:justify-start gap-5 sm:gap-y-8 sm:gap-x-6 lg:grid-cols-2 sm:w-fit">
              {currentProducts.map((product) => (
                <Card
                  key={product.id}
                  to={product.id}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  rating={product.avgRating ?? 0}
                  reviewers={product.totalReviewers ?? 0}
                  tutor_name={product.tutors?.[0]?.name ?? "Unknown"}
                  tutor_role={product.tutors?.[0]?.expertise ?? "Unknown"}
                  avatar={`/assets/images/tutors/${product.tutors?.[0]?.photo ?? "default.png"}`}
                  work_place={product.tutors?.[0]?.workPlace ?? "Unknown"}
                />
              ))}
            </div>
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              onPageChange={setcurrentPage}
              itemPerPage={ITEMS_PER_PAGE}
              totalItems={filteredProducts.length}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Category;
