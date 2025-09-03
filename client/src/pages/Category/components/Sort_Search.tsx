import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
const SortList = [
  "Harga Terendah",
  "Harga Tertinggi",
  "A to Z",
  "Z to A",
  "Rating Tertinggi",
  "Rating Terendah",
];

const Sort_Search = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    console.log(query);
  };

  return (
    <div className="flex gap-4 justify-between sm:justify-end">
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
              <li className="py-2.5 px-3 font-medium text-sm leading-[140%] tracking-[0.2px] bg-white text-dark-secondary hover:bg-other-base-background hover:text-dark-primary">
                {list}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Search */}
      {/* <button className="grid h-12 px-3 rounded-[10px] border border-other-border bg-white text-dark-secondary sm:w-[220px]">
        <div className="flex items-center gap-2 py-3 pl-[5px] sm:justify-between">
          <p className="font-medium">Cari Kelas</p>
          <Search />
        </div>
      </button> */}
      <div className="flex items-center sm:justify-between gap-2 pr-3 pl-[18px] py-3 rounded-[10px] border border-other-border bg-white text-dark-secondary">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Cari Kelas"
          className="flex-grow bg-transparent sm:max-w-48 outline-none text-base font-medium placeholder:text-dark-secondary"
          aria-label="Cari Kelas"
        />
        <Search size={20} />
      </div>
    </div>
  );
};

export default Sort_Search;
