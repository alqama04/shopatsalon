'use client'
import React from "react";
import { IoIosHelpCircle } from "react-icons/io";
import { motion } from "framer-motion"


const Help = () => {
  return (
    <motion.div
   
    >
      <motion.a
       drag
       dragConstraints={{
         top: -100,
         left: -100,
         right: 20,
         bottom: 0,
       }}
      
      href="" className="bg-white flex gap-2 p-3 rounded-md font-bold items-center">
        
        Help
        <IoIosHelpCircle size={26} className="stroke-2"/>
        </motion.a>


    </motion.div>
  );
};

export default Help;
