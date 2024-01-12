"use client";
import React from "react";
import dynamic from "next/dynamic";

const HandleCreate  = dynamic(()=>import('./HandleCreate'))

const CreateLevel = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <>
      <button
        className="btn btn-sm m-2  text-gray-900"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        Create Level
      </button>
      {isModalOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Levels</h3>
            <div className="modal-action">
              <HandleCreate />
            </div>
            <div className="text-right">
              <button
                onClick={() => setIsModalOpen((prev) => !prev)}
                className="btn bg-gray-800 hover:bg-gray-900 text-white "
              >
                close Tab
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default CreateLevel;
