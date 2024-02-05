import React from "react";
import { headers } from "next/headers";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/Skeleton";
import Link from "next/link";
const FilterOrder = dynamic(() => import("./(filter-order)/FilterOrder"));

const OrderList = dynamic(() => import("./OrderList"), {
  loading() {
    return <Skeleton />;
  },
});

const page = async ({ searchParams }: any) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 20;
 
  const orderStatus = searchParams.status || "pending";
  const search = searchParams.search;

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/order/admin?${orderStatus&& `status=${orderStatus}`}&${
      search && `search=${search}`
    }&page=${page}&limit=${limit}`,
    { headers: new Headers(headers()) }
  );

  const orders = await res.json();

  if (orders.error) {
    return <div className="min-h-screen p-2">{orders.error}</div>;
  } else {
    return (
      <div className="min-h-screen h-full p-2 flex flex-col">
        <div className="flex-1">
          <FilterOrder />

          {orders.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 2xl:grid-cols-4 mb-1 mt-2">
              <OrderList orders={orders} />
            </div>
          ) : (
            <h2 className="mt-3">0 orders found</h2>
          )}
        </div>
        <div className="mt-auto join justify-center w-full m-auto">
          {page !== 1 && (
            <Link
              href={`/admin-dashboard/orders?status=${orderStatus}&page=${
                page - 1
              }&limit=${limit}`}
              className="join-item base-btn "
            >
              «
            </Link>
          )}
          <button className="join-item base-btn">Page {page}</button>
          {orders.length === limit && (
            <Link
              href={`/admin-dashboard/orders?status=${orderStatus}&page=${
                page + 1
              }&limit=${limit}`}
              className="join-item base-btn"
            >
              »
            </Link>
          )}
        </div>
      </div>
    );
  }
};

export default page;
