import useToastMsg from "@/hooks/useToastMsg";
import React from "react";

interface Level {
  levelId: string;
}

const DeleteLevel = ({ levelId }: Level) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const deleteLevel = async () => {
    let res = await fetch("/api/levels", {
      method: "DELETE",
      body: JSON.stringify({levelId}),
    });
    res = await res.json()
    console.log(res)
  };

  return (
    <>
      <button
        className="btn btn-xs bg-red-600 border-none"
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
            <div className="modal-action">
              <div className="flex justify-center w-full gap-2">
                <button 
                onClick={()=> deleteLevel()}
                className="btn bg-gray-800 font-normal text-gray-100 text-[1.2rem] tracking-wider hover:bg-gray-900 ">
                  Delete
                </button>
                <button
                  onClick={() => setIsModalOpen((prev) => !prev)}
                  className="btn bg-gray-800 font-normal text-gray-100 text-[1.2rem] tracking-wider hover:bg-gray-900 "
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

export default DeleteLevel;
