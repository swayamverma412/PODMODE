import React, { useState, useEffect } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { useGlobalPlayerContext } from "/context/PlayerContext";
import Modal from "../UI/Modal";
import { useGlobalAuthContext } from "/context/AuthContext";
import CreateNewModal from "./CreateNewModal";
import { useGlobalDashboardContext } from "/context/DashboardContext";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Loader from "../UI/Loader";
import { AiFillVideoCamera, AiFillAudio } from "react-icons/ai";

const MainScreen = () => {
  const {
    showCreateModal,
    setShowCreateModal,
    successAleart,
    setSuccessAleart,
    allUserPodcast,
    setAllUsersPodcast,
  } = useGlobalDashboardContext();
  const { getCookie } = useGlobalAuthContext();
  const { setCurrentTrack } = useGlobalPlayerContext();

  const [isListView, setIsListView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAllPodcastByUserId = async () => {
      setIsLoading(true);
      try {
        const config = {
          headers: {
            Authorization: getCookie("access-token"),
          },
        };
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/podcast/podcastByUserId`,
          config
        );

        setAllUsersPodcast(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getAllPodcastByUserId();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="z-10 flex flex-col items-center justify-center w-full h-full pb-20">
      <div className="flex flex-col items-center justify-start w-full gap-10 ">
        {successAleart && (
          <p className="relative z-10 w-full px-4 py-2 text-lg font-semibold text-left capitalize bg-green-500 rounded-lg">
            {successAleart}
            <span
              onClick={() => setSuccessAleart("")}
              className="absolute right-0 p-2 transition-all duration-200 ease-in -translate-x-1 -translate-y-1 bg-white rounded-lg cursor-pointer hover:bg-Black hover:text-white text-Black"
            >
              <IoMdClose />
            </span>
          </p>
        )}
        <div className="flex flex-col items-center justify-center w-full gap-20 tablet:flex-row">
          <div className="flex items-center justify-center w-full basis-1/2">
            <p className="text-6xl font-bold uppercase">
              Podcasts you&apos;hv uploaded
            </p>
          </div>
          <div className="flex flex-col items-start justify-center w-full gap-4 basis-1/2">
            <p className="text-lg opacity-70">
              List of all your podcasts List of all your podcasts List of all
              your podcasts List{" "}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-12 text-lg py-3 flex items-center justify-center gap-2 font-semibold border-[2px] rounded-xl"
            >
              Create New <BsArrowUpRight className="text-2xl" />
            </button>
          </div>
        </div>
        {/*  */}

        <div className="flex flex-wrap items-center justify-between w-full mt-24 rounded-xl">
          {allUserPodcast.map((podcast, i) => {
            return (
              <div
                className={`flex flex-col items-center justify-center ${
                  isListView ? "w-full" : "w-[45%]"
                } `}
                key={i}
              >
                <div className="flex items-center justify-between w-full px-2 pr-10">
                  <div className="flex flex-col items-center justify-center gap-8 tablet:flex-row">
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
                    </div>

                    <div className="flex flex-col items-start justify-start w-full gap-1 mt-4 text-lg">
                      <p className="flex items-center justify-center gap-2 font-semibold">
                        {podcast.name}{" "}
                      </p>
                      <p className="text-sm font-medium opacity-60">
                        {podcast.description}
                      </p>
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
                <div className="flex items-center justify-center w-full gap-8 text-sm font-normal opacity-60">
                  <div className="flex items-center justify-center gap-2 ">
                    <p>
                      {podcast.type.toLowerCase() == "audio" ? (
                        <AiFillAudio />
                      ) : (
                        <AiFillVideoCamera />
                      )}
                    </p>
                    <p>{podcast.views}</p>
                    <p>
                      {podcast.type.toLowerCase() == "audio"
                        ? "listened"
                        : "viewed"}
                    </p>
                  </div>

                  <p>Speaker: {podcast.speaker}</p>
                </div>

                <div className="w-[95%] my-12 h-[2px]  rounded-full bg-white/20"></div>
              </div>
            );
          })}
        </div>
        {/*  */}
        {/*  */}
      </div>
      <Modal
        isVisible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      >
        <CreateNewModal />
      </Modal>
    </div>
  );
};

export default MainScreen;
