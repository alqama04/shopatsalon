import React from "react";
import dynamic from "next/dynamic";

const ViewImage = dynamic(() => import("@/components/ViewImage"), {
  loading() {
    return <p>Loading...</p>;
  },
});

const DownloadFile = dynamic(() => import("@/components/DownloadFile"), {
  loading() {
    return <p>Loading...</p>;
  },
});

interface orderProp {
  order: {
    _id: string;
    orderList: string;
    files: string[];
    user: string;
    status: string;
    createdAt:string,
    updatedAt:string,
  };
}
const Order = ({ order }: orderProp) => {
  return (
    <div className="mt-4">
      <div className="flex gap-2 items-center">
        <h1 className="text-[1.2rem] ">Order </h1>
        <span
          className={`badge badge-sm ${
            order.status === "accepted"
              ? "badge-success"
              : order.status === "cancelled"
              ? "badge-error"
              : "badge-warning"
          }`}
        >
          {order.status}
        </span>
      </div>
      <small> order Id - {order._id}</small>
      <div className="flex flex-col md:flex-row gap-1 mb-1">
      <small className="badge badge-neutral">Order Date {new Date (order.createdAt).toLocaleString("en-US")} </small>
      <small className="badge badge-neutral">Updated Date {new Date (order.updatedAt).toLocaleString("en-US")}</small>

      </div>
      <div className="flex flex-col ga-2">
        <p className="bg-gray-800 textarea text-white">
          Order - {order?.orderList}
        </p>
        <div className="grid gap-2 mt-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {order.files.length
            ? order.files.map((file: string) => (
                <div key={file}>
                  <div>
                    <ViewImage imageUrl={file} />
                    <DownloadFile
                      url={file}
                      fileName={order.user}
                      iconSize={40}
                    />
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Order;
