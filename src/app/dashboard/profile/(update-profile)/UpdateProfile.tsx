"use client";
import FormSubmit from "@/components/FormSubmit";
import useToastMsg from "@/hooks/useToastMsg";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ProfileDataProps {
  profileData: {
    _id: string;
    display_name: string;
    phone_number?: string;
    address?: string;
    city?: string;
    state?: string;
  };
}

const BusinessProfileAction = ({ profileData }: ProfileDataProps) => {
  const router = useRouter();
  const { component, setToastType, setAlertMsg } = useToastMsg();

  const [profile, setProfileData] = useState({
    display_name: profileData.display_name || "",
    phone: profileData.phone_number || "",
    address: profileData.address || "",
    city: profileData.city || "",
    state: profileData.state || "",
  });

const handleBusinessProfile = async () => {
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(profile.phone)) {
      setAlertMsg("Invalid phone number");
      setToastType("alert-error");
      return;
    }

    try {
      const res = await fetch("/api/business-customer", {
        method: "PUT",
        body: JSON.stringify({id:profileData._id,...profile}),
        headers: { "Content-Type": "application/json" },
      });

      const apiResponse = await res.json();
      if (res.ok) {
        setAlertMsg('Profile Updated')
        setToastType('alert-success')
        router.refresh();
      } else {
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
          Your Profile Details
        </h1>

        <form action={handleBusinessProfile}>
          <div className="px-2.5 md:px-10 md:mt-3 text-gray-900">
            {Object.keys(profile).map(
              (item) =>
                item !== "city" &&
                item !== "state" && (
                  <input
                    type="text"
                    key={item}
                    required
                    value={profile[item as keyof typeof profile]}
                    onChange={(e) =>
                      setProfileData({
                        ...profile,
                        [item]: e.target.value,
                      })
                    }
                    placeholder={item.replace("_", " ")}
                    className="input-base my-1.5"
                  />
                )
            )}
            <div className="flex gap-2.5 w-full">
              {Object.keys(profile).map(
                (item) =>
                  ["city", "state"].includes(item) && (
                    <input
                      type="text"
                      key={item}
                      required
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
              )}
            </div>
            <div className="text-center mt-4 pb-2">
              <FormSubmit className="base-btn w-1/2 tracking-wider  ">
                Update
              </FormSubmit>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BusinessProfileAction;
