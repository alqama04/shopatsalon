"use client";
import React from "react";
import { motion } from "framer-motion";

const Anime = ({ children }: { children: React.ReactNode }) => {
  const animeVarient = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y:0
    },
  };

  return <motion.div
  initial="hidden"
  whileInView="visible"
  variants={animeVarient}
  >
    {children}
    </motion.div>;
};

export default Anime;
