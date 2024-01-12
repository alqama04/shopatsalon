"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "next/navigation";

const FilterOrder = () => {
  const [seachInput, setSearchInput] = useState("");
  const [orderType, setOrderType] = useState("pending");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isAccepted = searchParams.get("isAccepted");
    if (isAccepted !== "false" || orderType !== "pending") {
      handleOrderType();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderType]);

  const handleOrderType = () => {
    const search = searchParams.get("search");
 
    if (orderType.toLowerCase() === "pending") {
      router.push(
        `${pathname}?isAccepted=${false}&${search && `search=${search}`}`
      );
    } else if (orderType.toLowerCase() === "accepted") {
      router.push(
        `${pathname}?isAccepted=${true}&${search && `search=${search}`}`
      );
    }
  };

  const handleSearch = () => {
    if (seachInput) {
      router.push(`${pathname}/?search=${seachInput}`);
    }
    setOrderType('pending')
  };
 

  const clearFilter =()=>{
    router.push(pathname)
     
  }
  return (
    <div className="text-gray-900 items-center .">
      <div className="flex gap-2 w-full p-1">
        <input
          type="number"
          className="input input-sm font-semibold w-full md:w-1/2"
          placeholder="search order through phone"
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="btn btn-sm bg-gray-800 hover:bg-gray-900 shadow-md rounded-lg "
        >
          <CiSearch className="stroke-2 text-gray-50 text-2xl " />
        </button>
      </div>

      <div className="ml-1 mt-2 flex gap-2">
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="bg-gray-800 text-white font-semibold select select-sm  focus:border-2 focus:border-gray-700 focus:outline-none  rounded-md"
        >
          <option className="bg-gray-900 text-white">Pending</option>
          <option className="bg-gray-900 text-white">Accepted</option>
        </select>
        {searchParams.get("search")&&

          <button
          onClick={clearFilter}
          className="btn btn-sm">Clear Filter</button>
        }
      </div>
    </div>
  );
};

export default FilterOrder;
