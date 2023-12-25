"use client";
import FormSubmit from "@/components/FormSubmit";
import useToastMsg from "@/hooks/useToastMsg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BusinessProfileAction = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  
  const { component, setToastType, setAlertMsg } = useToastMsg();
  const [profile, setProfileData] = useState({
    display_name: "",
    gstIn: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const handleBusinessProfile = async () => {
    const GSTRegex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
    const phoneRegex = /^\d{10}$/;

    if (!profile.display_name || !profile.phone || !profile.address) {
      setAlertMsg("all fields are required");
      setToastType("alert-error");
      return;
    }
    if (profile.gstIn && !GSTRegex.test(profile.gstIn)) {
      setAlertMsg("Invalid GSTIN");
      setToastType("alert-error");
      return;
    }
    if (!phoneRegex.test(profile.phone)) {
      setAlertMsg("Invalid phone number");
      setToastType("alert-error");
      return;
    }

    try {
      const res = await fetch("/api/business-customer", {
        method: "POST",
        body: JSON.stringify(profile),
        headers: { "Content-Type": "application/json" },
      });

      const apiResponse = await res.json();
      if (res.status === 200) {
        await update({
          ...session,
          user: { ...session?.user, business_customer: true },
        });

        router.refresh();
      } else {
        console.log(apiResponse.error)
        setAlertMsg(apiResponse.error || "Unknown error occurred");
        setToastType("alert-error");
        return;
      }
    } catch (error) {
      throw new Error("something went wrong");
    }
  };

  return (
    <>
      {component}
      <div className="flex-1 flex md:justify-center items-center flex-col">
        <h1 className="mt-2 font-bold text-[1.4rem] text-center text-heading tracking-wider">
          Complete Your Profile
        </h1>

        <form action={handleBusinessProfile}>
          <div className="px-2.5 md:px-10 md:mt-3">
            {Object.keys(profile).map((item) => (
             
                 item !== "city" && item !== "state" && (
                  <input
                    type="text"
                    key={item}
                    value={profile[item as keyof typeof profile]}
                    onChange={(e) =>
                      setProfileData({
                        ...profile,
                        [item]: e.target.value,
                      })
                    }
                    placeholder={item.replace("_", " ")}
                    className="input-base"
                  />
                )
               
            ))}
            <div className="flex gap-2 w-full">
            {Object.keys(profile).map((item) => (
              
                ['city','state'].includes(item)? (
                  <input
                    type="text"
                    key={item}
                    value={profile[item as keyof typeof profile]}
                    onChange={(e) =>
                      setProfileData({
                        ...profile,
                        [item]: e.target.value,
                      })
                    }
                    placeholder={item.replace("_", " ")}
                    className="input-base"
                  />
                ):''
            ))}
            </div>
            <div className="text-center mt-4">
              <FormSubmit className="base-btn w-1/2 tracking-wider  ">
                Save
              </FormSubmit>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BusinessProfileAction;
