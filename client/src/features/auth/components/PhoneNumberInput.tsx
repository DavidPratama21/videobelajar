import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import phoneCode from "../../../phoneCode.json";

const PhoneNumberInput = () => {
  const [selectedCode, setSelectedCode] = useState(phoneCode[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="grid">
      <label
        htmlFor="phone"
        className="text-sm text-dark-secondary leading-[140%] tracking-[0.2px] after:content-['*'] after:text-red-500 after:ml-1 sm:text-base"
      >
        No. Hp
      </label>

      <div className="flex gap-2 items-center border border-other-border rounded-[6px] px-2 py-1 relative">
        {/* Selected Country */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2"
        >
          <ReactCountryFlag
            countryCode={selectedCode.code}
            svg
            style={{ width: "1.5em", height: "1.5em" }}
          />
          <span>{selectedCode.dial_code}</span>
        </button>

        {/* Input Phone */}
        <input
          type="tel"
          id="phone"
          placeholder="8123456789"
          className="flex-1 outline-none bg-transparent"
        />

        {/* Dropdown */}
        {open && (
          <ul className="absolute top-full left-0 w-full bg-white border border-other-border rounded-md shadow-md max-h-48 overflow-y-auto z-10">
            {phoneCode.map((c) => (
              <li
                key={c.code}
                onClick={() => {
                  setSelectedCode(c);
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-100"
              >
                <ReactCountryFlag
                  countryCode={c.code}
                  svg
                  style={{ width: "1.2em", height: "1.2em" }}
                />
                <span>{c.name}</span>
                <span>{c.dial_code}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberInput;
