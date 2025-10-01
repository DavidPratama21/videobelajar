import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MainLayout from "../../layouts/MainLayout";
import Breadcrumbs from "./components/Breadcrumbs";
import Hero from "./components/Hero";
import DetailInfo from "./components/DetailInfo";
import ProductDescription from "./components/ProductDescription";
import TutorDescription from "./components/TutorDescription";
import Curriculum from "./components/Curriculum";
import RatingAndReview from "./components/RatingAndReview";
import RelatedProduct from "./components/RelatedProduct";
import { productStore } from "../../store/ProductStore";
import type { Product } from "../../types";


const DetailProducts = () => {
  const { id } = useParams();
  const { products, fetchProducts } = productStore();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (products.length > 0 && id) {
      const product = products.find((p) => p.productid === Number(id));
      setProduct(product ?? null);
    }
  }, [products, id]);
  return (
    <MainLayout>
      <div className="md:max-w-[1440px] grid py-7 md:py-16 px-5 md:px-30 gap-6 md:gap-9 mx-auto">
        {product && (
          <Breadcrumbs product={product.productname} studyField={product.studyfield} />
        )}
        <Hero name={product?.productname ?? ""} image={product?.image ?? ""} />
        <div className="grid md:flex gap-6 md:gap-9">
          <DetailInfo
            name={product?.productname ?? ""}
            price={product?.price ?? 0}
            id={product?.productid ?? 0}
          />
          <div className="grid gap-6 md:gap-9">
            <ProductDescription desc={product?.description ?? ""} />
            <TutorDescription />
            <Curriculum />
            <RatingAndReview />
          </div>
        </div>
        <RelatedProduct
          studyField={product?.studyfield ?? ""}
          currentId={product?.productid ?? 0}
        />
      </div>
    </MainLayout>
  );
};

export default DetailProducts;
