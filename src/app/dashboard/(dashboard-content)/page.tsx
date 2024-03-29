import React from "react";
import dynamic from "next/dynamic";
import Reward from "./Reward";
import { Skeleton, Skeleton2 } from "@/components/Skeleton";
import fetchData from "./fetchData";

const Levels = dynamic(() => import("./(currentCycle)/Levels"), {
  ssr: false,
  loading() {
    return (
      <div>
        <Skeleton2 className="bg-gray-800" />
      </div>
    );
  },
});

const CyclePurchase = dynamic(() => import("./(currentCycle)/CyclePurchase"), {
  loading() {
    return (
      <div>
        <Skeleton2 className="bg-gray-800" />
      </div>
    );
  },
});

const ChartPurchase = dynamic(() => import("./(recentPurchase)/ChartPurchase"));

const PurchaseTable = dynamic(
  () => import("./(recentPurchase)/PurchaseTable"),
  {
    ssr: false,
    loading() {
      return <Skeleton className={"bg-gray-800"} />;
    },
  }
);
const page = async () => {
  const data = await fetchData();
  const { customer } = data;

  return (
    <div className=" pt-3 flex-1 min-h-[100svh] h-full shadow-lg p-2 bg-gray-900 text-white md:border-l-2 border-gray-800">
      <div>
        <h2 className="font-extrabold text-[1.4rem] tracking-wider">
          Dashboard 
        </h2>
        <div className="mt-3 flex items-center gap-2">
          <h2 className="font-bold tracking-wider">Cycle Date</h2>
          {new Date(customer?.cycleEndDate) <= new Date(Date.now()) && (
            <span className="badge font-bold">Ended</span>
          )}
        </div>

        <div className="flex item-center mt-2 gap-2">
          {new Date(customer?.cycleStartDate)
            .toLocaleDateString("en-US", {day: 'numeric',month: 'short',   year: 'numeric'})}

          <p className="font-bold text-[#FACC15]">To</p>

          {new Date(customer?.cycleEndDate)
            .toLocaleDateString("en-US", {day: 'numeric',month: 'short',   year: 'numeric'})}

        </div>

        <div className=" mt-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-5">
          <Reward reward={customer?.reward} />

          <CyclePurchase />

          <div className="col-span-2 mt-2 md:col-span-1  md:mt-0">
            <Levels />
          </div>
        </div>
        <>
          <ChartPurchase />

          <PurchaseTable />
        </>
      </div>
    </div>
  );
};

export default page;
