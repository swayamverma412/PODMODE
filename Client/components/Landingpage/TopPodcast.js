import React, { useEffect, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { useGlobalPlayerContext } from "/context/PlayerContext";
const TopPodcast = ({ popularPodcasts }) => {
  const { setCurrentTrack } = useGlobalPlayerContext();
  const [isListView, setIsListView] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10">
      <div className="flex flex-col items-center justify-center w-full gap-20 tablet:flex-row">
        <div className="flex items-center justify-center w-full tablet:basis-1/2">
          <p className="text-6xl font-bold uppercase">
            Our Most Popular Podcast
          </p>
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-4 tablet:basis-1/2">
          <p className="text-lg opacity-70">
            Lorem ipsum dolor, sit amet consectetur adipisicing elitconsectetur
            adipisicing elit. Accusamus, perspiciatis.
          </p>
        </div>
      </div>

      <div className="flex flex-col flex-wrap items-center justify-between w-full mt-24 tablet:flex-row rounded-xl">
        {popularPodcasts?.map((podcast, i) => {
          return (
            <div
              className={`flex flex-col items-center justify-center ${
                isListView ? "w-full" : "tablet:w-[45%] w-full"
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
    </div>
  );
};

export default TopPodcast;
