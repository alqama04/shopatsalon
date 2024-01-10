"use client";
import React from "react";
import { motion } from "framer-motion";

const Anim = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: "linear",
        },
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default Anim;
