"use client";
import useToastMsg from "@/hooks/useToastMsg";
import { useRouter } from "next/navigation";
import React from "react";

interface levelId {
  id: string;
}

const DeleteLevels = ({ id }: levelId) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { component, setAlertMsg, setToastType } = useToastMsg();
  const router = useRouter();

  async function delteData() {
    try {
      const res = await fetch("/api/levels", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setAlertMsg("Level Deleted SuccessFully");
        setToastType("alert-success");
        router.refresh()
      }else{
        setIsModalOpen(false);
        setToastType("alert-error");
        setAlertMsg("Unable to Delete");
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
            <p>it will also delete the user Level who are opted in</p>

            <div className="modal-action">
              <div className="w-full flex justify-center gap-10">
                <button
                  className="btn btn-md bg-red-600 rounded-lg text-white tracking-wider border-none hover:bg-red-700"
                  onClick={() => delteData()}
                >
                  Continue
                </button>
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

export default DeleteLevels;
