import React, { useState, useEffect } from "react";
import { BsArrowUpRight, BsMusicNoteBeamed } from "react-icons/bs";

import { PODCASTS_LIST } from "/seed/data";
import PrimaryButton from "../UI/Button/PrimaryButton";
import { useGlobalAuthContext } from "/context/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
import Loader from "../UI/Loader";
import { useGlobalPlayerContext } from "/context/PlayerContext";
import { BsFillCameraVideoFill } from "react-icons/bs";

const HeroSection = ({ recentPodcasts }) => {
  const { user, setShowBecomeCreator, isLoading } = useGlobalAuthContext();
  const [showSwitch, setShowSwitch] = useState(false);
  const { currentTrack, setCurrentTrack } = useGlobalPlayerContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSwitch((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const router = useRouter();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="z-10 flex flex-col items-start justify-center w-full h-screen gap-10">
      {/* <p className="w-full font-black leading-snug text-left uppercase max-w-7xl text-7xl">
        We&apos;ve got a greate show for you today.
      </p> */}
      <div className="w-full max-w-full text-5xl font-black leading-snug text-left uppercase tablet:max-w-7xl tablet:text-7xl">
        <p>
          Let&apos;s turn the POD<span className="text-green-500">MODE</span>
        </p>
        <div className="w-[120px] overflow-hidden flex items-center justify-start mt-8">
          <p
            className={`w-[120px] flex ${
              showSwitch
                ? "flex-row justify-start"
                : "flex-row-reverse justify-end"
            } items-center  text-left absolute transition-all duration-200 ease-in ${
              showSwitch ? "translate-x-[130px]" : "translate-x-0"
            }`}
          >
            n<span>.</span>
          </p>
          <div
            className={`flex absolute items-center ${
              showSwitch ? "justify-end" : "justify-start"
            }  transition-all duration-200 ease-in w-[120px] p-2 h-[60px] border-[2px] border-white rounded-full ${
              showSwitch ? "translate-x-0" : "translate-x-[90px]"
            }`}
          >
            <div
              className={` rounded-full w-[50px] h-[50px] ${
                showSwitch ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-10 tablet:flex-row ">
        <div className="flex flex-col items-start justify-start w-full basis-2/3">
          <p className="mt-2 text-lg opacity-70">
            Listen and create the best podcasts in both audio and video format.
            Lets go!
          </p>

          <div className="z-10 flex items-center justify-start w-full gap-6 my-10">
            <PrimaryButton handleClick={() => router.push("/all")}>
              Show All Podcast <BsArrowUpRight className="text-2xl" />
            </PrimaryButton>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-4 basis-1/3">
          <p className="text-lg font-bold">Most recent podcast</p>
          <div className="flex flex-col items-start justify-start w-full overflow-y-auto h-52">
            {/*  */}
            {recentPodcasts?.map((podcast, i) => {
              return (
                <div
                  onClick={() => setCurrentTrack(podcast)}
                  className="w-full pr-10 cursor-pointer"
                  key={i}
                >
                  <div className="flex items-center justify-center gap-6">
                    <p className="text-4xl font-black">{i + 1}.</p>
                    {podcast.type.toLowerCase() !== "audio" ? (
                      <p className="p-5 text-4xl bg-gray-400 rounded-xl">
                        <BsFillCameraVideoFill />
                      </p>
                    ) : (
                      <p className="p-5 text-4xl bg-gray-400 rounded-xl">
                        <BsMusicNoteBeamed />
                      </p>
                    )}

                    <div className="flex flex-col items-start justify-start w-full text-lg">
                      <p className="font-semibold">{podcast.name}</p>
                      <p className="opacity-60">#{podcast.category}</p>
                    </div>
                  </div>

                  {i !== recentPodcasts?.length - 1 && (
                    <div className="w-full my-4 h-[2px] rounded-full bg-white/20"></div>
                  )}
                </div>
              );
            })}

            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
