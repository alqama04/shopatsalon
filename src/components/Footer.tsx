import { socialLinks } from "@/constant/socialLinks";
import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
 
const Footer = () => {
  return (
    <div className="py-8 rounded-t-[3rem] shadow-inner shadow-gray-600 text-white bg-gray-950">
      <div className="h-full flex justify-center gap-7 items-center transition-all duration-500">
        <a href={socialLinks.ig} target="_blank">
          <FaInstagram
            size={40}
            className="border-b-4 rounded-b-full border-white shadow-md text-[#ffffff] p-0.5"
          />
        </a>

        <a href={socialLinks.wtsp} target="_blank">
          <FaWhatsapp
            size={40}
            className="border-b-4 rounded-b-full border-white shadow-md text-[#ffffff] p-0.5"
          />
          {socialLinks.wtsp}
        </a>
        <a href={`mailto:${socialLinks.gmail}`} target="_blank">
          <MdOutlineMail
            size={40}
            className="border-b-4 rounded-b-full border-white shadow-md text-[#ffffff] p-0.5"
          />
        </a>
      </div>

      <div className="flex w-full justify-center items-center gap-4 mt-5 ">
        <Link href="/company/privacy-and-policy" className="hover:border-b-2 ">
          privacy & policy
        </Link>
        <Link href="/company/about" className="hover:border-b-2">
          About
        </Link>
        <Link href="/company/terms-and-condition" className="hover:border-b-2">
          Terms & condition
        </Link>
      </div>
      <p className="text-white text-center mt-7 text-[0.9em]">
        Copyright &copy; 2024 Shop At Salon
      </p>
    </div>
  );
};

export default Footer;
