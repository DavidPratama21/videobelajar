import { useState } from "react";
import { BookText, ChevronDown, Clock, ShoppingBag } from "lucide-react";
import Products from "../../../products.json";

const studyFields = Array.from(
  new Set(Products.map((product) => product.study_field))
);

interface FilterMenu {
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  list: string[];
}

const filters_menu: FilterMenu[] = [
  {
    name: "Bidang Studi",
    icon: BookText,
    list: studyFields,
  },
  {
    name: "Harga",
    icon: ShoppingBag,
    list: ["50.000 - 150.000", "150.000 - 350.000", "350.000 keatas"],
  },
  {
    name: "Durasi",
    icon: Clock,
    list: ["Kurang dari 4 jam", "4 - 8jam", "Lebih dari 8 jam"],
  },
];

const Filters = () => {
  const [openSubMenu, setOpenSubMenu] = useState<number[]>(
    filters_menu.map((_, i) => i)
  );
  console.log(openSubMenu);

  const toggleOpenSubMenu = (id: number) => {
    if (openSubMenu.includes(id)) {
      setOpenSubMenu(openSubMenu.filter((item) => item !== id));
    } else {
      setOpenSubMenu([...openSubMenu, id]);
    }
  };

  return (
    <div className="grid gap-3 rounded-[10px] bg-white border border-other-border p-4 bg-other-primarysm:p-5 sm:gap-4 sm:justify-start sm:h-fit">
      {/* Title & Reset BTN */}
      <div className="flex justify-between">
        <p className="font-semibold text-lg leading-[120%] text-dark-secondary">
          Filter
        </p>
        <button className="font-medium leading-[140%] tracking-[0.2px] text-error-default">
          Reset
        </button>
      </div>
      <div className="grid gap-3">
        {filters_menu.map(({ name, icon: Icon, list }, id) => {
          const isOpen = openSubMenu.includes(id);
          return (
            <div
              key={id}
              className="grid rounded-[10px] border border-other-border py-3 px-4 gap-4.5 bg-other-primary"
            >
              <button
                onClick={() => toggleOpenSubMenu(id)}
                className="flex gap-4 text-primary items-center justify-between"
              >
                <div className="flex gap-4 items-center font-medium">
                  <Icon size={24} />
                  <p>{name}</p>
                </div>
                <ChevronDown className={isOpen ? "rotate-180" : ""} />
              </button>
              {/* List */}
              <form
                className={`sm:grid gap-3 ${
                  isOpen ? "hidden sm:block" : "block sm:hidden"
                }`}
              >
                {list.map((item, id) => (
                  <div key={id} className="flex gap-3 items-center p-1.5">
                    <span className="size-4.5 rounded border border-primary bg-primary-100"></span>
                    <label
                      htmlFor="pemasaran"
                      className="leading-[140%] tracking-[0.2px] text-dark-secondary pr-4"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
