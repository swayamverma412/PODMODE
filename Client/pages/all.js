import React from "react";

import MainScreen from "/components/All/MainScreen";

const AllPage = () => {
  return (
    <div className="flex items-center justify-center w-full px-2">
      <div className="w-full max-w-[1400px] flex items-center justify-between px-8 pt-20">
        <div className="tablet:w-[700px] w-full rounded-full absolute top-0 left-0 h-[700px] bg-white/5 blur-3xl "></div>
        <MainScreen />
      </div>
    </div>
  );
};

export default AllPage;
