"use client";
import useToastMsg from "@/hooks/useToastMsg";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UpdateOrder = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const { component, setToastType, setAlertMsg } = useToastMsg();
  const router = useRouter()

  const handleUpdate = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/order/admin", {
        method: "PUT",
        body: JSON.stringify({ id }),
      });
      const apiResp = await res.json();
      if (res.ok) {
        setLoading(false);
        setToastType("alert-success");
        setAlertMsg("order accepted");
        router.refresh()
      } else {
        setLoading(false);
        setToastType("alert-error");
        setAlertMsg(apiResp.error || "unknown error occured");
      }
    } catch (error) {
      setLoading(true)
      throw new Error("something went wrong");
    }
  };

  return (
    <div>
      {component}
      <button onClick={handleUpdate} className="btn btn-sm text-white tracking-wider bg-green-800 border-none hover:bg-green-700 focus:outline-gray-600 ">
        Accept {loading && <span className="loading loading-spinner" />}
      </button>
    </div>
  );
};

export default UpdateOrder;
