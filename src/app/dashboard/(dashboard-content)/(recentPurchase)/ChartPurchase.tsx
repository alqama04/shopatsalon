import React from "react";
import dynamic from "next/dynamic";
import { Skeleton2 } from "@/components/Skeleton";

const  Chart   = dynamic(()=>import('@/components/Chart'),{
  ssr:false,
  loading() {
    return <Skeleton2 className="bg-gray-800" />;
  },
})

import fetchData from "../fetchData";
const ChartPurchase = async() => {
  const {purchase} = await fetchData()
 
  const data1= purchase.length?purchase.map((purchase ) => ({
    purchases: purchase.amount,
    createdAt: `${new Date(purchase.createdAt).toDateString()}`,

  })):[{purchases:0,createdAt:new Date(Date.now()).toDateString()}]

  return (
    <div className="h-full mt-8">
      <h1 className="text-[1.2rem] font-semibold tracking-wider">
        This Month Purchase
      </h1>
      <div className="h-64 mt-5 flex justify-start items-center">
        <Chart data={data1}/>
      </div>
    </div>
  );
};

export default ChartPurchase;
