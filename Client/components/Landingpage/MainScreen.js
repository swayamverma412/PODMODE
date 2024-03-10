import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import TopPodcast from "./TopPodcast";
import AllPodcast from "./AllPodcast";
import { useGlobalAuthContext } from "/context/AuthContext";
import axios from "axios";
const MainScreen = () => {
  const { isLoading, setIsLoading, user } = useGlobalAuthContext();
  const [isListView, setIsListView] = useState(false);
  const [popularPodcasts, setPopularPodcasts] = useState();
  const [recentPodcasts, setRecentPodcasts] = useState([]);
  const getPopularPodcast = async () => {
    // setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/podcast/popular`
      );

      console.log("Popular Podcasts", res.data);
      setPopularPodcasts(res.data.podcasts);
    } catch (err) {
      console.log(err);
    } finally {
      // setIsLoading(false);
    }
  };

  const getRecentPodcast = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/podcast/recent`
      );

      console.log("Recent Podcasts", res.data);
      setRecentPodcasts(res.data.podcasts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPopularPodcast();
    getRecentPodcast();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full pt-16 pb-20">
      <HeroSection recentPodcasts={recentPodcasts} />
      <TopPodcast popularPodcasts={popularPodcasts} />
      <AllPodcast />
    </div>
  );
};

export default MainScreen;
