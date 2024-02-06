"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton2 } from "@/components/Skeleton";
const MultiImageUpload = dynamic(
  () => import("@/components/media/MultiImageUpload"),
  {
    loading() {
      return <Skeleton2 />;
    },
  }
);

const FormSubmit = dynamic(() => import("@/components/FormSubmit"), {
  loading() {
    return <span>Loading...</span>;
  },
});

interface PlaceOrderFormProps {
  handler: (data: { orderList: string; files: string[] }) => Promise<boolean>;
}

const PlaceOrderForm = ({ handler }: PlaceOrderFormProps) => {
  const [files, setFiles] = useState<string[]>([]);
  const [clearFileState, setClearFileState] = useState<boolean>(false);
  const [orderList, setOrderList] = useState("");

  const handleOrder = async () => {
    const success = await handler({ orderList, files });
    if (success) {
      setClearFileState((prev) => !prev);
      setOrderList("");
      setFiles([]);
    }
  };

  return (
    <>
      <form action={handleOrder}>
        <div className="flex flex-col gap-1 justify-center items-center">
          <textarea
            rows={4}
            value={orderList}
            onChange={(e) => setOrderList(e.target.value)}
            className="textarea bg-gray-800 focus:outline-none  w-full font-semibold "
            placeholder="Enter order List"
          ></textarea>
          <div className="divider divider-vertical">OR</div>

          <MultiImageUpload
            setFiles={setFiles}
            clearFileState={clearFileState}
          />
        </div>
        <div className="my-5 w-full">
          <FormSubmit className="btn w-full text-[1.1rem] bg-gray-900 text-white shadow-gray-800 shadow-inner border-gray-800 hover:bg-gray-950">
            Place Order
          </FormSubmit>
        </div>
      </form>
    </>
  );
};

export default PlaceOrderForm;
