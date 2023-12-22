import React from "react";

const loading = () => {
  return (
    <div className="absolute w-screen h-[100svh] z-10">
      <div className="flex flex-col gap-4 p-4 sm:hidden justify-center w-full">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
      <div className="hidden sm:flex justify-center items-center h-[100svh] w-full">
        <span className="loading loading-ring h-[10rem] w-[10rem]"></span>
      </div>
    </div>
  );
};

export default loading;
