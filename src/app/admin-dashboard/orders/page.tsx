import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/Skeleton";
import Link from "next/link";
import { headers } from "next/headers";

const OrderList = dynamic(() => import("./OrderList"), {
  loading() {
    return <Skeleton />;
  },
});

const page = async ({ searchParams }: any) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 20;

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/order/admin?page=${page}&limit=${limit}`,
    { headers: headers() }
  );

  const orders = await res.json()

  if (orders.error) {
    return <div className="min-h-screen p-2">{orders.error}</div>;
  } else {
    return (
      <div className="min-h-screen h-full p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 2xl:grid-cols-4 mb-1">
          <OrderList orders={orders} />
        </div>

        <div className="mt-auto join justify-center w-full m-auto">
          {page !== 1 && (
            <Link
              href={`/admin-dashboard/orders?page=${page - 1}&limit=${limit}`}
              className="join-item base-btn "
            >
              «
            </Link>
          )}

          <button className="join-item base-btn">Page {page}</button>

          {orders.length === limit && (
            <Link
              href={`/admin-dashboard/orders?page=${page + 1}&limit=${limit}`}
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
