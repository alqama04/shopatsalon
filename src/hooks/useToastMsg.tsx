"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const useToastMsg = () => {
  const [alertMsg, setAlertMsg] = useState("");
  const [toastType, setToastType] = useState("");

  let component;

  setTimeout(() => {
    if(alertMsg){
      setAlertMsg('')
    }
  }, 5000);

  if (alertMsg) {
    component = (
      <div className="toast toast-top toast-center z-[1100]">
        <div className={`alert  ${toastType ? toastType : "alert-info"}`}>
          <span className="tracking-wider capitalize">
            {alertMsg}

            <button
              className="absolute"
            onClick={() => setAlertMsg("")}>
              <IoClose className="text-white font-bold text-2xl" />
            </button>
          </span>
        </div>
      </div>
    );
  } else component = "";

  return { setAlertMsg, component, setToastType };
};

export default useToastMsg;
