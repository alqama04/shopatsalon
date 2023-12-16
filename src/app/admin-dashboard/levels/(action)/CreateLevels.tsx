"use client";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const CreateLevels = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [levelInput, setLevelInput] = useState({
    name: "",
    targetAmt: "",
  });
  const [err, setErr] = useState("");
  const [laoding, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const addLevel = async () => {
    if (!levelInput.name || !levelInput.targetAmt) {
      setErr("all fields are required");
      return;
    }
    setLoading(true);
    try {
      let res = await fetch("/api/levels", {
        method: "POST",
        body: JSON.stringify(levelInput),
      });
      if (res) {
        setLoading(false);
        res = await res.json();

        setErr("");
        setSuccessMsg("Level Added Successfully");
      } else {
        setErr("Unknown error occurred");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen((prev) => !prev)}
        className="btn bg-gray-800 font-normal text-gray-100 text-[1.2rem]
        tracking-wider hover:bg-gray-900 "
      >
        Create Level
      </button>
      {isModalOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box border-4 border-[#f1f1f1] shadow-md  w-[99%] p-2">
            <div className="flex justify-between">
              <h1 className="font-bold text-[1.4rem] "> Add Levels </h1>
              <IoMdClose
                className="font-bold text-[1.3rem]"
                onClick={() => setIsModalOpen((prev) => !prev)}
              />
            </div>
            {err && (
              <p className="text-red-600 text-center text-[0.9rem]">{err}</p>
            )}
            {successMsg && (
              <p className="text-green-600 text-center text-[0.9rem]">
                {successMsg}
              </p>
            )}
            <div className="flex items-center flex-col gap-2">
              <input
                className="w-full bg-[#F1F1F1] my-1.5 py-2.5 px-1 rounded-md shadow-md placeholder:capitalize outline-none focus:shadow-md transition-all duration-75 focus:border-l-4"
                placeholder="Level Name"
                value={levelInput.name}
                onChange={(e) =>
                  setLevelInput({ ...levelInput, name: e.target.value })
                }
              />

                <input
                  type="number"
                  className="w-full bg-[#F1F1F1] my-1.5 py-2.5 px-1 rounded-md shadow-md placeholder:capitalize outline-none focus:shadow-md transition-all duration-75 focus:border-l-4"
                  placeholder="Target Amount"
                  value={levelInput.targetAmt}
                  onChange={(e) =>
                    setLevelInput({ ...levelInput, targetAmt: e.target.value })
                  }
                />
            </div>

            <div className="text-center mt-5 ">
              <button
                onClick={() => addLevel()}
                className="btn bg-gray-800 font-normal text-gray-100 text-[1.2rem] tracking-wider hover:bg-gray-900 "
              >
                Add Level
                {laoding && <span className="loading loading-spinner" />}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default CreateLevels;
