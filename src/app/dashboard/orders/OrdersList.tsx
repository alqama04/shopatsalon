import React from "react";
import dynamic from "next/dynamic";

const DownloadFile = dynamic(() => import("@/components/DownloadFile"), {
  ssr: false,
  loading() {
    return <span className="loading loading-spinner" />;
  },
});
const CancelOrder = dynamic(() => import("./(cancel-order)/CancelOrder"), {
  loading() {
    return <span className="loading loading-spinner" />;
  },
});

interface orderItem {
  _id: string;
  createdAt: string;
  orderList: string;
  files: string[];
  isAccepted: boolean;
}

const OrdersList = ({ orders }: { orders: orderItem[] }) => {
  return (
    <div>
      {orders.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 2xl:grid-cols-4">
          {orders.map((item) => (
            <div
              key={item._id}
              className="shadow-md rounded-lg px-1 py-1 bg-gray-800"
            >
              <div className="flex justify-between">
                <h1>{new Date(item.createdAt).toDateString()}</h1>
                {!item.isAccepted ? (
                  <h1>
                    <CancelOrder id={item._id} files={item.files} />
                  </h1>
                ) : (
                  <span className="badge badge-success ">accepted</span>
                )}
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
                <textarea
                  rows={3}
                  defaultValue={item.orderList || "nothing to show here"}
                  readOnly
                  className="textarea textarea-ghost resize-none w-full font-semibold mt-1"
                  placeholder="Enter order List"
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      ) : (
        "No Recent Orders found"
      )}
    </div>
  );
};

export default OrdersList;
