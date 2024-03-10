import { useRouter } from "next/router";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

const AllPodcast = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 mt-72">
      <div className="flex flex-col items-center justify-center w-full gap-20 tablet:flex-row">
        <div className="flex items-center justify-center w-full tablet:basis-1/2">
          <p className="text-6xl font-bold uppercase">All the podcasts!</p>
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-4 tablet:basis-1/2">
          <p className="text-lg opacity-70">
            Lorem ipsum dolor, sit amet consectetur adipisicing elitconsectetur
            adipisicing elit. Accusamus, perspiciatis.
          </p>
          <button
            onClick={() => router.push("/all")}
            className="px-12 text-lg py-3 flex items-center justify-center gap-2 font-semibold border-[2px] rounded-xl"
          >
            Show All <BsArrowUpRight className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPodcast;
