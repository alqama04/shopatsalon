import React from "react";
import Purchases from "./Purchases";
import { headers } from "next/headers";
 
const FetchPurchases = async () => {

  let apiResponse;
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/purchases/admin`,{ headers: headers(),});
    apiResponse = await res.json();
  } catch (error) {
     
    throw new Error("Something went wrong");
  }
  if(apiResponse.error || !apiResponse){
    return <div>
      <h1 className="text-center text-4xl font-bold mt-20">{apiResponse?.error || "unknown error Occured"} </h1>
    </div>
  }
  return (
    <div>
      <Purchases purchase={apiResponse}/>
    </div>
  );
};

export default FetchPurchases;
