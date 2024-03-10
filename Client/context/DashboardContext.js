import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const DashboardContext = React.createContext();

const DashboardProvider = ({ children }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successAleart, setSuccessAleart] = useState("");
  const [allUserPodcast, setAllUsersPodcast] = useState([]);

  return (
    <DashboardContext.Provider
      value={{
        showCreateModal,
        setShowCreateModal,
        successAleart,
        setSuccessAleart,
        allUserPodcast,
        setAllUsersPodcast,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useGlobalDashboardContext = () => {
  return useContext(DashboardContext);
};

export { DashboardContext, DashboardProvider };
