import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdMailOutline } from "react-icons/md";
import logo from "@/assets/logo.svg";

const Navbar = () => {
  return (
    <>
      <div className="absolute h-14 px-4 overflow-hidden w-full flex justify-between items-center">
        <div className="sm:w-[16em]">
          <Image
            src={logo}
            width={200}
            height={100}
            alt="SHOP AT SALON"
            className="w-full h-full object-fill"
          />
        </div>
        <Link
          href="/authenticate"
          className="
        border-2
        flex items-center gap-2 py-2.5 px-3 rounded-full shadow-xl bg-[rgba(3,3,3,0.34)] text-white tracking-wider "
        >
          <MdMailOutline className="text-2xl" /> Login 
        </Link>
      </div>
    </>
  );
};

export default Navbar;
