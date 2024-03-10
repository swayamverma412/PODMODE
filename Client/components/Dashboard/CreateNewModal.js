import React, { useState, useEffect } from "react";
import Input from "../UI/Input";
import FormData from "form-data";
import axios from "axios";
import { useGlobalAuthContext } from "/context/AuthContext";
import { useGlobalDashboardContext } from "/context/DashboardContext";
const CreateNewModal = () => {
  const {
    showCreateModal,
    setShowCreateModal,
    successAleart,
    setSuccessAleart,
    allUsersPodcast,
    setAllUsersPodcast,
  } = useGlobalDashboardContext();

  const { getCookie } = useGlobalAuthContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("audio");
  const [speaker, setSpeaker] = useState("");
  const [duration, setDuration] = useState(140);
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = new Audio(file);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
  }, [file]);

  const createPodcastHandler = async (e) => {
    setSuccessAleart("");
    if (file) {
      setIsLoading(true);
      try {
        e.preventDefault();
        var form = new FormData();
        form.append("file", file);
        form.append("name", name);
        form.append("description", description);
        form.append("type", type);
        form.append("speaker", speaker);
        form.append("duration", duration);
        form.append("category", category);

        var config = {
          headers: {
            Authorization: getCookie("access-token"),
          },
        };

        console.log("DATA", form.get("name"));

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/podcast/upload-audio`,
          form,
          config
        );

        console.log(res.data);
        setName("");
        setDescription("");
        setType("");
        setSpeaker("");
        setDuration("");
        setCategory("");
        setFile("");
        setShowCreateModal(false);
        setSuccessAleart(
          "Podcast Successfully Added. Its up there for our audience to listen. LETS GO!"
        );
        const podcasts = allUsersPodcast;
        podcasts.push(res.data.podcast);
        setAllUsersPodcast(podcasts);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Please seelct a file");
    }
  };

  return (
    <div className="w-[500px] h-[500px] flex items-center justify-start overflow-y-scroll flex-col gap-6 bg-white rounded-xl  text-Black py-8 px-14">
      <p className="text-2xl font-bold uppercase">Upload a new podcast</p>
      <div className="flex flex-col w-full gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          id="file"
          type="file"
          className="w-full rounded-lg"
        />
        <Input
          label="Name"
          placeholder="Enter the name of your podcast"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Description"
          placeholder="Enter the name of your podcast"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="flex flex-col items-start justify-start w-full">
          Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
        </label>
        {/* <input type="text" />
        <Input
          label="Type"
          placeholder="Enter the type of your podcast"
          value={type}
          onChange={(e) => setType(e.target.value)}
        /> */}
        <Input
          label="speaker"
          placeholder="Enter the name of your podcast"
          value={speaker}
          onChange={(e) => setSpeaker(e.target.value)}
        />
        <Input
          label="duration"
          type="number"
          placeholder="Enter the name of your podcast"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <Input
          label="category"
          placeholder="Enter the name of your podcast"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          onClick={createPodcastHandler}
          className="flex items-center justify-center py-3 text-lg font-semibold text-white bg-Black rounded-xl"
        >
          {isLoading ? (
            <div
              className={`w-8 h-8 border-2 border-b-0 border-r-0 rounded-full animate-spin border-white`}
            />
          ) : (
            "Publish Podcast"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateNewModal;
