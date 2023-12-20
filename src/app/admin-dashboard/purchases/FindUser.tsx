"use client";
import useToastMsg from "@/hooks/useToastMsg";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

interface ApiResponse {
  error?: string;
  user?: {
    _id: string;
    username?: string;
    email?: string;
  };
}
const FindUser = () => {
  const [searchThrough, selectSearchThrough] = useState("email");
  const [value, selectValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { component, setAlertMsg, setToastType } = useToastMsg();
  const [userId, setUserId] = useState("");

  async function findUser(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ value, searchThrough }),
      });
      setLoading(false);
      const apiResponse: ApiResponse = await res.json();
      console.log(apiResponse?.user);
      if (apiResponse.user) {
        setAlertMsg("User Found");
        setToastType("alert-success");
        setUserId(apiResponse.user._id!);
      } else {
        setAlertMsg(apiResponse.error || "Something Went Wrong");
        setToastType("alert-error");
      }
    } catch (error) {
      setLoading(false);
      throw new Error("Internal Server Error");
    }
  }

  return (
    <>
      {component}
      <form onSubmit={(e) => findUser(e)}>
        <div className="flex items-center gap-1">
          <input
            type={
              searchThrough.toLowerCase() === "phone"
                ? "number"
                : searchThrough.toLowerCase() === "email"
                ? "email"
                : "text"
            }
            className="input-base"
            value={value.trim()}
            onChange={(e) => selectValue(e.target.value)}
            placeholder="Search User"
            required
          />
          <select
            defaultValue={value}
            onChange={(e) => selectSearchThrough(e.target.value)}
            className="select select-sm focus:border-2 focus:border-gray-800 pl-0.5 pr-[24px] focus:outline-none  rounded-md min-h-auto h-[2.8rem]"
          >
            <option>Email</option>
            <option>Phone</option>
            <option>GSTIN</option>
          </select>

          {!loading ? (
            <button
              type="submit"
              className="bg-gray-200 p-2 px-2 shadow-md rounded-lg "
            >
              <CiSearch className="stroke-2 text-gray-50 text-2xl " />
            </button>
          ) : (
            <button className="bg-gray-200 p-2 px-2 shadow-md rounded-lg ">
              <span className="loading loading-spinner loading-sm" />
            </button>
          )}
        </div>
      </form>
      <div>
        {userId && (
          <div className="flex gap-2 items-center">
            <p>{userId}</p>
            <button
              title="copy"
              className="btn btn-sm bg-transparent border-none hover:bg-gray-200"
              onClick={() => navigator.clipboard.writeText(userId)}
            >
              <FaCopy className="text-[1.4rem]" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FindUser;
