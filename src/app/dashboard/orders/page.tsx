import React from "react";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { Skeleton } from "@/components/Skeleton";
import Link from "next/link";
const OrdersList = dynamic(() => import("./OrdersList"), {
  loading() {
    return <Skeleton />;
  },
});

const page = async ({ searchParams }: any) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 21;

  let orders = [];
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/order?page=${page}&limit=${limit}`,
    {headers : new Headers(headers()) }
  );
  if (res.ok) {
    const apiResponse = await res.json();
    orders = apiResponse.orders;
  }
 

  return (
    <div className="min-h-[100svh] h-full flex flex-col p-2">
      <h1 className="text-[1.2rem] font-semibold mb-2">Orders</h1>
      {orders.length ? (
        <>
          <div className="flex-1 mb-1">
            <OrdersList orders={orders} />
          </div>

          <div className="mt-auto join justify-center w-full m-auto">
            {page !== 1 && (
              <Link
                href={`/dashboard/orders?page=${page - 1}&limit=${limit}`}
                className="join-item base-btn "
              >
                «
              </Link>
            )}

            <button className="join-item base-btn">Page {page}</button>

            {orders.length === limit && (
              <Link
                href={`/dashboard/orders?page=${page + 1}&limit=${limit}`}
                className="join-item base-btn"
              >
                »
              </Link>
            )}
          </div>
        </>
      ) : (
        "Nothing to show here"
      )}
    </div>
  );
};

export default page;
