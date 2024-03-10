import React from "react";

const AboutUs = () => {
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="w-full max-w-[1400px] flex items-center justify-between px-8 pt-20">
        <div className="tablet:w-[700px] w-full rounded-full absolute top-0 left-0 h-[700px] bg-white/5 blur-3xl "></div>

        {/* MAIN SCREEN */}
        <div className="flex flex-col items-center justify-start w-full gap-14">
          <p className="text-5xl font-black uppercase">
            PODMODE made with love by{" "}
            <span className="text-green-500">trycatch</span>
          </p>

          <p className="flex flex-col items-start justify-start text-2xl font-bold">
            Durgesh Kumar
            <span className="italic">(code.durgesh@gmail.com)</span>
          </p>
          <p className="flex flex-col items-start justify-start text-2xl font-bold">
            Swayam Verma
            <span className="italic">(2006385@kiit.ac.in)</span>
          </p>
          <p className="flex flex-col items-start justify-start text-2xl font-bold">
            Atig Purohit
            <span className="italic">(2005090@kiit.ac.in)</span>
          </p>
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default AboutUs;
