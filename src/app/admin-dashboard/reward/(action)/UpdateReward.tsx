"use client";
import useToastMsg from "@/hooks/useToastMsg";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UpdateReward = ({ id }: { id: string }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { component, setAlertMsg, setToastType } = useToastMsg();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const settleReward = async () => {
    try {
      setLoading(true);
      let res = await fetch("/api/reward", {
        method: "PUT",
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setAlertMsg("Reward settled ");
        setToastType("alert-success");
        setLoading(false);
        router.refresh();
      }
      const ApiResponse = await res.json();
      if (ApiResponse.error) {
        setAlertMsg(ApiResponse.error || "unknown error occured");
        setToastType("alert-error");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      throw new Error("unable to settle the reward");
    }
  };

  return (
    <>
      {component}
      <button
        className="btn btn-xs bg-red-600 rounded-lg text-white tracking-wider border-none hover:bg-red-700"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        Settle
      </button>
      {isModalOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg text-black">
              Are you sure you want to settle the reward?
            </h3>

            <div className="modal-action">
              <div className="w-full flex justify-center gap-10">
                {!loading ? (
                  <button
                    className="btn btn-md bg-red-600 rounded-lg text-white tracking-wider"
                    onClick={() => settleReward()}
                  >
                    Continue
                  </button>
                ) : (
                  <button className="btn loading loading-spinner bg-red-600"></button>
                )}
                <button
                  className="btn btn-md bg-gray-700 rounded-lg text-white tracking-wider border-none hover:bg-gray-900"
                  onClick={() => setIsModalOpen((prev) => !prev)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default UpdateReward;
