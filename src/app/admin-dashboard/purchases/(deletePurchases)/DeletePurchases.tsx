"use client";
import useToastMsg from "@/hooks/useToastMsg";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface purchaseId {
  id: string;
  url: string;
}

const DeletePurchases = ({ id, url }: purchaseId) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loading,setLoading] = useState(false)
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const { component, setAlertMsg, setToastType } = useToastMsg();

  async function delteData() {
    try {
      setLoading(true)
      const res = await fetch("/api/purchases/admin", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      const apiResponse = await res.json();
      if (res.ok) {
        await edgestore.publicFiles.delete({
          url: url,
        });

        setIsModalOpen(false);
        setAlertMsg("Level Deleted SuccessFully");
        setToastType("alert-success");
        setLoading(false)
        router.refresh();
      } else {
        setIsModalOpen(false);
        setAlertMsg(apiResponse.error || "unknow error occured");
        setToastType("alert-error");
        setLoading(false)
      }
    } catch (error) {
      throw new Error("Something Went Wrong");
    }
  }

  return (
    <>
      {component}
      <button
        className="btn btn-xs bg-red-600 rounded-lg text-white tracking-wider border-none hover:bg-red-700"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        Delete
      </button>
      {isModalOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are you sure you want to delete this item?
            </h3>
            <p>it will also affect the purchase record of the user</p>

            <div className="modal-action">
              <div className="w-full flex justify-center gap-10">
                {!loading?

<button
                  className="btn btn-md bg-red-600 rounded-lg text-white tracking-wider border-none hover:bg-red-700"
                  onClick={() => delteData()}
                  >
                  Continue
                </button>
                :
                <button
                  className="btn btn-md bg-red-600 rounded-lg text-white tracking-wider border-none hover:bg-red-700">
                  Deleting <span className="loading loading-dots"/>
                </button>
                }
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

export default DeletePurchases;
