import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/molecules/Card";
import Pagination from "../../components/molecules/Pagination";
import Filters from "./components/Filters";
import Sort_Search from "./components/Sort_Search";
import Products from "../../products.json";

const Category = () => {
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(8);
  

  
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
        <div className="grid sm:flex gap-6 sm:gap-10.5">
          <Filters />
          {/* List Cards - Sort & Search */}
          <div className="grid gap-6 sm:gap-8">
            {/* Sort & Search */}
            <Sort_Search />
            {/* Cards */}
            <div className="grid sm:justify-start gap-5 sm:gap-y-8 sm:gap-x-6 sm:grid-cols-2">
              {Products.map((product) => (
                <Card
                  name={product.name}
                  description={product.description}
                  image={`./assets/images/products/${product.image}`}
                  price={product.price}
                  rating={product.rate.value}
                  reviewers={product.rate.amount}
                  tutor_name={product.tutor.name}
                  tutor_role={product.tutor.role}
                  avatar={`./assets/images/tutors/${product.tutor.avatar}`}
                  work_place={product.tutor.work_place}
                />
              ))}
            </div>
            {/* Pagination */}
            <Pagination cardData={Products}/>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Category;
