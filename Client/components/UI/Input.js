import React from "react";

const Input = ({
  label,
  placeholder,
  required = false,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="relative flex flex-col items-start justify-start w-full gap-1 ">
      <p>
        {label}
        {required && (
          <span className="text-lg -translate-y-2 text-Primary">*</span>
        )}
      </p>
      <input
        type={type}
        placeholder={placeholder}
        id={label}
        name={label}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-Blue"
      />
    </div>
  );
};

export default Input;
