import { useState } from "react";
import { BookText, ChevronDown, Clock, ShoppingBag } from "lucide-react";
import { priceFilters, durationFilters } from "../../../utils/product";
import { productStore } from "../../../store/ProductStore";

const Filters = () => {
  const [openSubMenu, setOpenSubMenu] = useState({
    studyField: true,
    price: true,
    duration: true,
  });

  const { products, filters, setFilters, resetFilters } = productStore();

  const studyFields = Array.from(
    new Set(products.map((product) => product.studyfield))
  );

  const toggleSubMenu = (key: keyof typeof openSubMenu) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleStudyField = (field: string) => {
    const newFields = filters.studyFields.includes(field)
      ? filters.studyFields.filter((f) => f !== field)
      : [...filters.studyFields, field];

    setFilters({ studyFields: newFields });
  };
  const togglePrice = (price: string) => {
    const newPrices = filters.prices.includes(price)
      ? filters.prices.filter((p) => p !== price)
      : [...filters.prices, price];

    setFilters({ prices: newPrices });
  };
  const toggleDuration = (duration: string) => {
    const newDurations = filters.durations.includes(duration)
      ? filters.durations.filter((d) => d !== duration)
      : [...filters.durations, duration];

    setFilters({ durations: newDurations });
  };

  return (
    <div className="sm:h-fit grid sm:flex-1 gap-3 sm:gap-4 p-4 sm:p-5 rounded-[10px] border border-other-border bg-other-primary ">
      {/* Title & Reset BTN */}
      <div className="flex justify-between">
        <p className="font-semibold text-lg leading-[120%] text-dark-secondary">
          Filter
        </p>
        <button
          onClick={resetFilters}
          className="font-medium leading-[140%] tracking-[0.2px] text-error-default"
        >
          Reset
        </button>
      </div>
      <div className="grid gap-3 sm:text-nowrap">
        {/* Bidang Studi */}
        <div className="grid rounded-[10px] border border-other-border py-3 px-4 gap-4.5 bg-other-primary">
          <button
            onClick={() => toggleSubMenu("studyField")}
            className="flex gap-4 text-primary items-center justify-between"
          >
            <div className="flex gap-4 items-center font-medium">
              <BookText size={24} />
              <p>Bidang Studi</p>
            </div>
            <ChevronDown
              className={
                openSubMenu.studyField
                  ? "rotate-180 transition-all"
                  : "transition-all rotate-0"
              }
            />
          </button>
          {openSubMenu.studyField && (
            <form className={`hidden sm:grid gap-3`}>
              {studyFields.map((key, id) => (
                <div
                  key={id}
                  // onClick={() => filterStudyField( products, key)}
                  onClick={() => toggleStudyField(key)}
                  className="flex gap-3 items-center p-1.5"
                >
                  <span
                    className={`size-4.5 rounded border  ${
                      filters.studyFields.includes(key)
                        ? "border-primary-100 bg-primary"
                        : "border-primary bg-primary-100"
                    } `}
                  ></span>
                  <label
                    className={`leading-[140%] tracking-[0.2px] pr-4 ${
                      filters.studyFields.includes(key)
                        ? "text-primary font-bold"
                        : "text-dark-secondary "
                    }`}
                  >
                    {key}
                  </label>
                </div>
              ))}
            </form>
          )}
        </div>

        {/* Harga */}
        <div className="grid rounded-[10px] border border-other-border py-3 px-4 gap-4.5 bg-other-primary">
          <button
            onClick={() => toggleSubMenu("price")}
            className="flex gap-4 text-primary items-center justify-between"
          >
            <div className="flex gap-4 items-center font-medium">
              <ShoppingBag size={24} />
              <p>Harga</p>
            </div>
            <ChevronDown
              className={
                openSubMenu.price
                  ? "rotate-180 transition-all"
                  : "transition-all rotate-0"
              }
            />
          </button>
          {openSubMenu.price && (
            <form className={`hidden sm:grid gap-3`}>
              {Object.keys(priceFilters).map((key, id) => (
                <div
                  key={id}
                  onClick={() => togglePrice(key)}
                  className="flex gap-3 items-center p-1.5"
                >
                  <span
                    className={`size-4.5 rounded border ${
                      filters.prices.includes(key)
                        ? "border-primary-100 bg-primary"
                        : "border-primary bg-primary-100"
                    }`}
                  ></span>
                  <label
                    htmlFor="pemasaran"
                    className={`leading-[140%] tracking-[0.2px] pr-4 ${
                      filters.prices.includes(key)
                        ? "text-primary font-bold"
                        : "text-dark-secondary"
                    }`}
                  >
                    {key}
                  </label>
                </div>
              ))}
            </form>
          )}
        </div>

        {/* Durasi */}
        <div className="grid rounded-[10px] border border-other-border py-3 px-4 gap-4.5 bg-other-primary">
          <button
            onClick={() => toggleSubMenu("duration")}
            className="flex gap-4 text-primary items-center justify-between"
          >
            <div className="flex gap-4 items-center font-medium">
              <Clock size={24} />
              <p>Durasi</p>
            </div>
            <ChevronDown
              className={
                openSubMenu.duration
                  ? "rotate-180 transition-all"
                  : "transition-all rotate-0"
              }
            />
          </button>
          {openSubMenu.duration && (
            <form className={`sm:grid gap-3 hidden`}>
              {Object.keys(durationFilters).map((key, id) => (
                <div
                  key={id}
                  onClick={() => toggleDuration(key)}
                  className="flex gap-3 items-center p-1.5"
                >
                  <span
                    className={`size-4.5 rounded border ${
                      filters.durations.includes(key)
                        ? "border-primary-100 bg-primary"
                        : "border-primary bg-primary-100"
                    }`}
                  ></span>
                  <label
                    htmlFor="pemasaran"
                    className={`leading-[140%] tracking-[0.2px] pr-4 ${
                      filters.durations.includes(key)
                        ? "text-primary font-bold"
                        : "text-dark-secondary"
                    }`}
                  >
                    {key}
                  </label>
                </div>
              ))}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
