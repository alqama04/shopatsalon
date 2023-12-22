import React from "react";
import CreatePurchaseAction from "./CreatePurchaseAction";

const CreatePurchaseRecord = () => {
  return (
    <div className="p-1 w-full h-screen">
      <div className="p-1 flex bg-white rounded-md shadow-md h-full">

        <div className="p-4 flex flex-col gap-3 w-full lg:w-[70%] mx-auto md:m-auto shadow-lg border-t-2 border-x-2 border-gray-100 rounded-lg">
          
          <CreatePurchaseAction />
        </div>

      </div>
    </div>
  );
};

export default CreatePurchaseRecord;
