import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="py-8 rounded-t-[3rem] shadow-inner shadow-gray-600 text-white bg-gray-950">
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
        <a href="mailto:" target="_blank">
          <MdOutlineMail
            size={40}
            className="border-b-4 rounded-b-full border-white shadow-md text-[#ffffff] p-0.5"
          />
        </a>
      </div>

      <div className="flex h-8 justify-center items-center gap-5 mt-4 transition-all duration-200">
        <Link href="/company/privacy-and-policy" className="hover:border-b-2 ">
          privacy and policy
        </Link>
        <Link href="/company/about" className="hover:border-b-2">
          About Us
        </Link>
        <Link href="/company/terms-and-condition" className="hover:border-b-2">
          Term and condition
        </Link>
      </div>
      <p className="text-white text-center mt-4 text-[0.9em]">Copyright &copy; 2024 Shop At Salon</p>
    </div>
  );
};

export default Footer;
