import { useLocation } from "react-router";
import MainLayout from "../../layouts/MainLayout";
import Menu from "./components/Menu";
import Profil from "./sections/Profil";
import Kelas from "./sections/Kelas";
import Pesanan from "./sections/Pesanan";

const AboutMe = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const pageConfig: Record<
    string,
    { title: string; description: string; component: React.ReactNode }
  > = {
    "/profil": {
      title: "Ubah Profil",
      description: "Ubah data diri Anda",
      component: <Profil />,
    },
    "/kelas": {
      title: "Daftar Kelas",
      description:
        "Akses Materi Belajar dan Mulailah Meningkatkan Pengetahuan Anda!",
      component: <Kelas />,
    },
    "/pesanan": {
      title: "Daftar Pesanan",
      description: "Informasi terperinci mengenai pembelian",
      component: <Pesanan />,
    },
  };

  const currentPage = pageConfig[currentPath] ?? {
    title: "Halaman Tidak Ditemukan",
    description: "Konten tidak tersedia",
    component: <div>404</div>,
  };

  return (
    <MainLayout>
      <div className="sm:max-w-[1440px] grid md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr] py-7 sm:py-16 px-5 sm:px-30 gap-6 sm:gap-9 sm:mx-auto">
        <Menu title={currentPage.title} description={currentPage.description} />
        {currentPage.component}
      </div>
    </MainLayout>
  );
};

export default AboutMe;
