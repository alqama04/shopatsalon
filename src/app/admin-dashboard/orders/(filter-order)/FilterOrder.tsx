"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "next/navigation";

const FilterOrder = () => {
  const searchParams = useSearchParams();
  const [seachInput, setSearchInput] = useState("");
  const orderStatus = searchParams.get("status");

  const [orderType, setOrderType] = useState(orderStatus || "pending");

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (orderType?.toLowerCase() !== orderStatus?.toLocaleLowerCase()) {
      handleOrderType();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderType]);

  const handleOrderType = () => {
    const search = searchParams.get("search");

    router.push(
      `${pathname}?status=${orderType}&${search && `search=${search}`}`
    );
  };

  const handleSearch = () => {
    if (seachInput) {
      router.push(`${pathname}/?search=${seachInput}`);
    }
    setOrderType('pending')
  };

  const clearFilter = () => {
    router.push(pathname);
  };
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
          <option className="bg-gray-900 text-white">pending</option>
          <option className="bg-gray-900 text-white">accepted</option>
          <option className="bg-gray-900 text-white">cancelled</option>
        </select>
        {searchParams.get("search") && (
          <button onClick={clearFilter} className="btn btn-sm">
            Clear Filter
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(FilterOrder);
