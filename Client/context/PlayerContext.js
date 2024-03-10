import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const PlayerContext = React.createContext();

const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const useGlobalPlayerContext = () => {
  return useContext(PlayerContext);
};

export { PlayerContext, PlayerProvider };
