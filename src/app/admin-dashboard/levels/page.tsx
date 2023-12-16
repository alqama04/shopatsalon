import React from "react";

import CreateLevels from "./(action)/CreateLevels";
import GetLevels from "./(action)/GetLevels";

const page = () => {
  return (
    <div className="min-h-[100svh] h-full">
      <CreateLevels/>
      <GetLevels/>
    </div>
  );
};

export default page;
