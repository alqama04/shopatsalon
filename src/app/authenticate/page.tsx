import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import { FaRocketchat } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import loginImage from "@/assets/loginPageImage.webp";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const LogingAction = dynamic(() => import("./LoginAction"), {
  ssr: false,
  loading() {
    return <div className="flex justify-center items-center w-full">
      <button className="loading loading-dots" />;
      </div>
  },
});

const page = async () => {
  const session = await getServerSession(options) 
  if(session) redirect('/dashboard ')

  return (
    <div className="p-2 sm:[90%] md:[w-80%] lg:w-[70%] h-[100svh] sm:h-full md:h-screen m-auto">
      <div className="flex justify-center items-center w-full h-full">
        <div className="card lg:card-side bg-white shadow-xl">
          <div className="card-body pb-0">
            <h2 className="card-title font-bold text-[1.4rem] text-heading">
              Get Started
              <FaRocketchat className="text-green-500 -mt-5" size={40} />
            </h2>

            <p className="font-semibold mt-3 md:mt-4">
              <RiDoubleQuotesL className="text-green-500" /> Shop At Salon
              offers you convenience and peace of mind, unlike anything
              you&apos;ve experienced before.
              <RiDoubleQuotesR className="text-green-600" />
            </p>

            <LogingAction />
          </div>

          <figure className="w-full">
            <Image
              src={loginImage}
              width={400}
              height={400}
              alt="Shop At Salon Login"
              className="object-fill"
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default page;
