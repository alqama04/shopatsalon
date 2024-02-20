import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/Skeleton";
import { headers } from "next/headers";

const Order = dynamic(() => import("./Order"), {
  loading() {
    return <div>Loading...</div>;
  },
});
const CustomerDetail = dynamic(() => import("./CustomerDetail"), {
  loading() {
    return <Skeleton />;
  },
});

const DeleteOrder = dynamic(() => import("../(delete-order)/DeleteOrder"));
const UpdateOrder = dynamic(() => import("../(update-order)/UpdateOrder"));

const page = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/order/order-detail?id=${params.id}`,
    {
      headers: new Headers(headers()),
    }
  );
  const orderDetails = await res.json();

  if (orderDetails.error) {
    return (
      <div className="min-h-screen text-center font-semibold">
        Error : {orderDetails.error}
      </div>
    );
  }
  const { order, customer } = orderDetails;
  

  return (
    <div className="min-h-screen h-full p-2">
      <CustomerDetail customer={customer} />

      <div className="flex flex-col gap-2 mt-3">
        <Order order={order} />
        <UpdateOrder
          id={order._id}
          status={order.status}
          orderList={order.orderList}
        />

        <DeleteOrder id={order._id} files={order.files} />
      </div>
    </div>
  );
};

export default page;
