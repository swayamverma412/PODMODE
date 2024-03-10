import AudioPlayer from "./AudioPlayer";
import VideoPlayer from "./VideoPlayer";
import { useGlobalPlayerContext } from "/context/PlayerContext";

const MainPlayerComponent = () => {
  const { currentTrack } = useGlobalPlayerContext();
  return (
    currentTrack &&
    (currentTrack.type === "audio" ? <AudioPlayer /> : <VideoPlayer />)
  );
};

export default MainPlayerComponent;
