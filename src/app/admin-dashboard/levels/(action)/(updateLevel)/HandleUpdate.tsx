"use client";
import FormSubmit from "@/components/FormSubmit";
import useToastMsg from "@/hooks/useToastMsg";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Level {
  id: string;
  name: string;
  target_amt: string;
  closeModal: Dispatch<SetStateAction<boolean>>;
}
interface ApiResponse {
    error?: string;
  }
const HandleUpdate = ({ id, name, target_amt, closeModal }: Level) => {
    const router=  useRouter()
  const [levelData, setLevelData] = useState({
    name: name,
    target_amt: target_amt,
  });
  const { component,setAlertMsg,setToastType } = useToastMsg();

  const handleSubmit = async () => {
    try {
      let res = await fetch("/api/levels", {
        method: "PUT",
        body: JSON.stringify({ id, ...levelData }),
      });
      
      if(res.ok){
        setAlertMsg("Successfully updated level!");
        setToastType("alert-success");
        router.refresh()
      }else{
        const apiResponse: ApiResponse = await res.json();
          setAlertMsg(apiResponse.error || 'something went wrong');
          setToastType("alert-error");
      }

      console.log(res)
    } catch (error) {
        throw new Error("internal server Error");
        
    }
  };

  const inputClass =
    "w-full bg-[#F1F1F1] my-1.5 py-2.5 px-1 rounded-md shadow-md placeholder:capitalize outline-none focus:shadow-md transition-all duration-75 focus:border-l-4";

  return (
    <div className="w-full">
      {component}
      <form action={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={inputClass}
          value={levelData.name}
          onChange={(e) => setLevelData({ ...levelData, name: e.target.value })}
        />
        <input
          type="number"
          name="target_amt"
          placeholder="target amout"
          className={inputClass}
          value={levelData.target_amt}
          onChange={(e) =>
            setLevelData({ ...levelData, target_amt: e.target.value })
          }
        />
        <div>
          <FormSubmit className="w-full my-2 btn bg-gray-800 hover:bg-gray-900 text-white">
            update
          </FormSubmit>
        </div>
      </form>
    </div>
  );
};

export default HandleUpdate;
