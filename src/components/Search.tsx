"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface searchProp {
  placeholder: string;
}

const Search = ({ placeholder }: searchProp) => {
  const [search, setSearchInput] = useState("");
  const [searchThrough, setSearchThrough] = useState("phone");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e:any) => {

    e.preventDefault()
    if (search) {
      router.push(`${pathname}?${searchThrough}=${search}`);
    }

  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex gap-2 items-center">
        <div className="w-full md:w-1/3 flex gap-1 items-center">
          <select
            value={searchThrough}
            onChange={(e) => setSearchThrough(e.target.value)}
            className="bg-gray-800 text-white font-semibold pl-0.5 pr-5 select select-sm focus:border-2 focus:border-gray-700 focus:outline-none  rounded-md"
          >
            <option className="bg-gray-900 text-white">phone</option>
            <option className="bg-gray-900 text-white">email</option>
          </select>
          <input
            className="input-base border-gray-300 input-sm text-[0.9rem] font-semibold px-0"
            required
            type={searchThrough==='phone'?'number':"email"}
            placeholder={placeholder}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <button  type="submit" className="btn btn-sm rounded-lg ">
          <FaSearch size={26} />
        </button>
      </div>
    </form>
  );
};

export default Search;
