import { useState } from "react";
import {
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Logo from "../atoms/Logo";

const Menus = [
  {
    name: "Kategori",
    subMenu: [
      "Digital & Teknologi",
      "Pemasaran",
      "Manajemen Bisnis",
      "Pengembangan Diri",
      "Desain",
    ],
  },
  {
    name: "Perusahaan",
    subMenu: [
      "Tentang Kami",
      "FAQ",
      "Kebijakan Privasi",
      "Ketentuan Layanan",
      "Bantuan",
    ],
  },
  {
    name: "Komunitas",
    subMenu: ["Tips Sukses", "Blog"],
  },
];

const Footer = () => {
  const [active, setActive] = useState<string | null>(null);
  const toggleMenu = (menu: string) => setActive(active === menu ? null : menu);

  return (
    <div className="relative bg-other-primary border-t border-other-border !w-full">
      {/* Frame */}
      <div className="grid gap-4 p-5 sm:mx-auto sm:max-w-[1440px] sm:gap-5 sm:px-30 sm:py-15 ">
        {/* 2280 */}
        <div className="grid gap-4 sm:flex sm:justify-between">
          {/* 1673 Logo & 3858 */}
          <div className="grid gap-4">
            <Logo />

            {/* 3858 Quote, Address, Phone */}
            <div className="grid gap-2 text-sm leading-[140%] tracking-[0.2px] text-dark-primary sm:gap-3 sm:text-base">
              <p className="font-bold sm:text-lg sm:w-[352px]">
                Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
              </p>
              <p>Jl. Usman Effendi Np. 50 Lowokwaru, Malang</p>
              <p>+62-877-7123-1234</p>
            </div>
          </div>

          {/* 1155, Kategori, Perusahaan, Komunitas */}
          <div className="grid gap-3 sm:flex sm:gap-12">
            {Menus.map((menu) => (
              <div
                key={menu.name}
                className={`grid gap-3 sm:gap-[15px] ${
                  menu.name === "Komunitas" ? "sm:content-start" : ""
                }`}
              >
                <button
                  onClick={() => toggleMenu(menu.name)}
                  className="flex justify-between w-full"
                >
                  <p className="font-bold">{menu.name}</p>
                  <p className="sm:hidden font-extrabold text-[#3A3541]/58">
                    {active === menu.name ? <ChevronDown /> : <ChevronRight />}
                  </p>
                </button>
                {/* List */}
                <ul
                  className={`sm:flex flex-col gap-[13px] font-medium text-dark-secondary leading-[140%] tracking-[0.2px] ${
                    active === menu.name ? "flex" : "hidden"
                  }`}
                >
                  {menu.subMenu.map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 3857 / Divider/Horizontal */}
        <span className="border border-other-border sm:mt-8"></span>

        {/* 1152, Copyright & Sosial Media */}
        <div className="grid gap-3 sm:flex sm:justify-between">
          {/* 1151, Sosial Media */}
          <div className="flex gap-[15px] sm:order-2">
            {/* Linkedin */}
            <span className="grid place-items-center w-[35px] aspect-square rounded-3xl border-[1.5px] border-dark-primary">
              <Linkedin fill="#222325" size={20} strokeWidth={0.5} />
            </span>

            {/* Facebook */}
            <span className="grid place-items-center w-[35px] aspect-square rounded-3xl border-[1.5px] border-dark-primary">
              <Facebook fill="#222325" size={20} strokeWidth={0.5} />
            </span>

            {/* Instagram */}
            <span className="grid place-items-center w-[35px] aspect-square rounded-3xl border-[1.5px] border-dark-primary">
              <Instagram size={20} strokeWidth={2.5} />
            </span>

            {/* Twitter */}
            <span className="grid place-items-center w-[35px] aspect-square rounded-3xl border-[1.5px] border-dark-primary">
              <Twitter size={20} strokeWidth={2.5} />
            </span>
          </div>

          {/* Copyrights */}
          <p className="font-medium text-dark-secondary leading-[140%] tracking-[0.2px] sm:order-1">
            @2023 Gerobak Sayur All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
