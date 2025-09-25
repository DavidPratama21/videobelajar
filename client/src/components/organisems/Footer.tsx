import { useState, useEffect } from "react";
import { productStore } from "../../store/ProductStore";
import {
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Logo from "../atoms/Logo";

const Footer = () => {
  const [active, setActive] = useState<string | null>(null);
  const toggleMenu = (menu: string) => setActive(active === menu ? null : menu);
  const { products, fetchProducts } = productStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const studyFields = Array.from(
    new Set(products.map((product) => product.studyField))
  );
  const Menus = [
    {
      name: "Kategori",
      subMenu: studyFields,
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

  return (
    <div className="!w-full bg-other-primary border-t border-other-border">
      {/* Frame */}
      <div className="md:max-w-[1440px] grid gap-4 md:gap-5 p-5 md:px-30 md:py-15 md:mx-auto">
        <div className="grid md:flex md:justify-between gap-4">
          <div className="grid gap-4">
            <Logo />
            <div className="grid gap-2 md:gap-3 text-sm md:text-base text-dark-primary leading-[140%] tracking-[0.2px]">
              <p className="font-bold md:text-lg md:whitespace-normal">
                Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
              </p>
              <p>Jl. Usman Effendi Np. 50 Lowokwaru, Malang</p>
              <p>+62-877-7123-1234</p>
            </div>
          </div>

          {/* Kategori, Perusahaan, Komunitas */}
          <div className="grid md:flex gap-3 md:gap-12">
            {Menus.map((menu) => (
              <div
                key={menu.name}
                className={`grid gap-3 md:gap-[15px] ${
                  menu.name === "Komunitas" ? "md:content-start" : ""
                }`}
              >
                <button
                  onClick={() => toggleMenu(menu.name)}
                  className="w-full flex justify-between"
                >
                  <p className="font-bold">{menu.name}</p>
                  <p className="md:hidden font-extrabold text-[#3A3541]/58">
                    {active === menu.name ? <ChevronDown /> : <ChevronRight />}
                  </p>
                </button>
                {/* List */}
                <ul
                  className={`md:flex flex-col gap-[13px] font-medium text-dark-secondary leading-[140%] tracking-[0.2px] ${
                    active === menu.name ? "flex" : "hidden"
                  }`}
                >
                  {menu.subMenu.map((item, _) => {
                    return <li key={_}>{item}</li>;
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ----- */}
        <span className="sm:mt-8 border border-other-border"></span>

        <div className="grid sm:flex sm:justify-between gap-3">
          {/* Sosial Media */}
          <div className="flex gap-[15px] sm:order-2">
            {/* Linkedin */}
            <span className="w-[35px] grid place-items-center aspect-square rounded-3xl border-[1.5px] border-dark-primary">
              <Linkedin fill="#222325" size={20} strokeWidth={0.5} />
            </span>

            {/* Facebook */}
            <span className="w-[35px] grid place-items-center aspect-square rounded-3xl border-[1.5px] border-dark-primary">
              <Facebook fill="#222325" size={20} strokeWidth={0.5} />
            </span>

            {/* Instagram */}
            <span className="w-[35px] grid place-items-center aspect-square rounded-3xl border-[1.5px] border-dark-primary">
              <Instagram size={20} strokeWidth={2.5} />
            </span>

            {/* Twitter */}
            <span className="w-[35px] grid place-items-center aspect-square rounded-3xl border-[1.5px] border-dark-primary">
              <Twitter size={20} strokeWidth={2.5} />
            </span>
          </div>

          {/* Copyrights */}
          <p className="sm:order-1 font-medium text-dark-secondary leading-[140%] tracking-[0.2px]">
            @2023 Gerobak Sayur All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
