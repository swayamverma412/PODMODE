import React, { useEffect, useRef, useState, useCallback } from "react";
import { IoPlay, IoPause, IoPlaySkipForward } from "react-icons/io5";
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { useGlobalPlayerContext } from "/context/PlayerContext";
import { BsFillCameraVideoFill } from "react-icons/bs";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
const AudioPlayer = () => {
  const { currentTrack, setCurrentTrack } = useGlobalPlayerContext();
  const [progressBarVal, setProgressBarVal] = useState(0);
  const [progressBarMax, setProgressBarMax] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(10);
  const [muteVolume, setMuteVolume] = useState(false);
  const playAnimationRef = useRef();

  const onLoadedMetadata = async () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    setProgressBarMax(seconds);
    console.log("AUDIO METADATA LOADED");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/podcast/view/${currentTrack.id}`
    );
    audioRef.current.play();
    setIsPlaying(true);
  };

  //  CONTROLES

  const repeat = useCallback(() => {
    const currentTime = audioRef.current?.currentTime;
    setTimeProgress(currentTime);
    setProgressBarVal(currentTime);

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  //

  //   PROGRESS BAR
  const handleProgressChange = (e) => {
    console.log(e);
    console.log(duration, progressBarMax, "CALLED");
    setProgressBarVal(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  //

  return (
    <div className="z-[9999] sticky bottom-0 left-0 right-0 flex items-center  justify-center w-full ">
      <div className="w-full max-w-[1400px] relative flex items-center h-[90px] justify-between px-8 bg-[#2A2930] shadow-xl text-white ">
        <input
          id="steps-range"
          type="range"
          min="0"
          max={duration}
          value={progressBarVal}
          onChange={handleProgressChange}
          step="0.5"
          className="left-0 right-0 top-0 absolute in-range:bg-gray-200 out-of-range:bg-green-500 h-[4px] bg-gray-200 rounded-t-xl range-sm appearance-none cursor-pointer"
        />
        <div className="flex items-start justify-start gap-8">
          {currentTrack.type.toLowerCase() !== "audio" ? (
            <p className="p-3 text-3xl bg-gray-400 rounded-xl">
              <BsFillCameraVideoFill />
            </p>
          ) : (
            <p className="p-3 text-3xl bg-gray-400 rounded-xl">
              <BsMusicNoteBeamed />
            </p>
          )}
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-lg font-semibold">{currentTrack?.name}</p>
            <p className="opacity-70">#{currentTrack?.category}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <div>
            <audio
              onLoadedMetadata={onLoadedMetadata}
              src={currentTrack?.file}
              ref={audioRef}
            />
          </div>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center justify-center gap-2">
              <button
                className="text-xl"
                onClick={() => setMuteVolume((prev) => !prev)}
              >
                {muteVolume || volume < 5 ? (
                  <IoMdVolumeOff />
                ) : volume < 40 ? (
                  <IoMdVolumeLow />
                ) : (
                  <IoMdVolumeHigh />
                )}
              </button>
              <input
                id="minmax-range"
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
              />
            </div>
            <p>
              {formatTime(timeProgress)} /{formatTime(duration)}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={skipBackward}
              className="flex  items-center justify-center p-1.5 text-xl "
            >
              <IoPlaySkipForward className="rotate-180" />{" "}
              <p className="text-xs font-semibold">-15s</p>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center justify-center p-1.5 text-3xl "
            >
              {isPlaying ? <IoPause /> : <IoPlay />}
            </button>
            <button
              onClick={skipForward}
              className="flex  items-center justify-center p-1.5 text-xl "
            >
              <p className="text-xs font-semibold">+15s</p>{" "}
              <IoPlaySkipForward />
            </button>
            <button
              onClick={() => setCurrentTrack(null)}
              className="ml-4 text-2xl"
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
