import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import MainLayout from "../../layouts/MainLayout";
import MetodePembayaran from "./sections/MetodePembayaran";
import Pembayaran from "./sections/Pembayaran";
import PaymentProgress from "./components/PaymentProgress";
import ProductCard from "./components/ProductCard";
import PaymentTimer from "./components/PaymentTimer";
import { productStore } from "../../store/ProductStore";
import type { Product } from "../../types";

const Payment = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null | undefined>(null);
  const { products, fetchProducts } = productStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (products.length > 0 && id) {
      const product = products.find((p) => p.productid === Number(id));
      setProduct(product ?? null);
    }
  }, [products, id]);

  const pageConfig: Record<string, { component: React.ReactNode }> = {
    [`/pembayaran/${id}`]: { component: <Pembayaran /> },
    [`/metodePembayaran/${id}`]: {
      component: (
        <MetodePembayaran
          id={product?.productid ?? 0}
          name={product?.productname ?? ""}
          price={product?.price ?? 0}
        />
      ),
    },
  };

  const currentPage = pageConfig[currentPath] ?? {
    component: <div>404</div>,
  };
  return (
    <MainLayout>
      {currentPath === `/pembayaran/${id}` ? <PaymentTimer /> : ""}
      <div className="grid md:grid-cols-[1fr_1.5fr] py-7 md:py-16 px-5 md:px-30 gap-6 md:gap-9 md:max-w-[1440px] md:mx-auto">
        <PaymentProgress className="md:hidden" />
        <ProductCard
          name={product?.productname ?? ""}
          price={product?.price ?? 0}
          image={product?.image ?? ""}
        />
        {currentPage.component}
      </div>
    </MainLayout>
  );
};

export default Payment;
