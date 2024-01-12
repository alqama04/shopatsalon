"use client";

import useToastMsg from "@/hooks/useToastMsg";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuDelete } from "react-icons/lu";
import { useEdgeStore } from "@/lib/edgestore";

const DeleteOrder = ({ id,files }: { id: string,files:string[] }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const { component, setToastType, setAlertMsg } = useToastMsg();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const handleDelete = async () => {
 
    try {

        const res = await fetch("/api/order/admin", {
            method: "DELETE",
            body: JSON.stringify({ id }),
          });
        
      const apiResponse = await res.json();
      
      if(res.ok){
        for(let file of files){
          await edgestore.publicFiles.delete({ url:file});
        }
        setAlertMsg('order deleted')
        setToastType('alert-success')
        router.back()
      
        router.refresh()
      }else{
        setAlertMsg(apiResponse.error || 'unknown error occured')
        setToastType('alert-error')
      }
    } catch (error) {
     
      throw new Error("something went wrong");
    }
  };

  return (
    <div>
      {component}
      {!showDelete ? (
        <button
          onClick={() => setShowDelete((prev) => !prev)}
          className="p-0.5  btn btn-sm text-white tracking-wider bg-red-800 border-none hover:bg-red-700 focus:outline-gray-600 "
        >
          Delete <RiDeleteBin5Line size={26} />{" "}
        </button>
      ) : (
        <div className="flex gap-1 items-center">
          <button 
          onClick={handleDelete}
          className="p-0.5 btn btn-sm text-white tracking-wider bg-red-800 border-none hover:bg-red-700">
            continue
            {loading && <span className="loading loading-spinner" />}
          </button>

          <LuDelete size={26} 
          onClick={() => setShowDelete((prev) => !prev)}
          />

        </div>
      )}
    </div>
  );
};

export default DeleteOrder;
