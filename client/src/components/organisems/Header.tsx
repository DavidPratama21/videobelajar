import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import { Menu } from "lucide-react";
import Logo from "../atoms/Logo";
import Button from "../atoms/Button.js";
import Menus from "../molecules/Menus";
import PaymentProgress from "../../features/payment/components/PaymentProgress";
import { userStore } from "../../store/UserStore.js";

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { token } = userStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!token;

  const authPages = ["/login", "/register"].includes(location.pathname);
  const currentPath = location.pathname;

  // Yg bole nampilih PaymentProgress
  const paymentPaths = [
    "/pembayaran/",
    "/metodePembayaran/",
    "/pembayaranBerhasil/",
    "/ubahMetodePembayaran/",
  ];

  const tampilinPaymentProgress = paymentPaths.some((path) =>
    currentPath.startsWith(path)
  );

  if (authPages) {
    return (
      <div className="fixed z-1 w-full px-6 md:px-30 py-4 md:py-3 border-y md:border-b border-other-border bg-light-primary">
        <div className="md:max-w-[1440px] md:mx-auto">
          <Logo />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed w-full z-1 bg-light-primary px-6 md:px-30 py-4 md:py-3 border-y md:border-b border-other-border shadow-[0_0_1px_0_rgba(62,67,74,0.31),4px_8px_12px_0_rgba(62,67,74,0.15)] md:shadow-none">
      <div className="md:max-w-[1440px] flex justify-between items-center md:mx-auto md:gap-9">
        <Logo />
        {tampilinPaymentProgress ? (
          isMobile ? (
            <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <Menu />
            </button>
          ) : (
            <PaymentProgress />
          )
        ) : isLoggedIn ? (
          <div className="flex gap-9 items-center">
            {/* Kategori */}
            <Link
              to="/kategori"
              className="hidden md:inline font-semibold leading-[140%] tracking-[0.2px] text-dark-secondary"
            >
              Kategori
            </Link>
            {/* Profile */}
            <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <Menu className="md:hidden" />
              {/* Gambar revisi lagi, ambil dari LS nama filenya, dan filenya dari storage public*/}
              <img
                src={`/assets/images/user/1.png`}
                alt="Profile avatar"
                className="w-11 hidden md:inline rounded-[10px]"
              />
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link
              to="/kategori"
              className="hidden md:inline font-semibold leading-[140%] tracking-[0.2px] text-dark-secondary"
            >
              Kategori
            </Link>
            <Button
              action={() => navigate("/login")}
              className="hidden md:inline"
            >
              Login
            </Button>
            <Button
              action={() => navigate("/register")}
              style="reverse"
              className="hidden md:inline border border-primary"
            >
              Register
            </Button>
            <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <Menu className="md:hidden" />
            </button>
          </div>
        )}
        {isProfileOpen && <Menus />}
      </div>
    </div>
  );
};

export default Header;
