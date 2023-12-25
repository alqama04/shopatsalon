import React from "react";
import { getServerSession } from "next-auth"; 
import { options } from "../api/auth/[...nextauth]/options"; 
import Link from "next/link";
import BusinessProfileAction from "./BusinessProfileAction";

const BusinessProfile = async() => {
    const session = await getServerSession(options);
  return (
    <div className="h-[100svh]">
      <div className="flex justify-center items-center h-full">
 
        <div className="flex justify-between flex-col-reverse md:flex-row bg-white rounded-b-md md:rounded-md sm:[90%] md:[w-80%] lg:w-[60%] h-full md:h-auto shadow-md: md:shadow-lg shadow-gray-200 overflow-hidden">
            <BusinessProfileAction/>
          <div className="md:flex-1 bg-gradient-to-r from-gray-800 via-gray-900 to-black flex justify-center items-center flex-col p-2 gap-2 text-gray-100 h-[20rem] md:h-[26rem] rounded-b-[5rem] md:rounded-l-[6.5rem] md:rounded-br-[0]">
            <h1 className="text-[1.3rem] font-medium tracking-wider">Welcome, {session?.user?.name}</h1>
            <p className="text-white text-center capitalize px-2">Enjoy Exploring our new shopping experience.</p>
            <Link href="/" className="btn bg-transparent hover:bg-transparent btn-sm mt-5 text-white rounded-md tracking-wider">Go To Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
