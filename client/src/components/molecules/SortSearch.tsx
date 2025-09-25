import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { productStore } from "../../store/ProductStore";

const SortList = [
  "Harga Terendah",
  "Harga Tertinggi",
  "A to Z",
  "Z to A",
  "Rating Tertinggi",
  "Rating Terendah",
];

const SortSearch = () => {
  const { search, setSearch, setSort } = productStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="h-fit flex gap-4 justify-between sm:justify-end">
      {/* Sort */}
      <div className="relative">
        {/* Button */}
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="flex items-center gap-2 pr-3 py-3 pl-[17px] rounded-[10px] border border-other-border bg-white text-dark-secondary"
        >
          <p className="font-medium">Urutkan</p>
          <ChevronDown />
        </button>
        {/* Sort List */}
        {open && (
          <ul className="absolute z-2 grid w-fit py-1 rounded-[10px] bg-white shadow-[0_0_1px_0_rgba(62,67,74,.31),0_18px_28px_0_rgba(62,67,74,.15)]">
            {SortList.map((list) => (
              <li
                key={list}
                onClick={() => {
                  setSort(list);
                  setOpen(false);
                }}
                className="py-2.5 px-3 font-medium text-sm leading-[140%] tracking-[0.2px] bg-white text-dark-secondary hover:bg-other-base-background hover:text-dark-primary"
              >
                {list}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Search */}
      <div className="h-fit flex items-center sm:justify-between gap-2 pr-3 pl-[18px] py-3 rounded-[10px] border border-other-border bg-white text-dark-secondary">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari Kelas"
          className="flex-grow bg-transparent sm:max-w-48 outline-none text-base font-medium placeholder:text-dark-secondary"
          aria-label="Cari Kelas"
        />
        <Search size={20} />
      </div>
    </div>
  );
};

export default SortSearch;
