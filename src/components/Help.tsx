'use client'
import React from "react";
import { IoIosHelpCircle } from "react-icons/io";
import { motion } from "framer-motion"


const Help = () => {
  return (
    <div>
      <motion.a
       drag
       dragConstraints={{
         top: -100,
         left: -100,
         right: 20,
         bottom:0,
       }}
       transition={{
        duration: .3,
        ease:"easeInOut"
       }}
      
      href="" className="bg-white flex gap-2 p-3 rounded-md font-bold items-center">
        
        Help
        <IoIosHelpCircle size={26} className="stroke-2"/>
        </motion.a>

    </div>
  );
};

export default Help;
