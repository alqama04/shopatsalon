import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/Skeleton";
import { headers } from "next/headers";
import Link from "next/link";

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

const DeleteOrder = dynamic(()=>import('../(delete-order)/DeleteOrder'))
const UpdateOrder = dynamic(()=>import('../(update-order)/UpdateOrder'))

const page = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/order/order-detail?id=${params.id}`,
    {
      headers: headers(),
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
      <Link 
      className='btn btn-sm mb-2 mt-0.5'
      href='/admin-dashboard/orders'>Go Back</Link>
      <CustomerDetail customer={customer} />

      <Order order={order} />

      <div className="flex gap-10">
        <UpdateOrder id={order._id} />

        <DeleteOrder id={order._id} files={order.files} />

      </div>
    </div>
  );
};

export default page;
