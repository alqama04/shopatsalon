"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/Skeleton";
const PlaceOrderForm = dynamic(() => import("./PlaceOrderForm"), {
  ssr: false,
  loading() {
    return <Skeleton />;
  },
});
import useToastMsg from "@/hooks/useToastMsg";
import { useEdgeStore } from "@/lib/edgestore";

interface OrderProps {
  orderList: string;
  files: string[];
}

const PlaceOrder = () => {
  const { component, setAlertMsg, setToastType } = useToastMsg();
  const { edgestore } = useEdgeStore();

  const handleOrder = async ({ orderList, files }: OrderProps) => {
    if (!orderList && !files.length) {
      setAlertMsg("one field is required");
      setToastType("alert-error");
      return;
    }
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify({ orderList, files }),
      });
      const apiResponse = await res.json();

      if (res.ok) {
        for(let file of files){
          await edgestore.publicFiles.confirmUpload({ url:file});
        }
        setAlertMsg("Order Sent");
        setToastType("alert-success");

      }else{
        setAlertMsg(apiResponse?.error || "An error occurred");
        setToastType("alert-error");
      }
    } catch (error) {
      throw new Error("something went wrong");
    }
  };

  return (
    <div className="min-h-[100svh] flex md:justify-center md:items-center flex-col pt-3 md:pt-0 p-1">
      {component}
      <div className="w-full  md:w-[24rem] shadow-gray-700 rounded-md shadow-sm  p-2 ">
        <h1 className="my-2">Place Order Via:</h1>
        <PlaceOrderForm handler={handleOrder} />

        <h1 className="text-red-700">
          Note: Please do not forget to mention the requried quantity and brand
          name of the product
        </h1>
      </div>
    </div>
  );
};

export default PlaceOrder;
