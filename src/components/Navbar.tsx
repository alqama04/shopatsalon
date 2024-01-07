"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter} from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";


const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    session.data ? router.push("/dashboard") : router.push("/authenticate");
    setLoading(true);
  };

  const btnClassName = `uppercase
  text-[#0b0b0b]
  shadow-md
  tracking-wider
  bg-white
  btn
  min-h-0
  h-auto 
  py-2
  rounded-full
  text-[1.2rem]
  z-10 `;
  return (
    <div
      className="
      relative
        py-1
        pl-2
        pr-2
        sm:px-4
        pt-3
        pb-2
      "
    >
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          damping: 20,
        }}
        className={`flex justify-between items-center`}
      >
        <Link href='/' className="flex whitespace-nowrap uppercase tracking-widest text-[1.3rem] sm:text-[1.5rem]
        xl:text-[2rem] font-bold leading-8 xl:leading-normal">
          <h1 className="border-4 px-1 text-white border-white">Shop AT</h1>
          <h1 className="bg-white lg:font-extrabold text-black py-[.2rem] px-1">Salon</h1>
        </Link>
        <div>
          <button onClick={onClick} className={btnClassName}>
            {loading ? (
              <span className="loading loading-dots loading-sm" />
            ) : session.data ? (
              "Dash"
            ) : (
              "login"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
