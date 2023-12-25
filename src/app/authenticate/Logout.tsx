"use client";
import React, { useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { signOut } from "next-auth/react";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    let signedOut = await signOut();
    if (signedOut) {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        title="Logout"
        className="btn min-h-[auto] h-[2.2rem] flex items-center gap-4 text-[1rem] bg-gray-50 text-heading font-medium rounded-full hover:bg-gray-300 border-none px-2"
        onClick={() => handleLogout()}
      >
        Logout
        <RiLogoutCircleRLine className="text-gray-900 stroke-1" size="20" />
        {loading && <span className="loading loading-spinner loading-xs" />}
      </button>
    </div>
  );
};

export default Logout;
