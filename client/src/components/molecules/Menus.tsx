// import { useNavigate } from "react-router";
import { Link } from "react-router";
import { LogOut } from "lucide-react";

const Menus = () => {
  return (
    <div className="rounded-b fixed z-2 w-full top-16 sm:right-30 sm:w-[220px] bg-white shadow-[0_0_1px_0_rgba(62,67,74,0.31),0_18px_28px_0_rgba(62,67,74,0.15)]">
      <Link
        to="/kategori"
        className="flex sm:hidden px-3 py-4 text-dark-secondary font-medium leading-[140%] tracking-[0.2px] border border-other-border"
      >
        Kategori
      </Link>
      <Link
        to="/profil"
        className="flex px-3 py-4 text-dark-secondary font-medium leading-[140%] tracking-[0.2px] border border-other-border"
      >
        Profile Saya
      </Link>
      <Link
        to="/profil"
        className="flex px-3 py-4 text-dark-secondary font-medium leading-[140%] tracking-[0.2px] border border-other-border"
      >
        Kelas Saya
      </Link>
      <Link
        to="/pesanan"
        className="flex px-3 py-4 text-dark-secondary font-medium leading-[140%] tracking-[0.2px] border border-other-border"
      >
        Pesanan Saya
      </Link>
      {/* For Admin */}
      {/* <Link
        to="/admin"
        className="flex px-3 py-4 text-dark-secondary font-medium leading-[140%] tracking-[0.2px] border border-other-border"
      >
        Admin
      </Link> */}
      <button
        onClick={() => {}}
        className="w-full flex items-center gap-[5px] px-3 py-4 text-error-default font-medium leading-[140%] tracking-[0.2px] border border-other-border"
      >
        Keluar
        <LogOut />
      </button>
    </div>
  );
};

export default Menus;
