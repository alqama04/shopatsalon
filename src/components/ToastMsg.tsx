'use client'

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

interface toastMessage{
    message?:string,
    toastType?:string,
}

const ToastMsg = ({ message, toastType}:toastMessage) => {
  const [alertMsg,setAlertMsg] = useState(message||'')  
  if(!alertMsg) return  
  

  return (

    <div className="toast toast-top toast-center transition-all duration-100">

      <div className={`alert ${toastType ? toastType : "alert-info"}`}>
        <span className="tracking-wider">{alertMsg}</span>
        <IoClose onClick={()=>setAlertMsg('')}
        className='-mt-5 text-white font-bold'
        />
      </div>
    </div>
  );
};

export default ToastMsg;
