import React, { useState } from "react";

interface toastMessage{
    message:string,
    toastType:string,
}

const ToastMsg = ({ message, toastType}:toastMessage) => {
    
  return (
    <div className={`${ !message && 'opacity-0'} toast toast-top toast-center transition-all duration-100`}>

      
      <div className={`alert ${toastType ? toastType : "alert-info"}`}>
        <span className="tracking-wider">{message}</span>
      </div>
    </div>
  );
};

export default ToastMsg;
