import { Album, ShoppingBag, User } from "lucide-react";
import Item from "./Item";

interface MenuProps {
  title: string;
  description: string;
}

const Menu = ({ title, description }: MenuProps) => {
  return (
    <div className="h-fit grid gap-6">
      {/* Title & Desc */}
      <div className="grid gap-2.5">
        <h5 className="text-dark-primary text-xl font-semibold leading-[120%]">
          {title}
        </h5>
        <p className="text-dark-secondary leading-[140%] tracking-[0.2px]">
          {description}
        </p>
      </div>
      {/* Menu */}
      <div className="grid p-5 sm:p-6 gap-2 bg-other-primary border border-other-border rounded-[10px]">
        <Item name="Profile Saya" to="/profil" Icon={User} />
        <Item name="Kelas Saya" to="/kelas" Icon={Album} />
        <Item name="Pesanan Saya" to="/pesanan" Icon={ShoppingBag} />
      </div>
    </div>
  );
};

export default Menu;
