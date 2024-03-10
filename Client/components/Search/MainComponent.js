import React, { useState, useEffect } from "react";
import Input from "../UI/Input";
import Loader from "../UI/Loader";
import { useGlobalAuthContext } from "/context/AuthContext";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import axios from "axios";
const MainComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [allPodcast, setAllPodcast] = useState([]);
  const [filteredPodcast, setFilteredPodcast] = useState(allPodcast);
  const [isListView, setIsListView] = useState(true);

  useEffect(() => {
    if (searchText) {
      const temp = allPodcast.filter((podcast) =>
        podcast.name.toLowerCase().includes(searchText)
      );
      console.log(temp);
      setFilteredPodcast(temp);
    } else setFilteredPodcast(allPodcast);
  }, [searchText, allPodcast]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAllPodcast = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/podcast`
        );

        console.log(res.data);
        setAllPodcast(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getAllPodcast();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-full pb-20 mt-52">
      {/* TOP SECTION */}
      <div className="flex flex-col items-center justify-center w-full gap-20 tablet:flex-row">
        <div className="flex items-center justify-center w-full basis-1/2">
          <p className="text-6xl font-bold uppercase">
            Search for a podcast here
          </p>
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-4 basis-1/2">
          <p className="text-lg opacity-70">
            write the name of your podcast here to search
          </p>
          <div className="flex items-center justify-center gap-4 text-black">
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between w-full mt-24 rounded-xl">
        {filteredPodcast.map((podcast, i) => {
          return (
            <div
              className={`flex flex-col items-center justify-center ${
                isListView ? "w-full" : "w-[45%]"
              } `}
              key={i}
            >
              <div className="flex items-center justify-between w-full px-2 pr-10">
                <div className="flex items-center justify-center gap-8">
                  <p className="text-4xl font-bold">0{i + 1}.</p>
                  {podcast.type.toLowerCase() !== "audio" ? (
                    <p className="p-5 text-4xl bg-gray-400 rounded-xl">
                      <BsFillCameraVideoFill />
                    </p>
                  ) : (
                    <p className="p-5 text-4xl bg-gray-400 rounded-xl">
                      <BsMusicNoteBeamed />
                    </p>
                  )}

                  <div className="flex flex-col items-start justify-start w-full gap-1 text-lg">
                    <p className="font-semibold">{podcast.name}</p>
                    <p className="opacity-60">#{podcast.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    console.log("podcast", podcast);
                    setCurrentTrack(podcast);
                  }}
                  className="flex items-center justify-center p-1.5 text-xl bg-white border-[6px] rounded-full text-Black/90 border-Black/80"
                >
                  <IoPlay />
                </button>
              </div>

              <div className="w-[95%] my-12 h-[2px]  rounded-full bg-white/20"></div>
            </div>
          );
        })}
      </div>
      {/*  */}

      {/*  */}
    </div>
  );
};

export default MainComponent;
