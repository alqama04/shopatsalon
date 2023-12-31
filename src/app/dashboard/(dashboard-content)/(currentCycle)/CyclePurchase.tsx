import React from "react";
import "./Level.css";

import { FaIndianRupeeSign, FaMedal } from "react-icons/fa6";

interface CyclePurchaseProp{
  amount:number,
  endDate:string
}
 
const CyclePurchase: React.FC<CyclePurchaseProp> = ({amount,endDate}) => {
  
  return (
    <div className="h-32 sm:h-28 bg-gray-900 p-2 rounded-md shadow-md shadow-gray-800">
      <div className="flex justify-between gap-4 h-full">
        <div className="flex-1">
          <div className="flex flex-col justify-between h-full">
            <h1 className="uppercase tracking-widest font-semibold text-[1.2rem]">
              cycle Purchase
            </h1>

            <div>
              <h1 className="text-white flex items-center gap-1">
                <FaIndianRupeeSign size={26} />
                <span className="text-[1.2rem]">{amount}</span>
              </h1>
            </div>
          </div>
        </div>
        <div>
        <div className="flex text-right flex-col justify-end h-full">
            <h1 className="uppercase tracking-widest text-[0.9rem]">
              End Date
            </h1>

            <div>
              <h1 className="gap-1">
              {new Date(endDate).toDateString() === new Date(Date.now()).toDateString()
               ? <span className="badge font-medium">Ended</span>
              :
                <span className="text-[0.9rem]">{new Date(endDate).toDateString()}</span>
            }
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyclePurchase;
