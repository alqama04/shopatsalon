import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";

const TotalPurchase:React.FC<{totalPurchase:number}> = ({totalPurchase}) => {
  return (
    <div className="h-32 sm:h-28 bg-gray-900 p-2 rounded-md shadow-md shadow-gray-800">
      <div className="flex justify-between gap-1 h-full">
        <div className="flex-1">
          <div className="flex flex-col justify-between h-full">
            <h1 className="uppercase tracking-widest font-semibold text-[1.2rem]">
              Total Purchase
            </h1>

            <div>
              <h1 className="text-white flex items-center gap-1">
                <FaIndianRupeeSign size={26} />
                <span className="text-[1.2rem]">{totalPurchase}</span>
              </h1>
            </div>
          </div>
        </div>

        <div>
          <GiTakeMyMoney size={30} />
        </div>
      </div>
    </div>
  );
};

export default TotalPurchase;
