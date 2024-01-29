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
    isAccepted: boolean;
  };
}
const Order = ({ order }: orderProp) => {
  return (
    <div className="mt-4">
      <div className="flex gap-2 items-center">
        <h1 className="text-[1.2rem] ">Order </h1>
        {order.isAccepted ? (
          <span className="badge badge-success font-semibold">Accepted</span>
        ) : (
          <span className="badge badge-warning">Pending</span>
        )}
      </div>
      <small> order Id - {order._id}</small>
      <div className="flex flex-col ga-2">
        <p className="bg-gray-800 textarea text-white">Order - {order?.orderList}</p>
        <div className="grid gap-2 mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
