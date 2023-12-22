import React from "react";
import GetPurchases from "./Purchases";
import ToastMsg from "@/components/ToastMsg";

const FetchPurchases = async () => {
  let messages;
  let apiResponse;
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/purchases`);
    apiResponse = await res.json();

    if (apiResponse.error) {
      messages = apiResponse.error || "unknown error Occured";
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
  return (
    <div>
      <ToastMsg message={messages} />
      <GetPurchases purchase={apiResponse}/>
    </div>
  );
};

export default FetchPurchases;
