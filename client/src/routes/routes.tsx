import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Login from "../features/auth/pages/Login";
import Regist from "../features/auth/pages/Regist";
import Payment from "../features/payment/Payment";
import Home from "../pages/home/Home.tsx";
import Category from "../pages/category/Category.tsx";
import DetailProducts from "../pages/detailProducts/DetailProducts.tsx";
import AboutMe from "../pages/aboutMe/AboutMe.tsx";
import PembayaranBerhasil from "../features/payment/PembayaranBerhasil";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/kategori",
    element: <Category />,
  },
  {
    path: "/detail/:id",
    element: <DetailProducts />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Regist />
      </PublicRoute>
    ),
  },
  {
    path: "/profil",
    element: (
      <ProtectedRoute>
        <AboutMe />
      </ProtectedRoute>
    ),
  },
  {
    path: "/kelas",
    element: (
      <ProtectedRoute>
        <AboutMe />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pesanan",
    element: (
      <ProtectedRoute>
        <AboutMe />
      </ProtectedRoute>
    ),
  },
  {
    path: "/metodePembayaran/:id",
    element: (
      <ProtectedRoute>
        <Payment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pembayaran/:id",
    element: (
      <ProtectedRoute>
        <Payment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ubahMetodePembayaran/:id",
    element: (
      <ProtectedRoute>
        <Payment />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pembayaranBerhasil/:id",
    element: (
      <ProtectedRoute>
        <PembayaranBerhasil />
      </ProtectedRoute>
    ),
  },
]);
