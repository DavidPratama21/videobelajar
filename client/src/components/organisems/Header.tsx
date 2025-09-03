import { useState } from "react";
import { Link } from "react-router";
import { Menu } from "lucide-react";
import Logo from "../atoms/Logo";
import Menus from "../molecules/Menus";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <div className="fixed w-full z-1 bg-light-primary px-6 py-4 border-y border-other-border shadow-[0_0_1px_0_rgba(62,67,74,0.31),4px_8px_12px_0_rgba(62,67,74,0.15)] sm:py-3 sm:px-30 sm:border-b sm:shadow-none">
      <div className="flex justify-between items-center sm:max-w-[1440px] sm:mx-auto sm:gap-9">
        <Logo />
        <div className="flex gap-9 items-center">
          {/* Kategori */}
          <Link
            to="/kategori"
            className="hidden sm:inline font-semibold leading-[140%] tracking-[0.2px] text-dark-secondary"
          >
            Kategori
          </Link>
          {/* Profile */}
          <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <Menu className="sm:hidden" />
            {/* Gambar revisi lagi, ambil dari LS nama filenya, dan filenya dari storage public*/}
            <img
              src={`./assets/images/user/1.png`}
              alt="Profile avatar"
              className="w-11 hidden sm:inline rounded-[10px]"
            />
          </button>
        </div>
        {isProfileOpen && <Menus />}
      </div>
    </div>
  );
};

export default Header;
