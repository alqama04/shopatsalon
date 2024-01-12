import DownloadFile from "@/components/DownloadFile";
import React from "react";

interface orderProp{
  order:{
    _id:string,
    orderList:string,
    files:string[],
    user:string,
    isAccepted:boolean
  }
}
const Order = ({order}:orderProp) => {
 
  return (
    <div className="mt-4">
      <div className="flex gap-2 items-center">

      <h1 className="text-[1.2rem] ">Order </h1>
      {order.isAccepted?
      <span className="badge badge-success font-semibold">Accepted</span>
      :
      <span className="badge badge-warning">Pending</span>
    }
      </div>
      <div className="flex flex-col ga-2">
        <textarea
          defaultValue={order.orderList}
          className="bg-gray-800 textarea "
        />
        <div className="flex gap-2 mt-3">
          {order.files.length ?
            order.files.map((file: string) => (
              <div key={file}>
                <DownloadFile url={file} fileName={order.user} iconSize={40} />
              </div>
            )):''}
        </div>
      </div>
    </div>
  );
};

export default Order;
