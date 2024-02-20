"use client";
import useToastMsg from "@/hooks/useToastMsg";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UpdateOrder = ({
  id,
  status,
  orderList,
}: {
  id: string;
  status: string;
  orderList: string;
}) => {
  const [loading, setLoading] = useState(false);
  const { component, setToastType, setAlertMsg } = useToastMsg();
  const [orderStatus, setOrderStatus] = useState(status || "pending");
  const [orderListText, setOrderListText] = useState(orderList || '');
  const [editList, setEditList] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/order/admin", {
        method: "PUT",
        body: JSON.stringify({ id, orderStatus, orderListText }),
      });

      const apiResp = await res.json();
      if (res.ok) {
        setLoading(false);
        setToastType("alert-success");
        setAlertMsg("order updated");
        router.refresh();
      } else {
        setLoading(false);
        setToastType("alert-error");
        setAlertMsg(apiResp.error || "unknown error occured");
      }
    } catch (error) {
      setLoading(false);
      throw new Error("something went wrong");
    }
  };

  // console.log()
  return (
    <div>
      {component}
      <div>
        {editList && (
          <textarea
            rows={orderList.split("\n").length}
            value={orderListText}
            onChange={(e) => setOrderListText(e.target.value)}
            className="w-full textarea bg-gray-800 -mb-1 "
          />
        )}

        <button
          onClick={() => setEditList((prev) => !prev)}
          className="p-1 text-sm rounded-md bg-warning-content"
        >
          {editList ? "Done" : "Edit Order"}
        </button>
      </div>
      <div className="flex gap-1 mt-1.5">
        <select
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
          className="bg-gray-800 text-white font-semibold select select-sm  focus:border-2 focus:border-gray-700 focus:outline-none  rounded-md"
        >
          <option className="bg-gray-900 text-white">accepted</option>
          <option className="bg-gray-900 text-white">cancelled</option>
          <option className="bg-gray-900 text-white">pending</option>
        </select>
        <button
          onClick={handleUpdate}
          className="btn btn-sm text-white tracking-wider bg-green-800 border-none hover:bg-green-700 focus:outline-gray-600 "
        >
          update {loading && <span className="loading loading-spinner" />}
        </button>
      </div>
    </div>
  );
};

export default React.memo(UpdateOrder);
