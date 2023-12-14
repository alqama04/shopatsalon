"use client";
import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { signOut } from "next-auth/react"

const Logout = () => {
  return (
    <div>
      <button title="Logout" className="btn min-h-[auto] h-[2.2rem] flex items-center gap-4 text-[1rem] bg-gray-50 text-heading font-medium rounded-full hover:bg-gray-300 border-none px-2" onClick={() => signOut()}>
        Logout
        <RiLogoutCircleRLine  className='text-gray-900 stroke-1' size='20' />
      </button>
    </div>
  );
};

export default Logout;
