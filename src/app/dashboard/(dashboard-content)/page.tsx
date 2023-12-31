import React from "react";
import dynamic from "next/dynamic";
import Reward from "./Reward";
import { Skeleton, Skeleton2 } from "@/components/Skeleton";
import fetchData from "./fetchData";
const TotalPurchase = dynamic(() => import("./TotalPurchase"));

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
  ssr: false,
  loading() {
    return (
      <div>
        <Skeleton2 className="bg-gray-800" />
      </div>
    );
  },
});

const Chart = dynamic(() => import("./(recentPurchase)/Chart"), {
  ssr: false,
  loading() {
    return <Skeleton2 className="bg-gray-800" />;
  },
});

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
  const { customer, level, purchase } = data;

  return (
    <div
      className="
        pt-3
        flex-1
        min-h-full
        max-h-max
        shadow-lg
        p-2
        bg-gray-900
        text-white
        md:border-l-2
        border-gray-800
              "
    >
      <div>
        <h2
          className="
            font-extrabold
            text-[1.4rem]
            tracking-wider
            "
        >
          Dashboard
        </h2>

        {customer && level && (
          <div
            className="
              mt-3
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-4
              md:gap-x-5
                  "
          >
            <Reward reward={customer.reward} />

            <Levels
              name={level.name}
              target={level.target_amt}
              reward={customer.reward}
              rewardPercentage={level.reward_percentage}
            />

            <CyclePurchase
              amount={customer.cyclePurchase}
              endDate={customer.cycleEndDate}
            />

            <TotalPurchase totalPurchase={customer.allTimePurchase} />
          </div>
        )}
        {purchase.length && (
          <>
            <Chart purchase={purchase} />

            <PurchaseTable purchases={purchase} />
          </>
        )}
      </div>
    </div>
  );
};

export default page;
