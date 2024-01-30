import React from "react";
import { TbGiftFilled } from "react-icons/tb";
import { FaIndianRupeeSign } from "react-icons/fa6";

interface RewardProps {
  reward: number;
}

const Reward: React.FC<RewardProps> = ({ reward }) => {
  return (
    <div className="h-24 sm:h-28 md:h-32 bg-gray-900 p-2 rounded-md shadow-md shadow-gray-800">
      <div className="flex justify-between gap-1 h-full">
        <div className="flex-1">
          <div className="flex flex-col justify-between h-full">
            <h1 className="uppercase tracking-widest font-semibold text-[1.1rem]">
              Reward
            </h1>

            <div>
              <h1 className="flex items-center gap-1">
                <FaIndianRupeeSign size={26} />
                <span className="text-[1.2rem]">{reward?.toFixed(2)}</span>
              </h1>
            </div>
          </div>
        </div>

        <div>
          <TbGiftFilled size={30} />
        </div>
      </div>
    </div>
  );
};

export default Reward;
