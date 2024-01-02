"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
const tomorrow = Playfair_Display({ subsets: ["latin"], weight: "600" });

import { GiDrippingStar } from "react-icons/gi";

const LandingPage = () => {
  let text = "Change the way you shop";

  return (
    <div className="relative min-h-[100svh] h-full text-white">
      <div className="flex justify-between flex-col-reverse  md:flex-row h-full  md:px-10">
        <div className="px-1 md:px-16 pb-10 md:pb-4">
          <div
            className={`${tomorrow.className}  mt-10 md:mt-16 w-full  flex gap-x-2 uppercase font-extrabold flex-wrap text-[3.5rem] tracking-wide`}
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
                className="leading-[3.9rem]"
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
            className="text-[1.5rem] mt-5"
          >
            Now There is a{" "}
            <span className="font-bold">Newer, Smarter & More Rewarding</span>{" "}
            Way To Shop for Your Salon’s Needs.
          </motion.h1>
          <div className="text-center md:text-left mt-6 mb-3">
            <button className="btn rounded-full min-w-0 w-40 text-[1.2rem]">
              Contact Us
            </button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 50,
              damping: 60,
            },
          }}
          viewport={{ once: true }}
          className="h-max  flex justify-center items-center flex-col"
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
            className="
              h-full
              w-[20rem]
              md:w-[30rem]
              overflow-hidden
              p-2
              select-none
              flex justify-center items-center
           "
          >
            <Image
              src="circleRibbon1.svg"
              width={600}
              height={500}
              alt="shop at salon"
              className="object-cover select-none"
            />
          </motion.div>
          <div className="absolute w-[10rem] md:w-[15rem] m-auto text-center ">
            <Image
              src="logoIcon.svg"
              width={600}
              height={500}
              alt="shop at salon"
              className="object-cover opacity-90"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
