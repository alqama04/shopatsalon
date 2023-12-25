import React from "react";
import FetchLevels from "./(getLevels)/FetchLevels";
import CreateLevel from "./(action)/(create-levels)/CreateLevel";

const page = () => {
  return (
    <div className="bg-white">
      <CreateLevel/>

      <FetchLevels/>
    </div>
  );
};

export default page;
