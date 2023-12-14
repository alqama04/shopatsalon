"use client";
import React from "react";
import { TiHome } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

const LogingAction = () => {
  const [loading, setLoading] = useState(false);

  const googleLogin = async () => {
    setLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: true,
        
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className=" w-full flex flex-col gap-3 ">
      <button
        onClick={googleLogin}
        className="btn btn-outline md:text-[19px] btn-md w-30 m-auto bg-gray-900 text-white"
      >
        <FcGoogle className="text-3xl " />

        {loading ?
          <span className="loading loading-dots loading-lg text-gray-50"></span>
         : 
          <span> Sign in with Google</span>
        }
      </button>

      <Link
        className="font-medium btn btn-sm btn-link text-heading mb-2 items-center glass w-max m-auto underline-offset-2"
        href="/"
      >
        <TiHome size={20} className="text-green-500" />
        Go To Home
      </Link>
    </div>
  );
};

export default LogingAction;
