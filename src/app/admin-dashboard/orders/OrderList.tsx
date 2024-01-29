import React from "react";

import dynamic from "next/dynamic";
import Link from "next/link";

const DownloadFile = dynamic(() => import("@/components/DownloadFile"), {
  ssr: false,
  loading() {
    return <span className="loading loading-spinner" />;
  },
});

interface orders {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  orderList: string;
  files: string[];
  isAccepted: boolean;
  createdAt: string;
}

const OrderList = ({ orders }: { orders: orders[] }) => {
  return (
    <>
      {orders.map((item) => (
        <div
          key={item._id}
          className="shadow-md rounded-lg px-1 py-2 bg-gray-800"
        >
          <div className="flex justify-between gap-2 items-center">
            <div className="flex gap-2 items-center">
              <h1>{new Date(item.createdAt).toDateString()}</h1>

              {!item.isAccepted && (
                <span className="badge badge-sm badge-warning ">pending</span>
              )}
            </div>

            <div>
              <Link
                href={`/admin-dashboard/orders/${item._id}`}
                className="underline"
              >
                View
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            {item.files.length
              ? item.files.map((file) => (
                  <div key={file}>
                    <DownloadFile url={file} fileName={item._id} />
                  </div>
                ))
              : ""}
          </div>
          <div>
            <small> Order Id - {item._id.toString()}</small>
          </div>
          <div>
            <textarea
              rows={2}
              defaultValue={item.orderList || ""}
              readOnly
              className="textarea textarea-ghost w-full font-semibold "
              placeholder="Enter order List"
            ></textarea>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderList;
