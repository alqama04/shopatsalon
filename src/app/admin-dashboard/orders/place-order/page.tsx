"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/Skeleton";
const PlaceOrderForm = dynamic(
  () => import("@/components/forms/PlaceOrderForm"),
  {
    ssr: false,
    loading() {
      return <Skeleton />;
    },
  }
);

import useToastMsg from "@/hooks/useToastMsg";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";

const FindUser = dynamic(() => import("@/components/user/FindUser"),{
  loading() {
    return  <h2>Loading....</h2>
  },
});

interface OrderProps {
  orderList: string;
  files: string[];
}

const PlaceOrder = () => {
  const { component, setAlertMsg, setToastType } = useToastMsg();
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [orderStatus, setOrderStatus] = useState("pending");

  const handleOrder = async ({
    orderList,
    files,
  }: OrderProps): Promise<boolean> => {
    if (!userId) {
      setAlertMsg("User Id Required");
      setToastType("alert-error");
      return false;
    }
    if (!orderList && !files.length) {
      setAlertMsg("one field is required");
      setToastType("alert-error");
      return false;
    }
    try {
      const res = await fetch("/api/order/admin", {
        method: "POST",
        body: JSON.stringify({ orderList, files, userId,orderStatus }),
      });
      const apiResponse = await res.json();

      if (res.ok) {
        setAlertMsg("Order Sent");
        setToastType("alert-success");

        for (let file of files) {
          await edgestore.publicFiles.confirmUpload({ url: file });
        }
        router.refresh();
        return true;
      } else {
        setAlertMsg(apiResponse?.error || "An error occurred");
        setToastType("alert-error");
        return false;
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
        <div className="my-1">
          <FindUser />
        </div>
        <div className="mb-1">
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User Id "
            className="w-full  bg-gray-800 py-2 px-3 rounded-md shadow-md placeholder:capitalize outline-none focus:shadow-md"
          />
          <div className="flex gap-2 items-center mt-1">
            <h2>Order Status</h2>
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              className="bg-gray-800 text-white font-semibold select select-sm  focus:border-2 focus:border-gray-700 focus:outline-none  rounded-md"
            >
              <option className="bg-gray-900 text-white">pending</option>
              <option className="bg-gray-900 text-white">accepted</option>
              <option className="bg-gray-900 text-white">cancelled</option>
            </select>
          </div>
        </div>

        <PlaceOrderForm handler={handleOrder} />
      </div>
    </div>
  );
};

export default PlaceOrder;
