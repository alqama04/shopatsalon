"use client";
import ToastMsg from "@/components/ToastMsg";
import React, { useEffect, useState } from "react";
import BusinessCustomerForm from "./BusinessCustomerForm";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface business_profile {
  display_name: string;
  gstIn: string;
  phone: string;
  address: string;
}
interface ApiResponse {
  status: number;
  error?: string;
}

const BusinessCustomer = () => {
  const { data: session, update } = useSession();
  console.log(session?.user);

  const [businessProfile, setProfileData] = useState<business_profile>({
    display_name: "",
    gstIn: "",
    phone: "",
    address: "",
  });

  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setErr("");
  }, [businessProfile]);

  const handleBusinessProfile = async () => {
    try {
      const GSTRegex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
      const phoneRegex = /^\d{10}$/;

      const requiredFields = Object.values(businessProfile);
      const displayNameLength = businessProfile.display_name.length;
      const addressLength = businessProfile.address.length;

      if (requiredFields.some((value) => !value)) {
        return setErr("All fields are required");
      }

      if (!GSTRegex.test(businessProfile.gstIn)) {
        return setErr("Invalid GSTIN");
      }

      if (!phoneRegex.test(businessProfile.phone)) {
        return setErr("10 digit phone number is required");
      }

      if (displayNameLength < 3 || displayNameLength > 50) {
        return setErr("Display name should be 3-50 characters");
      }

      if (addressLength < 10 || addressLength > 80) {
        return setErr("Address should be 10-80 characters");
      }

      const res = await fetch("/api/business-customer", {
        method: "POST",
        body: JSON.stringify(businessProfile),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const apiResponse:ApiResponse = await res.json();
      if (res.status === 200) {
        setSuccessMsg("Profile Completed");
        await update({
          ...session,
          user: {
            ...session?.user,
            business_customer:true
          },
        });
      } else if (apiResponse.error) {
        setErr(apiResponse.error);
      } else {
        setErr("Unknown error occurred");
      }
    } catch (error) {
      setErr("Something went wrong");
    }
  };

  return (
    <div className="h-[100svh]">
      <div className="flex justify-center items-center h-full">
        {err && <ToastMsg message={err} toastType="alert-error" />}
        {successMsg && (
          <ToastMsg message={successMsg} toastType="alert-success" />
        )}

        <div
          className="
          flex justify-between flex-col-reverse md:flex-row
          bg-white 
          rounded-b-md
          md:rounded-md 
          
          sm:[90%] md:[w-80%] lg:w-[60%] 
          h-full md:h-auto

          shadow-md: md:shadow-lg shadow-gray-200 
          overflow-hidden"
        >
          <BusinessCustomerForm
            businessProfile={businessProfile}
            setProfileData={setProfileData}
            handleBusinessProfile={handleBusinessProfile}
          />
          <div
            className=" 
              md:flex-1
              bg-gradient-to-r from-gray-800 via-gray-900 to-black  
              flex justify-center 
              items-center 
              flex-col 
              p-2 gap-2
            text-gray-100 
              h-[18rem]
              md:h-[25rem]
              rounded-b-[5rem]
              md:rounded-l-[6.5rem]
              md:rounded-br-[0]
              "
          >
            <h1 className="text-[1.3rem] font-medium tracking-wider">
              Welcome, {session?.user?.name}
            </h1>
            <p className="text-white text-center capitalize px-2">
              Enjoy Exploring our new shopping experience.
            </p>
            <Link
              href="/"
              className="btn bg-transparent hover:bg-transparent btn-sm mt-5 text-white rounded-md tracking-wider"
            >
              Go To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCustomer;
