import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AllContext = React.createContext();

const AllProvider = ({ children }) => {
  return <AllContext.Provider value={{}}>{children}</AllContext.Provider>;
};

export const useGlobalAllContext = () => {
  return useContext(AllContext);
};

export { AllContext, AllProvider };
