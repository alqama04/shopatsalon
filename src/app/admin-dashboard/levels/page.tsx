import React from "react";
import FetchLevels from "./(getLevels)/FetchLevels";
import CreateLevel from "./(action)/(create-levels)/CreateLevel";

const page = () => {
  return (
    <div className="">
      <CreateLevel/>

      <FetchLevels/>
    </div>
  );
};

export default page;
