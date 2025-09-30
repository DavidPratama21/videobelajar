import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import Hero from "./components/Hero";
import Newsletter from "./components/Newsletter";
import Tabs from "../../components/molecules/Tabs";
import Card from "../../components/molecules/Card";
import { productStore } from "../../store/ProductStore";

const Home = () => {
  const [activeTab, setActiveTab] = useState<string>("All Class");
  const { products, fetchProducts } = productStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const studyFields = Array.from(
    new Set(products.map((product) => product.studyField))
  );
  const TabsList = ["All Class", ...studyFields];

  const filteredProducts = products.filter((product) => {
    if (activeTab === "All Class") return true;
    return product.studyField === activeTab;
  });

  // console.log(filteredProducts)
  return (
    <MainLayout>
      <div className="grid py-7 md:py-16 px-5 md:px-30 gap-6 md:gap-16 mx-auto md:max-w-[1440px]">
        <Hero />
        <main id="main" className="grid gap-6 md:gap-8">
          {/* Title & desc */}
          <div className="grid gap-2.5">
            <h1 className="font-semibold md:font-bold text-2xl md:text-[32px] text-dark-primary leading-[110%]">
              Koleksi Video Pembelajaran Unggulan
            </h1>
            <p className="font-medium text-sm md:text-base text-dark-secondary leading-[140%] tracking-[0.2px]">
              Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
            </p>
          </div>
          <Tabs
            TabsList={TabsList}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Cards Products */}
          <div className="grid sm:grid-cols-2 md:justify-center md:flex md:flex-row md:flex-wrap mx-auto md:mx-0 gap-5 md:gap-x-6 md:gap-y-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                to={product.id}
                name={product.name}
                description={product.description}
                image={product.image}
                price={product.price}
                rating={product.avgRating || 0}
                reviewers={product.totalReviewers || 0}
                tutor_name={product.tutors?.[0]?.name ?? "Unknown"}
                tutor_role={product.tutors?.[0]?.expertise ?? "Unknown"}
                avatar={`/assets/images/tutors/${product.tutors?.[0]?.photo} ?? Unknown`}
                work_place={product.tutors?.[0]?.workPlace ?? "Unknown"}
              />
            ))}
          </div>
        </main>

        <Newsletter />
      </div>
    </MainLayout>
  );
};

export default Home;
