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
import { useRouter } from "next/navigation";

interface OrderProps {
  orderList: string;
  files: string[];

}

const PlaceOrder = () => {
  const { component, setAlertMsg, setToastType } = useToastMsg();
  const { edgestore } = useEdgeStore();
  const router = useRouter()

  const handleOrder = async ({ orderList, files }: OrderProps):Promise<boolean> => {
    if (!orderList && !files.length) {
      setAlertMsg("one field is required");
      setToastType("alert-error");
      return false;
    }
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify({ orderList, files }),
      });
      const apiResponse = await res.json();

      if (res.ok) {
        setAlertMsg("Order Sent");
        setToastType("alert-success");

        for(let file of files){
          await edgestore.publicFiles.confirmUpload({ url:file});
        }
        router.refresh()
        return true
      }else{
        setAlertMsg(apiResponse?.error || "An error occurred");
        setToastType("alert-error");
        return false
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
