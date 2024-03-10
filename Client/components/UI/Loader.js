import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
    </div>
  );
};

export default Loader;
