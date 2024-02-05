"use client";
import React from "react";
import dynamic from "next/dynamic";
import useToastMsg from "@/hooks/useToastMsg";
import { useRouter } from "next/navigation";

const FormSubmit = dynamic(()=>import('@/components/FormSubmit'),{
  loading: () => <span className="loading loading-spinner" />,
})

interface CancelOrderProps {
  id: string;
 
}

const CancelOrder = ({ id }: CancelOrderProps) => {
  const { component, setAlertMsg, setToastType } = useToastMsg();
  const router = useRouter()
 
  const handleDelete = async () => {
    try {
      const data = await fetch(`/api/order`, {
        method: "PUT",
        body: JSON.stringify({ id }),
      });

      const apiResponse = await data.json();
      if(data.ok){
     
        setAlertMsg('order cancelled')
        setToastType('alert-success')
      
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
      <form action={handleDelete}>
        <FormSubmit className="btn btn-xs bg-gray-900 rounded-lg text-white tracking-wider border-none hover:bg-gray-700">
          Cancel
        </FormSubmit>
      </form>
    </div>
  );
};

export default CancelOrder;
