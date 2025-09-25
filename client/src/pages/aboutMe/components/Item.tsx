import { Link, useLocation } from "react-router";
import type { LucideIcon } from "lucide-react";

interface ItemProps {
  Icon: LucideIcon;
  name: string;
  to: string;
}

const Item = ({ Icon, name, to }: ItemProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-3 rounded ${
        currentPath === to ? "bg-secondary-100 border border-secondary" : ""
      }`}
    >
      <Icon color={currentPath === to ? "#FFBD3A" : "#3A354161"} />
      <p
        className={`text-lg font-bold leading-[140%] tracking-[0.2px] ${
          currentPath === to ? "text-secondary" : "text-dark-disabled"
        }`}
      >
        {name}
      </p>
    </Link>
  );
};

export default Item;
