import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
  return (
    <div
      className="py-8 rounded-t-[3rem] shadow-inner shadow-gray-600 text-white bg-gray-950"
    >
      <div className="h-full flex justify-center gap-7 items-center">
        <a href="" target="_blank">
          <FaInstagram
            size={40}
            className="border-b-4 rounded-b-full border-white shadow-md text-[#ffffff] p-0.5"
          />
        </a>
       
        <a href="" target="_blank">
        <FaWhatsapp
            size={40}
            className="border-b-4 rounded-b-full border-white shadow-md text-[#ffffff] p-0.5"
          />
        </a>

      </div>

      <div className="flex h-8 justify-center items-center gap-5 mt-4 transition-all duration-200">
        <Link href='/' className="hover:border-b-2 ">Home</Link>
        <Link href='/company/about' className="hover:border-b-2" >About Us</Link>
        <Link href='/company/terms-and-condition' className="hover:border-b-2" >Term and condition</Link>

      </div>
    </div>
  );
};

export default Footer;
