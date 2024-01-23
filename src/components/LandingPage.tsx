"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
const tomorrow = Playfair_Display({ subsets: ["latin"], weight: "600" });

import { GiDrippingStar } from "react-icons/gi";
import Link from "next/link";
import { socialLinks } from "@/constant/socialLinks";

const LandingPage = () => {
  let text = "Change the way you shop";

  return (
    <div className="pt-8 md:pt-0 relative h-full text-white lg:py-20 2xl:py-32">
      <div className="flex justify-between flex-col-reverse md:flex-row md:px-10 pb-10">
        <div className="px-1 md:px-16 pb-10 md:pb-4 flex flex-col justify-center">
          <div
            className={`${tomorrow.className} mt-7 md:mt-0 w-full flex items-center gap-x-2 uppercase font-extrabold flex-wrap text-[3rem] md:text-[3.5rem] xl:text-[4.5rem] tracking-wide`}
          >
            {text.split(" ").map((el, i) => (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: i / 20,
                }}
                key={i}
                className="select-none leading-[4.3rem]"
              >
                {el}
              </motion.span>
            ))}
            <GiDrippingStar size={32} color="#FFC47B" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.25,
              delay: 0.5,
            }}
            className="text-[1.5rem]"
          >
            Now There is a
            <span className="font-bold"> Newer, Smarter & More Rewarding</span>
            Way To Shop for Your Salon’s Needs.
          </motion.h1>
          <div className="text-center md:text-left mt-6 mb-3">
            <Link href={socialLinks.wtsp} className="btn rounded-full min-w-0 w-40 text-[1.2rem]">
              Contact Us
            </Link>
          </div>
        </div>


        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 160,
            },
          }}
          viewport={{ once: true }}
          className="flex justify-center items-center flex-col"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              transition: {
                repeat: Infinity,
                duration: 16,
                ease: "linear",
              },
            }}
            className="h-full w-[20rem] md:w-[30rem] overflow-hidden select-none m-auto pt-2">
            <Image
              src="circleRibbon1.svg"
              width={600}
              height={500}
              alt="shop at salon"
              className="object-cover select-none"
            />
          </motion.div>
          <div className="absolute w-[10rem] md:w-[15rem] m-auto text-center">
            <Image
              src="logoIcon.svg"
              width={600}
              height={500}
              alt="shop at salon"
              className="object-cover opacity-90 mt-1 select-none "
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
