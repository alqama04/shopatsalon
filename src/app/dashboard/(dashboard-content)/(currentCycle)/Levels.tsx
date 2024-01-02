import React from "react";
import "./Level.css";

import { FaIndianRupeeSign } from "react-icons/fa6";

interface LevelsStyle extends React.CSSProperties {
  "--dynamicTop": string;
}

interface LevelProp{
  name:string,
  target:number,
  reward:number,
  rewardPercentage:number
}

33 //purchae  

const Levels: React.FC<LevelProp> = ({name,target,reward,rewardPercentage}) => {
  
  const rewarPrcentCompletePercent = `${((reward / target) * 100).toFixed(1)}%`;

  const style:LevelsStyle = {
    "--dynamicTop":rewarPrcentCompletePercent,
  };

  return (
    <div className="h-32 sm:h-28 md:h-32 bg-gray-900 p-2 rounded-md shadow-md shadow-gray-800">
      <div className="flex justify-between gap-1 h-full">
        <div className="flex-1">
          <div className="flex flex-col justify-between h-full">
            <h1 className="uppercase tracking-widest font-semibold text-[1.2rem]">
              {name}
            </h1>
            <small className="-mt-4">{rewardPercentage}% reward on each buy</small>
            <div>
              <h1 className="text-white flex items-center gap-1">
                <FaIndianRupeeSign size={26} />
                <span className="text-[1.2rem]">{target}</span>
              </h1>
            </div>
          </div>
        </div>

        <div
          title="5000"
          className="box flex justify-center items-center"
          style={style}
        >
          <span className="absolute text-[0.9rem] font-bold tracking-wider z-10">{rewarPrcentCompletePercent}</span>
        </div>

      </div>
    </div>
  );
};

export default Levels;
