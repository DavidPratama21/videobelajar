import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ChevronDownIcon } from "lucide-react";
import { userStore } from "../../../store/UserStore.js";

const MobilePhoneInput = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { phone, setField } = userStore();
  type CountryOption = {
  value: string;
  label: string;
  callingCode?: string;
};

  return (
    <div className="w-full max-w-fuul">
      <PhoneInput
        international
        defaultCountry="ID"
        value={phone}
        onChange={(value) => setField("phone", value ?? "")}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        countryCallingCodeEditable={true}
        countrySelectComponent={({ value, onChange, options }) => (
          <div className="relative inline-block">
            <button
              type="button"
              className="flex items-center pr-2 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-lg">
                {value
                  ? options.find((option: CountryOption) => option.value === value)?.label
                  : "🇮🇩"}
              </span>
              <ChevronDownIcon size={16} className="ml-1" />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-full z-10 mt-1 max-h-60 w-48 overflow-y-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                {options.map((option: CountryOption) => (
                  <button
                    key={option.value}
                    type="button"
                    className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      onChange(option.value);
                      setDropdownOpen(false);
                    }}
                  >
                    <span className="mr-2 text-lg">{option.label}</span>
                    <span className="text-sm text-gray-600">
                      +{option.callingCode}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default MobilePhoneInput;
