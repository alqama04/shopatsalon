import React from "react";
import "./Level.css";

import { FaIndianRupeeSign } from "react-icons/fa6";
import fetchData from "../fetchData";

interface LevelsStyle extends React.CSSProperties {
  "--dynamicTop": string;
  "--dynamicBg": string;
}

const Levels = async () => {
  const { level, customer } = await fetchData();

  const currentLevel = level.find(
    (item) => item._id === customer.currentCycle._id
  );

  const sortLevel = level
  .sort((a, b) => a.target_amt - b.target_amt)
 
  const nextLevel = sortLevel.find((item) => item.target_amt > customer.currentCycle.target_amt);

  let totalTarget = 0;
  level.forEach((item) => (totalTarget += item.target_amt));

  const percentageAchieved = (
    (customer.cyclePurchase / sortLevel[sortLevel.length -1].target_amt) *
    100
  ).toFixed(2);

  
  const style: LevelsStyle = {
    "--dynamicTop": `${percentageAchieved}%`,
    "--dynamicBg": `#facc15`,
  };

  return (
    <div className="h-32 sm:h-28 md:h-32 bg-gray-900 p-2 rounded-md shadow-md shadow-gray-800">
      <div className="flex justify-between gap-1 h-full">
        <div className="flex-1">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <h1 className="uppercase tracking-widest font-semibold text-[1.1rem]">
                {currentLevel!.name || ""}
              </h1>
              <small className="my-1">
                {`You'r receiving ${
                  currentLevel!.reward_percentage || 0
                }% reward`}
              </small>
              {
                nextLevel?.reward_percentage &&
              <small className="font-medium tracking-wider text-purple-700">
                {`Next ${nextLevel?.reward_percentage}%`}
              </small>
              }
            </div>
            <div>
              <h1 className="text-white flex items-center gap-1">
                <FaIndianRupeeSign size={26} />
                <span className="text-[1.2rem]">
                  {currentLevel!.target_amt || 0}
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div
          title={`Yearly Target is ${totalTarget || 0}`}
          className="box flex-shrink-0 flex justify-center items-center"
          style={style}
        >
          <span className="absolute text-[0.9rem] font-bold tracking-wider z-10">
            {percentageAchieved}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Levels;
