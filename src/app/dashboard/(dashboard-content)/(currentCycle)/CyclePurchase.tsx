import React from "react";
import "./Level.css";

import { FaIndianRupeeSign, FaMedal } from "react-icons/fa6";
import { BsGraphUpArrow } from "react-icons/bs";
import fetchData from "../fetchData";

const CyclePurchase = async() => {
  const data = await fetchData()
  return (
    <div className="h-24 sm:h-28 md:h-32 bg-gray-900 p-2 rounded-md shadow-md shadow-gray-800">
      <div className="flex justify-between gap-4 h-full">
        <div className="flex-1">
          <div className="flex flex-col justify-between h-full">
            <h1 className="uppercase tracking-widest font-semibold text-[1.1rem] leading-5">
              cycle Purchase
            </h1>

            <div>
              <h1 className="text-white flex items-center gap-1">
                <FaIndianRupeeSign size={26} />
                <span className="text-[1.2rem]">{data?.customer?.cyclePurchase || 0}</span>
              </h1>
            </div>
          </div>
        </div>
        <div>
          <div className="flex text-right   h-full">
            <BsGraphUpArrow size={26} className='stroke-1'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyclePurchase;
