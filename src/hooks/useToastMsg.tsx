"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const useToastMsg = () => {
  const [alertMsg, setAlertMsg] = useState("");
  const [toastType, setToastType] = useState("");


  setTimeout(() => {
    setAlertMsg('')
  }, 10000);

  let component;

  if (alertMsg) {
    component = (
      <div className="toast toast-top toast-center transition-all ease-in-out duration-1000">
        <div className={`alert ${toastType ? toastType : "alert-info"}`}>
          <span className="tracking-wider">{alertMsg}</span>

          <button onClick={() => setAlertMsg("")}>
            <IoClose className="-mt-5 text-white font-bold" />
          </button>
        </div>
      </div>
    );
  } else component = "";

  return { setAlertMsg, component, setToastType };
};

export default useToastMsg;
