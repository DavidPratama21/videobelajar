import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Hero from "./components/Hero";
import Tabs from "../../components/molecules/Tabs";
import Newsletter from "./components/Newsletter";
import Card from "../../components/molecules/Card";
import Products from "../../products.json";

const studyFields = Array.from(
  new Set(Products.map((product) => product.study_field))
)

const TabsList = ["All Class", ...studyFields];

const Home = () => {
  const [activeTab, setActiveTab] = useState<string>("All Class");

  const filteredProducts = Products.filter((product) => {
    if (activeTab === "All Class") return true;
    return product.study_field === activeTab;
  });
  
  return (
    <MainLayout>
      <div className="grid py-7 sm:py-16 px-5 sm:px-30 gap-6 sm:gap-16 mx-auto sm:max-w-[1440px]">
        <Hero />
        <main className="grid gap-6 sm:gap-8">
          {/* Title & desc */}
          <div className="grid gap-2.5">
            <h1 className=" font-semibold text-2xl text-dark-primary leading-[110%] sm:text-[32px] sm:font-bold">
              Koleksi Video Pembelajaran Unggulan
            </h1>
            <p className="font-medium text-dark-secondary text-sm leading-[140%] tracking-[0.2px] sm:text-base">
              Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
            </p>
          </div>
          <Tabs
            TabsList={TabsList}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Cards Products */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap mx-auto sm:mx-0 gap-5 sm:gap-x-6 sm:gap-y-8">
            {filteredProducts.map((product) => (
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
        </main>

        <Newsletter />
      </div>
    </MainLayout>
  );
};

export default Home;
