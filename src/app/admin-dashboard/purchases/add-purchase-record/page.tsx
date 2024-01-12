import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/Skeleton";
const CreatePurchaseAction = dynamic(() => import("./CreatePurchaseAction"), {
  loading: () => (
    <div>
      <Skeleton />
    </div>
  ),
});

const CreatePurchaseRecord = () => {
  return (
    <div className="p-1 w-full h-screen">
      <div className="p-1 flex h-full">
        <div className="p-4 flex flex-col gap-3 w-full lg:w-[70%] mx-auto md:m-auto shadow-lg border-t-2 border-x-2 border-gray-700 rounded-lg">
          <CreatePurchaseAction />
        </div>
      </div>
    </div>
  );
};

export default CreatePurchaseRecord;
