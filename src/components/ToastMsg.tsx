"use client";

import useToastMsg from "@/hooks/useToastMsg";
import React from "react";

interface toastMessage {
  message: string;
  toastType?: string;
}

const ToastMsg = ({ message, toastType }: toastMessage) => {
  const { component, setToastType, setAlertMsg } = useToastMsg();

  if(message){
    setAlertMsg(message || "");
    setToastType(toastType || "alert-info");
  }
    
  return <>{component}</>;
};

export default ToastMsg;
