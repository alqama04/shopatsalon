"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";



const useToastMsg = () => {
  const [alertMsg, setAlertMsg] = useState("");
  const [toastType, setToastType] = useState("");

  let component;

  if (alertMsg) {
    component = (
      <div className="toast toast-top toast-center transition-all duration-100">
        <div className={`alert ${toastType ? toastType : "alert-info"}`}>
          <span className="tracking-wider">{alertMsg}</span>
          <IoClose
            onClick={() => setAlertMsg("")}
            className="-mt-5 text-white font-bold"
          />
        </div>
      </div>
    );
  }

  return { setAlertMsg, component, setToastType };
};

export default useToastMsg;
