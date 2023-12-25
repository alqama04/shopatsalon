import React from "react";
import { headers } from "next/headers";
import Purchases from "./Purchases";
import Link from "next/link";

const fetchData = async (
  page: number,
  limit: number,
  fromDate: string,
  toDate: string
) => {
  let apiResponse;
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/purchases?page=${page}&limit=${limit}&fromDate=${fromDate}&toDate=${toDate}`,
      { headers: headers() }
    );
    apiResponse = await res.json();
  } catch (error) {
    throw new Error("Something went wrong");
  }
  return apiResponse;
};

const FetchPurchases = async ({ searchParams }: any) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 5;
  const fromDate = searchParams.from;
  const toDate = searchParams.to;
   
  let apiResponse = await fetchData(page, limit, fromDate, toDate);
  if (apiResponse.error || !apiResponse) {
    return (
      <div>
        <h1 className="text-center text-4xl font-bold mt-20">
          {apiResponse?.error || "unknown error Occured"}
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-lg h-full">
      <Purchases
        purchases={apiResponse.purchases}
        totalPurchasesCount={apiResponse.totalPurchasesCount}
      />

      <div className="join mb-1 justify-center w-full m-aut">
        {page > 1 ? (
          <Link
            href={`/dashboard/purchases?page=${page - 1}&limit=${limit}`}
            className="join-item base-btn "
          >
            «
          </Link>
        ) : (
          <button className="join-item base-btn opacity-70">«</button>
        )}

        <button className="join-item base-btn">Page {page}</button>

        {apiResponse.purchases.length === limit ? (
          <Link
            href={`/dashboard/purchases?page=${page + 1}&limit=${limit}
            ${fromDate && toDate?`&fromDate=${fromDate} &toDate=${toDate}`:''}`}
            className="join-item base-btn"
          >
            »
          </Link>
        ) : (
          <button className="join-item base-btn opacity-70">» </button>
        )}
      </div>
    </div>
  );
};

export default FetchPurchases;
