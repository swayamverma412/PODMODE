import React from "react";

const PrimaryButton = ({
  disabled = false,
  isLoading = false,
  handleClick,
  text,
  size = "large",
  color = "white",
  fullWidth = false,
  children,
}) => {
  return size !== "small" ? (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`px-12 text-lg py-3 ${
        fullWidth && "w-full"
      }  flex items-center justify-center gap-2 font-semibold  border-[2px] ${
        color === "white"
          ? "border-white text-white hover:bg-white hover:text-Black"
          : "border-Black text-Black hover:bg-Black hover:text-white"
      } rounded-xl duration-200 transition-all ease-out`}
    >
      {isLoading ? (
        <div
          className={`w-8 h-8 border-2 border-b-0 border-r-0 rounded-full animate-spin  ${
            color === "white"
              ? "hover:border-black border-white "
              : "hover:border-white border-Black "
          }`}
        />
      ) : (
        children
      )}
    </button>
  ) : (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`px-10  py-2 ${
        fullWidth && "w-full"
      }  flex items-center justify-center gap-2 font-semibold border-[2px] ${
        color === "white"
          ? "border-white text-white hover:bg-white hover:text-Black"
          : "border-Black text-Black hover:bg-Black hover:text-white"
      } rounded-xl duration-200 transition-all ease-out`}
    >
      {isLoading ? (
        <div
          className={`w-6 h-6 border-2 border-b-0 border-r-0 rounded-full animate-spin  ${
            color === "white" ? "border-white " : "border-Black "
          }`}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
