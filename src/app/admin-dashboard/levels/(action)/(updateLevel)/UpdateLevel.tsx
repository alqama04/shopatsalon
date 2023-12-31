"use client";
import React from "react";
import dynamic from "next/dynamic";

const HandleUpdate = dynamic(()=>import('./HandleUpdate'))


interface Level {
  id: string;
  name: string;
  target_amt: string;
  reward_percentage: string;
}

const UpdateLevel = ({id,name,target_amt,reward_percentage}:Level) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <>
      <button
        className="btn btn-xs bg-gray-700 rounded-lg text-white tracking-wider border-none hover:bg-gray-900"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        update
      </button>
      {isModalOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Levels</h3>
            <div className="modal-action">
              <HandleUpdate id={id} name={name} target_amt={target_amt}  closeModal={setIsModalOpen} reward_percentage={reward_percentage} />
            </div>
            <div className="text-right">
              <button
                onClick={() => setIsModalOpen((prev) => !prev)}
                className="btn bg-gray-800 hover:bg-gray-900 text-white "
              >
                Close Tab
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};
export default UpdateLevel;
