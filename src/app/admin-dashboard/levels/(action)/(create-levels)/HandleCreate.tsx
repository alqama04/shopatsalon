"use client";
import FormSubmit from "@/components/FormSubmit";
import useToastMsg from "@/hooks/useToastMsg";
import { useRouter } from "next/navigation";
import React from "react";

const HandleCreate = () => {
  const { component, setAlertMsg, setToastType } = useToastMsg();
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name");
    const target_amt = formData.get("target_amt");

    if (!name || !target_amt) {
      setAlertMsg("All Fields are require");
      setToastType("alert-error");
      return;
    }
    const res = await fetch("/api/levels", {
      method: "POST",
      body: JSON.stringify({ name, target_amt }),
    });
    if (res.ok) {
      setAlertMsg("Level Added Successfully");
      setToastType("alert-success");
      router.refresh();
    } else {
      setAlertMsg("unable to add Level");
      setToastType("alert-error");
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
        />
        <input
          type="number"
          name="target_amt"
          placeholder="target amout"
          className={inputClass}
        />
        <div >

        <FormSubmit className="w-full my-2 btn bg-gray-800 hover:bg-gray-900 text-white">SAVE</FormSubmit>
        </div>
      </form>
    </div>
  );
};

export default HandleCreate;
