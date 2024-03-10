import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const SelectComponent = ({ label, options, selected, onSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative flex flex-col items-start justify-start ">
      <p>{label}</p>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center justify-center gap-2 px-3 bg-gray-300 rounded-standard/4 whitespace-nowrap"
      >
        {selected}
        <span className="border-l-[1px] border-slate-400/60 pl-3 ml-1 py-3">
          <FaChevronDown />
        </span>
      </button>
      {showDropdown && (
        <ul className="absolute left-0 right-0 z-10 flex flex-col items-center justify-center bg-white border-gray-300 shadow-lg backdrop-blur-lg top-16 rounded-standard/2">
          {options.map((item, i) => {
            return (
              <li
                className="hover:bg-gray-100 cursor-pointer w-full py-3 px-4 border-b border-[1px] border-slate-200 "
                key={i}
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectComponent;
