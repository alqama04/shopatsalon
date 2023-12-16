import React from "react";

interface Level {
  levelId: string;
}

const DeleteLevel = ({ levelId }: Level) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

 
  return (
    <>
      <button className="btn btn-xs bg-gray-500 border-none" onClick={() => setIsModalOpen((prev) => !prev)}>
        update
      </button>
      {isModalOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are you sure you want to delete this item?
            </h3>
            <div className="modal-action">
              <div className="flex justify-center"></div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default DeleteLevel;
